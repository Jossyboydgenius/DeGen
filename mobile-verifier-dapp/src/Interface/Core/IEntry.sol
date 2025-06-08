// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

interface IEntry {
    // ----------- Registration -----------
    function registerUser() external;

    // ----------- Community -----------
    function createCommunity(string memory _name) external;
    function joinCommunity(uint256 communityId) external;

    // ----------- Group -----------
    function createGroup(string memory _name) external;
    function addGroupMember(uint256 groupId, address member) external;

    // ----------- DeFi / Aave -----------
    function enterAaveMarket(uint256 amountIn, uint256 minAmountOut) external;
    function exitAaveMarket(uint256 amountIn, uint256 minAmountOut) external;

    // ----------- Swap -----------
    function swapTokens(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 minAmountOut,
        uint40 tier,
        uint40 deadline,
        address receiverAddr
    ) external;

    // ----------- Game -----------
    function createGame(uint256 totalPlayers, uint256 betAmountRequired) external;
    function startGame(uint256 gamesId) external;
    function hit(uint256 gameId) external;
    function stand(uint256 gameId) external;
    function poke(uint256 gameId, address target) external;

    // ----------- Getters -----------
    function getUserInfo(address user) external view returns (
        address mAddr,
        uint256 balance,
        uint256 tokenBalance,
        address _rankNFT
    );

    function getBalanceOf(address user, address tokenAddress) external view returns (uint256);
}
