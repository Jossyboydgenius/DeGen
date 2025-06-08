//SPDX-License-Identifier:MIT

pragma solidity 0.8.26;


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
}

 struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        uint256 timestamp;
        string reference; 
    }
}