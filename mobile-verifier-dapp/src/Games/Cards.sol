// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AutomationCompatibleInterface.sol";
import "@flarenetwork/flare-periphery-contracts/stateConnector/StateConnector.sol";
import {IRankNFT} from "../Interface/Games/IRankNFT.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {IEntry} from "../Interface/Core/IEntry.sol";
import{IGameContractCrossChain} from "../Interface/Games/IGameContractCrossChain.sol";

contract GameContractCrossChain is IGameContractCrossChain, VRFConsumerBaseV2, AutomationCompatibleInterface {
    using SafeERC20 for IERC20;
    // Game Structures
    struct GameSession {
        address player;
        uint256 betAmount;
        uint256[] playerCards;
        uint256[] dealerCards;
        uint256[] availableCards;
        bool inProgress;
        uint256 lastActionTime;
        address _rankNFTaddr;
    }

    // Chainlink VRF
    VRFCoordinatorV2Interface private immutable vrfCoordinator;
    uint64 private immutable subscriptionId;
    bytes32 private immutable gasLane;
    uint32 private immutable callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 1;
    mapping(uint256 => address) private vrfRequests;

    // Chainlink Automation
    uint256 private constant GAME_TIMEOUT = 1 hours;
    
    // Flare State Connector
    StateConnector public immutable stateConnector;


    // Game Configuration
    address public _gameToken;
    
    // Game State
    mapping(address => GameSession) public activeGames;
    mapping(address => uint256) public playerBalances;
    uint256 public houseBalance;
  
  uint256 gamesPlayedCount = 1;
  uint256 gamesWonCount = 1;
    IRankNFT public rankNFT;
    IEntry public entryPoint;

    // Events
    event GameStarted(address indexed player, uint256 betAmount);
    event CardDrawn(address indexed player, uint256 cardValue);
    event GameResult(address indexed player, bool won, uint256 amount);
    event CrossChainUpdate(address indexed player, bytes32 updateHash);
    event BalanceUpdated(address indexed player, uint256 newBalance);

    constructor(
        address _vrfCoordinator,
        uint64 _subscriptionId,
        bytes32 _gasLane,
        uint32 _callbackGasLimit,
        address _stateConnector
        address _rankNFT,
        address _gameToken,
        address _entryPoint
    ) VRFConsumerBaseV2(_vrfCoordinator) {
        vrfCoordinator = VRFCoordinatorV2Interface(_vrfCoordinator);
        subscriptionId = _subscriptionId;
        gasLane = _gasLane;
        callbackGasLimit = _callbackGasLimit;
        stateConnector = StateConnector(_stateConnector);
        rankNFT = IRankNFT(_rankNFT);
        gameToken = _gameToken;
        entryPoint = IEntry(_entryPoint);
    }

    // Start a new game with a bet
    function startGame(uint256 betAmount) external onlyEntryPoint {
       IERC20(_gameToken).safeTransferFrom(msg.sender, address(this), betAmount);
        require(activeGames[msg.sender].player == address(0), "Game already in progress");

       
        GameSession storage session = activeGames[msg.sender];
        session.player = msg.sender;
        session.betAmount = betAmount;
        session.inProgress = true;
        session.lastActionTime = block.timestamp;
        
       
        for (uint256 i = 1; i <= 52; i++) {
            session.availableCards.push(i);
        }

        // Request random cards for initial deal
        uint256 requestId = vrfCoordinator.requestRandomWords(
            gasLane,
            subscriptionId,
            REQUEST_CONFIRMATIONS,
            callbackGasLimit,
            NUM_WORDS
        );
        vrfRequests[requestId] = msg.sender;

        emit GameStarted(msg.sender, betAmount);
    }

    // Chainlink VRF callback
    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        address player = vrfRequests[requestId];
        GameSession storage session = activeGames[player];
        
        // Deal initial cards
        _drawCard(player, randomWords[0]);
        _drawCard(player, randomWords[0] >> 8); // shift right
        
        // Second card for dealer (face down)
        _drawDealerCard(player, randomWords[0] >> 16);
    }

    // Player action to draw another card
    function hit() external {
        GameSession storage session = activeGames[msg.sender];
        require(session.inProgress, "No active game");
        
        // Request random card
        uint256 requestId = vrfCoordinator.requestRandomWords(
            gasLane,
            subscriptionId,
            REQUEST_CONFIRMATIONS,
            callbackGasLimit,
            NUM_WORDS
        );
        vrfRequests[requestId] = msg.sender;
    }

    // Player action to stand
    function stand() external {
        GameSession storage session = activeGames[msg.sender];
        require(session.inProgress, "No active game");
        
        // Dealer draws until reaching threshold
        while (_calculateHand(session.dealerCards) < 17) {
            uint256 randomValue = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)));
            _drawDealerCard(msg.sender, randomValue);
        }
        
        _determineWinner(msg.sender);
    }

  // Chainlink Automation: Check for games needing upkeep
    function checkUpkeep(
        bytes calldata /* checkData */
    ) external view override returns (bool upkeepNeeded, bytes memory performData) {
        // This simplified version checks all active games
        // In production, you'd want a more efficient approach
        
        // Initialize empty array to store games needing upkeep
        address[] memory gamesNeedingUpkeep = new address[](0);
        uint256 count = 0;
        
        // Check all active games (note: this is inefficient for many games)
        address[] memory activePlayers = _getActivePlayers();
        for (uint256 i = 0; i < activePlayers.length; i++) {
            address player = activePlayers[i];
            GameSession storage session = activeGames[player];
            
            // Check if game has timed out
            if (block.timestamp - session.lastActionTime > GAME_TIMEOUT) {
                // Resize array (inefficient but works for demonstration)
                address[] memory newArray = new address[](count + 1);
                for (uint256 j = 0; j < count; j++) {
                    newArray[j] = gamesNeedingUpkeep[j];
                }
                newArray[count] = player;
                gamesNeedingUpkeep = newArray;
                count++;
            }
        }
        
        upkeepNeeded = gamesNeedingUpkeep.length > 0;
        performData = abi.encode(gamesNeedingUpkeep);
    }

    // Chainlink Automation: Perform upkeep on timed-out games
    function performUpkeep(bytes calldata performData) external override {
        address[] memory gamesToProcess = abi.decode(performData, (address[]));
        
        for (uint256 i = 0; i < gamesToProcess.length; i++) {
            address player = gamesToProcess[i];
            GameSession storage session = activeGames[player];
            
            // Only process if game still exists and is timed out
            if (session.inProgress && 
                block.timestamp - session.lastActionTime > GAME_TIMEOUT) {
                
                // Player loses by default for timing out
                _endGame(player, false);
                
                // Emit special event for timeout
                emit GameResult(player, false, 0, "Game timed out");
            }
        }
    }

    // Helper function to get all active players (not efficient for large scales)
    function _getActivePlayers() internal view returns (address[] memory) {
        // In production, you'd want to maintain a separate array of active players
        // This is just for demonstration
        address[] memory players = new address[](100); // Arbitrary size
        uint256 count = 0;
        
        // This is VERY inefficient - don't use in production
        // Just showing the concept
        for (uint256 i = 0; i < 100; i++) {
            address potentialPlayer = address(uint160(i + 1)); // Just a demo
            if (activeGames[potentialPlayer].inProgress) {
                players[count] = potentialPlayer;
                count++;
            }
        }
        
        // Resize array
        address[] memory result = new address[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = players[i];
        }
        
        return result;
    }

    // Internal game functions
    function _drawCard(address player, uint256 randomValue) internal {
        GameSession storage session = activeGames[player];
        uint256 cardIndex = randomValue % session.availableCards.length;
        uint256 card = session.availableCards[cardIndex];
        
        // Remove card from deck
        session.availableCards[cardIndex] = session.availableCards[session.availableCards.length - 1];
        session.availableCards.pop();
        
        session.playerCards.push(card);
        emit CardDrawn(player, card);
        
        // Check if bust
        if (_calculateHand(session.playerCards) > 21) {
            _endGame(player, false);
        }
    }

    function _drawDealerCard(address player, uint256 randomValue) internal {
        GameSession storage session = activeGames[player];
        uint256 cardIndex = randomValue % session.availableCards.length;
        uint256 card = session.availableCards[cardIndex];
        
        // Remove card from deck
        session.availableCards[cardIndex] = session.availableCards[session.availableCards.length - 1];
        session.availableCards.pop();
        
        session.dealerCards.push(card);
    }

    function _calculateHand(uint256[] memory cards) internal pure returns (uint256) {
        uint256 total = 0;
        uint256 aces = 0;
        
        for (uint256 i = 0; i < cards.length; i++) {
            uint256 value = cards[i] % 13;
            if (value == 0 || value >= 10) {
                total += 10;
                if (value == 0) aces++;
            } else {
                total += value;
            }
        }
        
        // Handle aces
        while (total > 21 && aces > 0) {
            total -= 10;
            aces--;
        }
        
        return total;
    }

    function _determineWinner(address player) internal {
        GameSession storage session = activeGames[player];
        uint256 playerTotal = _calculateHand(session.playerCards);
        uint256 dealerTotal = _calculateHand(session.dealerCards);
        
        bool playerWon = (playerTotal <= 21) && 
                        ((dealerTotal > 21) || (playerTotal > dealerTotal));
        
        _endGame(player, playerWon);
    }

    function _endGame(address player, bool playerWon) internal {
        GameSession storage session = activeGames[player];
         _gamesPlayedCount= gamesPlayedCount++
        // Payout
        if (playerWon) {
            uint256 payout = session.betAmount * 2;
            playerBalances[player] += payout;
            houseBalance -= payout;
             rankNFTaddr = CloneNFT();
             session._rankNFTaddr = rankNFTaddr;
            mintRankNFT(session.player, gamesWonCount++, _gamesPlayedCount);
            IERC20(_gameToken).safeTransfer(player, payout);
            emit GameResult(player, true, payout);
        } else {
            houseBalance += session.betAmount;

            emit GameResult(player, false, 0);
        }
        
        // Prepare cross-chain update
        bytes32 updateHash = keccak256(
            abi.encodePacked(
                player,
                playerWon ? 1 : 0,
                session.betAmount,
                block.timestamp
            )
        );
        stateConnector.attestMessageHash(updateHash);
        emit CrossChainUpdate(player, updateHash);
        
        // Clean up
        // delete activeGames[player];
        //dont delete, just reset
        session.inProgress = false;
    }
    
    // Cross-chain verification functions
    function verifyPolkadotUpdate(
        bytes32 updateHash,
        bytes memory proof
    ) public view returns (bool) {
        return stateConnector.verifyMessageHash(updateHash, proof);
    }

    function mintRankNFT(address to, uint256 _gamesWonCount, uint256 _gamesPlayedCount, rankNFtadd) internal {
     
        // Mint NFT based on game stats
        rankNFT.mintRankNFT(to, _gamesWonCount, _gamesPlayedCount, rankNFtaddr);  
    }

    function CloneNFT()internal returns(address) {
        // Clone the NFT contract
        address clone = address(new IRankNFT());
        return clone;
    }

        modifier onlyEntryPoint() {
        require(msg.sender == entryPoint, "Only EntryPoint");
        _;
    }
}