// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

interface IFarm {
    /// @notice Returns the total asset balance held in the farm (e.g., aToken balance)
    function assets() external view returns (uint256);

    /// @notice Returns the available liquidity that can be withdrawn
    function liquidity() external view returns (uint256);

    /// @notice Returns the manager address controlling this farm
    //function manager() external view returns (address);

    /// @notice Deposits `amountIn` tokens into Aave and returns how much was received
    /// @param amountIn The amount of the underlying asset to deposit
    /// @param minAssetsOut Minimum expected aTokens (for slippage protection)
    /// @return assetsReceived The aTokens received
    function depositToAave(
        uint256 amountIn,
        uint256 minAssetsOut
    ) external returns (uint256 assetsReceived);

    /// @notice Withdraws underlying assets from Aave
    /// @param amount The amount of underlying asset to withdraw
    /// @param to The address to receive the withdrawn assets
    /// @param minAssetsOut Minimum expected assets received (slippage protection)
    /// @return assetsSpent The actual amount of aTokens spent
    function withdrawFromAave(
        uint256 amount,
        address to,
        uint256 minAssetsOut
    ) external returns (uint256 assetsSpent);

    /// @notice Returns the maximum allowed deposit into Aave
    function maxDepositToAave() external view returns (uint256);
}
