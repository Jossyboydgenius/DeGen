//SPDX-License-Identifier:MIT

pragma solidity 0.8.28;


library Structss{


   struct TokenInfo{
   // address  tokenAddress;
    uint256 heartbeat;
    uint256 lastechangeRate;

   }

struct UserInfoMation{
    address mAddr;//clone mager for user address
    uint256 balance;
    uint256 tokenBalance;
    address _rankNFT;
}

  struct Community {
        string name;
        address owner;
        address[] members;
        mapping(address => bool) isMember;
    }

    struct Group {
        string name;
        address creator;
        address[] members;
        mapping(address => bool) isMember;
    }
    
 struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        uint256 timestamp;
        string ref; 
    }

       // Enums
    enum GameState {
        WAITING,
        SHUFFLING,
        DEALING,
        PLAYING,
        FINISHED
    }
 struct UserInfo{
        uint256 totalGamesPlayed;
        uint256 totalGamesWon;
    }

    // Structs
    struct Player {
        address addr;
        uint8[] hand;
        bool isActive;
        address rankNFT;
        uint256 totalgamesWon;
        uint256 totalGamesPlayed;
    }
    
   
   struct CurrentGame {
    uint256 totalPlayers;
    uint256 betAmountRequired;
    uint256 lastTimestamp;
    GameState gameState;
    uint256 _totalBet;
    uint256 totalbet;
    uint8[] deck;
    mapping(address => bool) isPlayerInGame;
    Player[] players;
}
}