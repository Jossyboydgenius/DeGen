// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

interface ISwapManager {
    // Events
    event SwapRouterUpdated(address indexed oldRouter, address indexed newRouter);

    // External/public functions
    function swapExactInputSingle(
        address tokenIn,
        address tokenOut,
        uint24 tick,
        uint256 amountIn,
        uint256 minAmountOut,
        uint40 deadline,
        address receivier
    ) external returns (uint256 amountout);

    function setSwapRouter(address _swapRouter) external;

    // View functions
    function swapRouter() external view returns (address);
    function uniswapFactory() external view returns (address);
    function manager() external view returns (address);
}
