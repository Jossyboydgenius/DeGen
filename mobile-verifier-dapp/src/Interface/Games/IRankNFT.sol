// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

interface IRankNFT {
    /// @notice Struct representing hero statistics
    struct Hero {
        uint256 numberOfGamesPlayed;
        uint256 numberOfGamesWon;
    }

    /// @notice Mint a rank NFT for a player
    /// @param to The address receiving the NFT
    /// @param winCount Total number of wins
    /// @param playCount Total number of games played
    function mintRankNFT(address to, uint256 winCount, uint256 playCount) external;

    /// @notice Get all NFT token IDs that have been minted
    /// @return An array of token IDs
    function getAllNFTsMinted() external view returns (uint256[] memory);

  
    function heroes(address player) external view returns (uint256 numberOfGamesPlayed, uint256 numberOfGamesWon);
}
