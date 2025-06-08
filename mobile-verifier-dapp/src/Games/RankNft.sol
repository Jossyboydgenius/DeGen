// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {IEntry} from "../Interface/Core/IEntry.sol";
import {IManager} from "../Interface/Core/Imanager.sol";
import {IRankNFT} from "../Interface/Games/IRankNFT.sol";

contract RankNFT is ERC721, IRankNFT{
    uint256 private _nextTokenId;
   
    
    IEntry public entryPoint;
    address public gameContract;

    enum HeroLevel {
        Beginner,
        Intermediate,
        Advanced,
        Master,
        GrandMaster
    }

    // struct Hero {
    //     uint256 numberOfGamesPlayed;
    //     uint256 numberOfGamesWon;
    // }

    mapping(address => Hero) public heroes;
    uint256[] public levelAttained;

    constructor(address _entryPoint, address _gameContract) ERC721("CrossChainHeroes", "CCHERO") {
        require(_entryPoint != address(0), "Invalid entry point address");
        require(_gameContract != address(0), "Invalid game contract address");
        entryPoint = IEntry(_entryPoint);
        gameContract = _gameContract;
        _nextTokenId = 1;
    }

    function mintRankNFT(address to, uint256 winCount, uint256 playCount) public onlyGameContract {
        // Ensure user is registered via EntryPoint (you can handle validation as needed)
      //  (, , ,,) = entryPoint.getUserInfo(to); // just to validate user exists

        heroes[to] = Hero({
            numberOfGamesPlayed:  playCount,
            numberOfGamesWon:   winCount
        });

        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        _safeMint(to, tokenId);
        levelAttained.push(tokenId);
    }

    function getAllNFTsMinted() external view returns (uint256[] memory) {
        return levelAttained;
    }

    modifier onlyGameContract() {
        require(msg.sender == gameContract, "Caller is not the game contract");
        _;
    }
}
