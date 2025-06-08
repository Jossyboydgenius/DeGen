// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IManager } from "../Interface/Core/Imanager.sol";
import { IFarm } from "../Interface/Aave/IFarm.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

abstract contract Farm is IFarm {
    using SafeERC20 for IERC20;

    address public immutable assetToken;
    uint256 public cap;
    IManager public immutable  manager;

    address internal entryPoint;

    error CapExceeded(uint256 newAmount, uint256 cap);
    error SlippageTooHigh(uint256 minAssetsOut, uint256 assetsReceived);

    event CapUpdated(uint256 newCap);
    event MaxSlippageUpdated(uint256 newMaxSlippage);

    constructor(address _assetToken, address _manager) {
        require(_assetToken != address(0) && _manager != address(0), "Zero address");
        assetToken = _assetToken;
        cap = type(uint256).max;
        manager = IManager(_manager);
    }

    function assets() public view virtual returns (uint256);

    function maxDepositToAave() public view virtual returns (uint256) {
        uint256 currentAssets = assets();
        if (currentAssets >= cap) return 0;
        uint256 protocolMax = _underlyingProtocolMaxDeposit();
        uint256 defaultMax = cap - currentAssets;
        return protocolMax < defaultMax ? protocolMax : defaultMax;
    }

    function depositToAave(uint256 amountIn, uint256 minAssetsOut)
        external
        virtual
        onlyEntryPoint
        returns (uint256)
    {
        uint256 assetsBefore = assets();

        IERC20(assetToken).safeTransferFrom(msg.sender, address(this), amountIn);
        _depositToAave(amountIn);

        uint256 assetsAfter = assets();
        uint256 assetsReceived = assetsAfter - assetsBefore;

        if (assetsReceived < minAssetsOut) {
            revert SlippageTooHigh(minAssetsOut, assetsReceived);
        }

        return assetsReceived;
    }

    function withdrawFromAave(uint256 amount, address to, uint256 minAssetsOut)
        external
        virtual
        onlyEntryPoint
        returns (uint256)
    {
        uint256 assetsBefore = assets();

        _withdrawFromAave(amount, to);

        uint256 assetsAfter = assets();
        uint256 assetsSpent = assetsBefore - assetsAfter;

        if (assetsSpent < minAssetsOut) {
            revert SlippageTooHigh(minAssetsOut, assetsSpent);
        }

        return assetsSpent;
    }

    function _depositToAave(uint256 amount) internal virtual {
        uint256 currentAssets = assets();
        uint256 maxAllowed = maxDepositToAave();
        if (currentAssets + amount > maxAllowed) {
            revert CapExceeded(currentAssets + amount, cap);
        }
    }

    function _underlyingProtocolMaxDeposit() internal view virtual returns (uint256) {
        return type(uint256).max;
    }

    function _withdrawFromAave(uint256, address) internal virtual;

    modifier onlyEntryPoint() {
        require(msg.sender == entryPoint, "Only EntryPoint");
        _;
    }
}
