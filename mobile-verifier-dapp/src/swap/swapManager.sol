//SPDX-License-Identifier:MIT

pragma solidity 0.8.26;
import { ISwapRouter } from "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import { IERC20, SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { IManager } from "../Interface/Core/Imanager.sol";
import{ ISwapManager } from "../Interface/Core/Iswapmanager.sol";
contract SwapManger is ISwapManager {
   

using SafeERC20 for IERC20;

   
    address public override swapRouter;

 
    address public immutable override uniswapFactory;

    IManager public immutable override manager;

  
    bytes32 internal constant POOL_INIT_CODE_HASH = 0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54;

constructor(address _entry, address _uniswapFactory,
        address _swapRouter,
        address _manager){
        require(_entry != address(0), "Entry address cannot be zero");
        require(_uniswapFactory != address(0), "Uniswap factory address cannot be zero");
        require(_swapRouter != address(0), "Swap router address cannot be zero");
        require(_manager != address(0), "Manager address cannot be zero");
         uniswapFactory = _uniswapFactory;
        swapRouter = _swapRouter;
        manager = IManager(_manager);
        //entryPoint = IEntry(_entry);

}

    function swapExactInputSingle(address tokenIn,
    address tokenOut,
    uint24 tick,
    uint256 amountIn,
    uint256 minAmountOut,
    uint40 deadline
    address receivier)
     external returns(uint256 amountout){
        beforeSwap();

        IERC20(tokenIn).approve(address (swapRouter), amountIn);
      ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                fee: fee,
                recipient: receivier,
                deadline: deadline,
                amountIn: amountIn,
                amountOutMinimum: minAmountOut,
                sqrtPriceLimitX96: 0
            });

        amountout = swapRouter.exactInputSingle(params);

        if(amountout < amountIn) {
             IERC20(tokenIn).forceApprove({ spender: address(swapRouter), value: 0 });
           
            IERC20(tokenIn).safeTransfer(receivier, amountIn - amountIn);
        }

    }

 
     function setSwapRouter(
        address _swapRouter
    ) external override onlyOwner {
        require(_swapRouter != address(0);
        require(swapRouter != _swapRouter);
        emit SwapRouterUpdated(swapRouter, _swapRouter);
        swapRouter = _swapRouter;
    }

    function beforeSwap() internal{
      // will add paused stauts 
    }

       modifier onlyOwner() {
        require(msg.sender == manager.defaultProAdmin());      
        _;  
        }

        modifier onlyEntryPoint() {
        require(msg.sender == entryPoint);
        _;
        }

}