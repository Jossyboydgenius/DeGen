// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { Farm } from "./Farm.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { IAaveV3Pool } from "../Interface/Aave/IAaveV3Pool.sol";
import { IAddressProvider } from "../Interface/Aave/IAddressProvider.sol";
import { IAaveDataProvider } from "../Interface/Aave/IAaveDataProvider.sol";

contract AaveV3Farm is Farm {
    using SafeERC20 for IERC20;

    address public immutable aToken;
    address public immutable lendingPool;

    constructor(address _aToken, address _lendingPool, address _manager, address _assetToken)
        Farm(_assetToken, _manager)
    {
        aToken = _aToken;
        lendingPool = _lendingPool;
    }

    function assets() public view override returns (uint256) {
        return ERC20(aToken).balanceOf(address(this));
    }

    function liquidity() public view override returns (uint256) {
        uint256 totalAssets = assets();

        address dataProvider = IAddressProvider(IAaveV3Pool(lendingPool).ADDRESSES_PROVIDER())
            .getPoolDataProvider();
        bool isAavePaused = IAaveDataProvider(dataProvider).getPaused(assetToken);

        if (isAavePaused) return 0;

        uint256 available = ERC20(assetToken).balanceOf(aToken);
        return available < totalAssets ? available : totalAssets;
    }

    function _depositToAave(uint256 amount) internal override {
        super._depositToAave(amount); // run cap checks
        IERC20(assetToken).forceApprove(address(lendingPool), amount);
        IAaveV3Pool(lendingPool).supply(assetToken, amount, address(this), 0);
    }

    function _withdrawFromAave(uint256 amount, address to) internal override {
        IAaveV3Pool(lendingPool).withdraw(assetToken, amount, to);
    }

    function _underlyingProtocolMaxDeposit() internal view override returns (uint256) {
        address dataProvider = IAddressProvider(IAaveV3Pool(lendingPool).ADDRESSES_PROVIDER())
            .getPoolDataProvider();

        (, uint256 supplyCap) = IAaveDataProvider(dataProvider).getReserveCaps(assetToken);
        if (supplyCap == 0) return type(uint256).max;

        uint256 decimals = ERC20(assetToken).decimals();
        uint256 capInDecimals = supplyCap * 10 ** decimals;

        IAaveDataProvider.AaveDataProviderReserveData memory data =
            IAaveDataProvider(dataProvider).getReserveData(assetToken);

        uint256 used = data.totalAToken + data.accruedToTreasuryScaled;
        if (used >= capInDecimals) return 0;

        return capInDecimals - used;
    }
}
