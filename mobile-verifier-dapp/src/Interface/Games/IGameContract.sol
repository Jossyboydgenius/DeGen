// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { Structss } from "../../DataTypes/Structs.sol";

interface ICardGameWithNFT {
    // Events
  
    // Game creation and flow
    function CreateNewGame(uint256 betAmountRequired, uint256 noOFPlayer) external;
    function joinGame(uint256 gameId, uint256 _amount) external;
    function startGame(uint256 gameId) external;

    // Player actions
    function hit(uint256 gameId) external;
    function poke(uint256 gameId, address target) external;
    function stand(uint256 gameId) external;

    // View functions
   
}
