// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import { Structss } from "../DataTypes/Structs.sol";

interface IEntry {
    // ----------- View Functions -----------

    function getUserInfo(address user) external view returns (Structss.UserInfoMation memory);

    function getBalanceOf(address user, address tokenAddress) external view returns (uint256);

    // ----------- User Actions -----------

    function registerUser() external;

    function enterAaveMarket(uint256 amountIn, uint256 minAmountOut) external;

    function exitAaveMarket(uint256 amountIn, uint256 minAmountOut) external;

    function swapTokens(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 minAmountOut,
        uint40 tier,
        uint40 deadline,
        address receiverAddr
    ) external;

    // ----------- Admin/Internal Accessible -----------

    function increaseBlance(address user, uint256 amount) external;

    function decreaseBlance(address user, uint256 amount) external;
}
