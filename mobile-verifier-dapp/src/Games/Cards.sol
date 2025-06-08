// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {IRankNFT} from "../Interface/Games/IRankNFT.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {IEntry} from "../Interface/Core/IEntry.sol";
import {ICardGameWithNFT} from "../Interface/Games/IGameContract.sol";
import {Structss} from "../DataTypes/Structs.sol";
import {ErrorLib} from "../DataTypes/Errors.sol";

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

contract CardGameWithNFT is ICardGameWithNFT, VRFConsumerBaseV2Plus {
    using SafeERC20 for IERC20;

    IEntry private immutable _entry;
    IRankNFT private immutable _rankNFT;
    address private immutable _token;

    uint256 public s_gameId;

    // Chainlink VRF config
    bytes32 private immutable i_keyHash;
    uint256 private immutable i_subscriptionId;
    uint32 private immutable i_callbackGasLimit;

    // Constants
    uint256 private constant MAX_PLAYERS = 4;
    uint256 private constant CARDS_PER_PLAYER = 2;
    uint256 private constant BLACKJACK = 21;
    //uint8[52] private deck;

    // For mapping random requests to gameIds
    mapping(uint256 => uint256) private s_requestIdToGameId;

    // Game storage
    mapping(uint256 => Structss.CurrentGame) public gameStarted;

    // Events
    event GameStarted(uint256 indexed gameId);
    event CardsDealt(uint256 indexed gameId);
    event CardDrawn(address indexed player, uint8 card);
    event WinnerDeclared(address indexed winner, uint256 gameId);
    event NFTMinted(address indexed winner, uint256 tokenId);
    event GameReset(uint256 indexed gameId);

    constructor(
        address vrfCoordinator,
        bytes32 keyHash,
        uint256 subscriptionId,
        uint32 callbackGasLimit,
        address entry,
        address token,
        address rankNFT
    ) VRFConsumerBaseV2Plus(vrfCoordinator) {
        i_keyHash = keyHash;
        i_subscriptionId = subscriptionId;
        i_callbackGasLimit = callbackGasLimit;

        _entry = IEntry(entry);
        _token = token;
        _rankNFT = IRankNFT(rankNFT);
    }

    // Create a new game and set initial bet, player count etc
    function CreateNewGame(uint256 betAmountRequired, uint256 noOfPlayers) external onlyEntryPoint {
        require(noOfPlayers <= MAX_PLAYERS, "Too many players");

        s_gameId++;
        uint256 gameIndex = s_gameId;

        Structss.CurrentGame storage game = gameStarted[gameIndex];
        game.totalPlayers = noOfPlayers;
        game.betAmountRequired = betAmountRequired;
        game.gameState = Structss.GameState.WAITING;
        game.lastTimestamp = block.timestamp;
        game._totalBet = betAmountRequired;

        game.deck = createDeck();

        // Add creator as first player
        game.players.push(Structss.Player({
            addr: msg.sender,
            hand: new uint8 ,
            isActive: true,
            rankNFT: address(0),
            gamesWonCount: 0,
            gamesPlayedCount: 0
        }));

        game.isPlayerInGame[msg.sender] = true;
        game.playerIndex[msg.sender] = 0;

        IERC20(_token).safeTransferFrom(msg.sender, address(this), betAmountRequired);

        emit GameStarted(gameIndex);
    }

    // Player joins existing game
    function joinGame(uint256 gameId, uint256 amount) external onlyEntryPoint {
        Structss.CurrentGame storage game = gameStarted[gameId];

        require(game.gameState == Structss.GameState.WAITING, "Game not waiting");
        require(!game.isPlayerInGame[msg.sender], "Already registered");
        require(game.players.length < game.totalPlayers, "Game full");

        game.players.push(Structss.Player({
            addr: msg.sender,
            hand: new uint8 ,
            isActive: true,
            rankNFT: address(0),
            gamesWonCount: 0,
            gamesPlayedCount: 0
        }));

        uint256 index = game.players.length - 1;
        game.isPlayerInGame[msg.sender] = true;
        game.playerIndex[msg.sender] = index;

        game._totalBet += amount;

        IERC20(_token).safeTransferFrom(msg.sender, address(this), amount);
    }

    

    // Create a new game and set initial bet, player count etc
    function CreateNewGame(uint256 betAmountRequired, uint256 noOfPlayers) external onlyEntryPoint {
        require(noOfPlayers <= MAX_PLAYERS, "Too many players");

        s_gameId++;
        uint256 gameIndex = s_gameId;

        Structss.CurrentGame storage game = gameStarted[gameIndex];
        game.totalPlayers = noOfPlayers;
        game.betAmountRequired = betAmountRequired;
        game.gameState = Structss.GameState.WAITING;
        game.lastTimestamp = block.timestamp;
        game._totalBet = betAmountRequired;

        game.deck = createDeck();

        // Add creator as first player
        game.players.push(Structss.Player({
            addr: msg.sender,
            hand: new uint8 ,
            isActive: true,
            rankNFT: address(0),
            gamesWonCount: 0,
            gamesPlayedCount: 0
        }));

        game.isPlayerInGame[msg.sender] = true;
        game.playerIndex[msg.sender] = 0;

        IERC20(_token).safeTransferFrom(msg.sender, address(this), betAmountRequired);

        emit GameStarted(gameIndex);
    }

    // Player joins existing game
    function joinGame(uint256 gameId, uint256 amount) external onlyEntryPoint {
        Structss.CurrentGame storage game = gameStarted[gameId];

        require(game.gameState == Structss.GameState.WAITING, "Game not waiting");
        require(!game.isPlayerInGame[msg.sender], "Already registered");
        require(game.players.length < game.totalPlayers, "Game full");

        game.players.push(Structss.Player({
            addr: msg.sender,
            hand: new uint8 ,
            isActive: true,
            rankNFT: address(0),
            gamesWonCount: 0,
            gamesPlayedCount: 0
        }));

        uint256 index = game.players.length - 1;
        game.isPlayerInGame[msg.sender] = true;
        game.playerIndex[msg.sender] = index;

        game._totalBet += amount;

        IERC20(_token).safeTransferFrom(msg.sender, address(this), amount);
    }

    // Start the game: request randomness for shuffling from Chainlink VRF
    function startGame(uint256 gameId) external onlyEntryPoint {
        Structss.CurrentGame storage game = gameStarted[gameId];

        require(game.gameState == Structss.GameState.WAITING, "Invalid state");
        require(game.players.length >= 2, "Not enough players");

        game.gameState = Structss.GameState.SHUFFLING;

       //@dev fix this
        uint256 requestId = requestRandomWords(
            i_keyHash,
            i_subscriptionId,
            3, // request confirmations
            i_callbackGasLimit,
            1 // num words
        );

        s_requestIdToGameId[requestId] = gameId;
    }

    // Chainlink VRF callback with randomness to shuffle the deck
    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        uint256 gameId = s_requestIdToGameId[requestId];
        Structss.CurrentGame storage game = gameStarted[gameId];
        require(game.gameState == Structss.GameState.SHUFFLING, "Game not shuffling");

        // Shuffle deck using Fisher-Yates and the random seed
        game.deck = shuffleDeckWithSeed(game.deck, randomWords[0]);

        game.gameState = Structss.GameState.DEALING;

        // Deal cards to players
        dealPlayersWithCards(gameId);

        game.lastTimestamp = block.timestamp;
        game.gameState = Structss.GameState.PLAYING;

        emit GameStarted(gameId);
        emit CardsDealt(gameId);
    }

    function hit(uint256 gameId) external onlyEntryPoint {
        Structss.CurrentGame storage game = gameStarted[gameId];
        require(game.gameState == Structss.GameState.PLAYING, "Game not playing");
        require(game.isPlayerInGame[msg.sender], "Not registered");

        Structss.Player storage player = game.players[game.playerIndex[msg.sender]];
        require(player.isActive, "Player not active");
        require(player.hand.length < CARDS_PER_PLAYER, "Max cards reached");

        uint8 card = game.deck[game.deck.length - 1];
        player.hand.push(card);
        game.deck.pop();

        emit CardDrawn(msg.sender, card);

        if (calculateHandValue(player.hand) > BLACKJACK) {
            player.isActive = false;
            emit WinnerDeclared(msg.sender, gameId);
            declareWinner(gameId);
        }
    }

    function poke(uint256 gameId, address target) external onlyEntryPoint {
        Structss.CurrentGame storage game = gameStarted[gameId];
        require(game.gameState == Structss.GameState.PLAYING, "Game not playing");
        require(game.isPlayerInGame[msg.sender], "Sender not registered");
        require(game.isPlayerInGame[target], "Target not registered");

        Structss.Player storage sender = game.players[game.playerIndex[msg.sender]];
        Structss.Player storage targetPlayer = game.players[game.playerIndex[target]];
        require(sender.isActive && targetPlayer.isActive, "Players must be active");

        uint8 card = game.deck[game.deck.length - 1];
        targetPlayer.hand.push(card);
        game.deck.pop();

        emit CardDrawn(target, card);

        if (calculateHandValue(targetPlayer.hand) > BLACKJACK) {
            targetPlayer.isActive = false;
            emit WinnerDeclared(target, gameId);
            declareWinner(gameId);
        }
    }

    function stand(uint256 gameId) external onlyEntryPoint {
        Structss.CurrentGame storage game = gameStarted[gameId];
        require(game.gameState == Structss.GameState.PLAYING, "Game not playing");
        require(game.isPlayerInGame[msg.sender], "Not registered");

        Structss.Player storage player = game.players[game.playerIndex[msg.sender]];
        require(player.isActive, "Player already inactive");

        player.isActive = false;

        emit WinnerDeclared(msg.sender, gameId);
        declareWinner(gameId);
    }

    function calculateHandValue(uint8[] memory hand) internal pure returns (uint8) {
        uint8 value = 0;
        uint8 aces = 0;

        for (uint256 i = 0; i < hand.length; i++) {
            uint8 cardValue = hand[i] % 13;
            if (cardValue >= 10) {
                value += 10;
            } else if (cardValue == 0) {
                value += 11;
                aces++;
            } else {
                value += cardValue + 1;
            }
        }

        while (value > BLACKJACK && aces > 0) {
            value -= 10;
            aces--;
        }

        return value;
    }

    function declareWinner(uint256 gameId) internal {
        Structss.CurrentGame storage game = gameStarted[gameId];
        require(game.gameState == Structss.GameState.PLAYING, "Game not playing");

        address winner = address(0);
        uint8 bestScore = 0;

        for (uint256 i = 0; i < game.players.length; i++) {
            Structss.Player storage player = game.players[i];
            if (player.isActive) {
                uint8 score = calculateHandValue(player.hand);
                if (score > bestScore && score <= BLACKJACK) {
                    bestScore = score;
                    winner = player.addr;
                }
            }
        }

        if (winner != address(0)) {
            uint256 winnings = game._totalBet;
            IERC20(_token).safeTransfer(winner, winnings);

            emit WinnerDeclared(winner, gameId);

            // Mint Rank NFT
            (,,,address nftAddr) = _entry.getUserInfo(winner);
            mintRankNFT(winner, 1, 1, nftAddr);
        }

        delete gameStarted[gameId];
        emit GameReset(gameId);
    }

