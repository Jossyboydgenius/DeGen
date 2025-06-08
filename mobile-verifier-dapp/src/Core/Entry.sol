//SPDX-License-Identifier:MIT

pragma solidity 0.8.26;
import{Structss} from "../DataTypes/Structs.sol";
import{ErrorLib} from "../DataTypes/Errors.sol";
import { IManager } from "../Interface/Core/Imanager.sol";
import{IFarm} from "../Interface/Aave/IFarm.sol";
import {Token} from "../Token/token.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {IswapManager} from "../Interface/Core/Iswapmanager.sol";
import{IGameContractCrossChain} from "../Interface/Games/IGameContractCrossChain.sol";
contract Entry{

IFarm public farm;
IManager public manager;
IGameContractCrossChain public gameContract;
Token public token;
ISwapManager public swapManager;
Structss.UserInfoMation infoForUser;
mapping(address => infoForUser) private userStuff;


constructor(address _manager, address _farm, address _token, address _swapManager, address _gameContract) {
    require(_manager != address(0), ErrorLib.Entry__Zero_Address());
    require(_farm != address(0), ErrorLib.Entry__Zero_Address());
    require(_token != address(0), ErrorLib.Entry__Zero_Address());
    manager = IManager(_manager);
    token = Token(_token);
    farm = IFarm(_farm);
    swapManager = IswapManager(_swapManager);
    gameContract = IGameContractCrossChain(_gameContract);
}

 function registerUser() public{
    require(userStuff[msg.sender].mAddr == address(0), ErrorLib.Entry__already_Registered());
    address _mAddr = activate(msg.sender);

    userStuff[msg.sender] = infoForUser({
        mAddr: _mAddr,
        balance:0,
        tokenBalance:0
    });

    

 } 



 function enterAaveMarket(uint256 amountIn, uint minAmountOut) public{
    require(userStuff[msg.sender].mAddr != address(0), ErrorLib.Entry__not_Registered());
    uint256 amountReceived = farm.depositToAave(amountIn, minAmountOut);
    // mint Tokens of equilavalnce to user
    token.mint(msg.sender, amountReceived);
    userStuff[msg.sender].tokenBalance += amountIn;
   
 }

 function exitAaveMarket(uint256 amountIn, uint minAmountOut) public{
    require(userStuff[msg.sender].mAddr != address(0), ErrorLib.Entry__not_Registered());
    uint256 amountReceived = farm.withdrawFromAave(amountIn, minAmountOut);
    // burn Tokens of equilavalnce to user
    token.burn(amountReceived);
    userStuff[msg.sender].tokenBalance -= amountIn;


    }


function swapTokens(address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut, uint40 tier, uint40 deadline, address receiverAddr) public {
    require(userStuff[msg.sender].mAddr != address(0), ErrorLib.Entry__not_Registered());
    swapManager.swapExactInputSingle(
        tokenIn,
        tokenOut,
        tier, 
        amountIn,
        minAmountOut,
       deadline, 
        receiverAddr
    );
   
}

//////////////////////////game//////////////////////////////////////
////////////////////////////////////////////////////////////////////

function startGame(uint256 _betamount)public {
    require(userStuff[msg.sender].mAddr != address(0), ErrorLib.Entry__not_Registered());
    require(_betamount > manager.getminbetAmount(), ErrorLib.Entry__bet_Amount_Cannot_Be_Zero());
    require(_betamount <=manager.getmaxbetAmount(), ErrorLib.Entry_betAmountTooBig());

    
    gameContract.startGame(_betamount);
    
}

function hit() public{
   
    gameContract.hit();
}

function stand() public{
   
    gameContract.stand();
}

/////////////////////////////////////////////////////////////////////////

function activate(address UserAdminAddress)  internal returns(address mAddr){
      mAddr = Clones.clone(manager(UserAdminAddress));
      return mAddr;

}

//Only certain function can call this
function increaseBlance(address user, uint256 amount) public {
    require(userStuff[user].mAddr != address(0), ErrorLib.Entry__not_Registered());
    userStuff[user].balance += amount;
}

//Only certain function can call this
function decreaseBlance(address user, uint256 amount) public {
    require(userStuff[user].mAddr != address(0), ErrorLib.Entry__not_Registered());
    require(userStuff[user].balance >= amount, "Insufficient balance");
    userStuff[user].balance -= amount;
}

function getUserInfo(address user) public view returns(address, uint256, uint256) {
    require(userStuff[user].mAddr != address(0), ErrorLib.Entry__not_Registered());
    // Return the user information
    infoForUser memory userInfo = userStuff[user];
    return (userInfo.mAddr, userInfo.balance, userInfo.tokenBalance);

}

function getBalanceOf(address user, address tokenAddress) public view returns(uint256){
    IERC20 tokenAddr = IERC20(tokenAddress);
    return tokenAddr.balanceOf(user);
}

}