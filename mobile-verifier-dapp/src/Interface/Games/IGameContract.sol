// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IGameContractCrossChain {
    // Events
    event GameStarted(address indexed player, uint256 betAmount);
    event CardDrawn(address indexed player, uint256 cardValue);
    event GameResult(address indexed player, bool won, uint256 amount);
    event CrossChainUpdate(address indexed player, bytes32 updateHash);
    event BalanceUpdated(address indexed player, uint256 newBalance);

    // Start a new game with a bet
    function startGame(uint256 betAmount) external;

    // Player action to draw another card
    function hit() external;

    // Player action to stand
    function stand() external;

    // Cross-chain verification functions
    function verifyPolkadotUpdate(bytes32 updateHash, bytes calldata proof) external view returns (bool);
}