function createDeck() internal pure returns (uint8[] memory) {
    uint8[] memory deck = new uint8[](52);
    for (uint8 i = 0; i < 52; i++) {
        deck[i] = i;
    }
    return deck;
}

    // Secure shuffle using Chainlink VRF random seed
    function shuffleDeckWithSeed(uint8[] memory deck, uint256 randomSeed) internal pure returns (uint8[] memory) {
        for (uint256 i = deck.length - 1; i > 0; i--) {
            uint256 j = uint256(keccak256(abi.encode(randomSeed, i))) % (i + 1);
            (deck[i], deck[j]) = (deck[j], deck[i]);
        }
        return deck;
    }

    function dealPlayersWithCards(uint256 gameId) internal {
        Structss.CurrentGame storage game = gameStarted[gameId];
        require(game.gameState == Structss.GameState.DEALING, "Game not dealing");

        for (uint256 i = 0; i < game.players.length; i++) {
            Structss.Player storage player = game.players[i];
            for (uint256 j = 0; j < CARDS_PER_PLAYER; j++) {
                uint8 card = game.deck[game.deck.length - 1];
                player.hand.push(card);
                game.deck.pop();
                emit CardDrawn(player.addr, card);
            }
        }

        game.gameState = Structss.GameState.PLAYING;
        emit CardsDealt(gameId);
    }

    function getGameDetails(uint256 gameId) external view returns (Structss.CurrentGame memory) {
        return gameStarted[gameId];
    }

    function mintRankNFT(address to, uint256 gamesWon, uint256 gamesPlayed, address rankNFTAddress) internal {
        IRankNFT(rankNFTAddress).mintRankNFT(to, gamesWon, gamesPlayed);
    }

    modifier onlyEntryPoint() {
        require(msg.sender == address(_entry), ErrorLib.Manager__OnlyEntryPoint());
        _;
    }
}
