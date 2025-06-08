//SPDX-License-Identifier:MIT

pragma solidity 0.8.28;
import{Structss} from "../DataTypes/Structs.sol";
import{ErrorLib} from "../DataTypes/Errors.sol";
import { IManager } from "../Interface/Core/Imanager.sol";
import{IFarm} from "../Interface/Aave/IFarm.sol";
import {Token} from "../Token/token.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

import {ISwapManager} from "../Interface/Core/Iswapmanager.sol";
import{ICardGameWithNFT} from "../Interface/Games/IGameContract.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import{ IRankNFT} from "../Interface/Games/IRankNFT.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
contract Entry{

using SafeERC20 for IERC20;

IFarm public farm;
IManager public manager;
ICardGameWithNFT public gameContract;
 IRankNFT _rankNFT;
Token public token;
ISwapManager public swapManager;
Structss.UserInfoMation infoForUser;
Structss.Community community;
Structss.Group group;

mapping(address => Structss.UserInfoMation) private userStuff;
 mapping(uint256 => Structss.Community) public communities; 
   mapping(uint256 => Structss.Group) public groups;

uint256 public groupCount;
uint256 public communityCount;


constructor(address _manager, address _farm, address _token, address _swapManager, address _gameContract, IRankNFT rankNFT) {
    require(_manager != address(0), ErrorLib.Entry__Zero_Address());
    require(_farm != address(0), ErrorLib.Entry__Zero_Address());
    require(_token != address(0), ErrorLib.Entry__Zero_Address());
    manager = IManager(_manager);
    token = Token(_token);
    farm = IFarm(_farm);
    swapManager= ISwapManager(_swapManager);
    gameContract = ICardGameWithNFT(_gameContract);
    _rankNFT =  IRankNFT(rankNFT);
}

///////////////////////////// register user/////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
 function registerUser() public{
    require(userStuff[msg.sender].mAddr == address(0), ErrorLib.Entry__already_Registered());
    address _mAddr = activate(msg.sender);
    address rNFT = cloneRankNFTContract(msg.sender);

    userStuff[msg.sender] = Structss.UserInfoMation ({
        mAddr: _mAddr,
        balance:0,
        tokenBalance:0,
        _rankNFT: rNFT
    });

    

 } 

   function createCommunity(string memory _name) public {
        //manager.OnlyManager();

        communityCount++;
       Structss.Community storage c = communities[communityCount];
        c.name = _name;
        c.owner = msg.sender;
        c.members.push(msg.sender);
        c.isMember[msg.sender] = true;
    }

  function joinCommunity(uint256 communityId) public {
        require(userStuff[msg.sender].mAddr != address(0), ErrorLib.Entry__not_Registered());

      Structss.Community storage c = communities[communityId];
        require(!c.isMember[msg.sender], ErrorLib.Entry_Already_Member());

        c.members.push(msg.sender);
        c.isMember[msg.sender] = true;
    }

    function createGroup(string memory _name) public {
        require(userStuff[msg.sender].mAddr != address(0), ErrorLib.Entry__not_Registered());

        groupCount++;
        Structss.Group storage g = groups[groupCount];
        g.name = _name;
        g.creator = msg.sender;
        g.members.push(msg.sender);
        g.isMember[msg.sender] = true;
    }

 function addGroupMember(uint256 groupId, address member) public {
        require(userStuff[member].mAddr != address(0), ErrorLib.Entry__not_Registered());

          Structss.Group storage g = groups[groupId];
        require(g.creator == msg.sender, ErrorLib.Entry_only_Creator_Can_Add_Member());
        require(!g.isMember[member], ErrorLib.Entry_Already_Member());

        g.members.push(member);
        g.isMember[member] = true;
    }


/////////////////////DeFi/////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//@dev will chain and make it a cross chain Market type using CCIP

 function enterAaveMarket(uint256 amountIn, uint minAmountOut) public{
    require(userStuff[msg.sender].mAddr != address(0), ErrorLib.Entry__not_Registered());
    uint256 amountReceived = farm.depositToAave(amountIn, minAmountOut);
    // mint Tokens of equilavalnce to user
    token.mint(msg.sender, amountReceived);
    userStuff[msg.sender].tokenBalance += amountIn;
   
 }

 function exitAaveMarket(uint256 amountIn, address to, uint minAmountOut) public{
    require(userStuff[msg.sender].mAddr != address(0), ErrorLib.Entry__not_Registered());
    uint256 amountReceived = farm.withdrawFromAave(amountIn,to, minAmountOut);
    // burn Tokens of equilavalnce to user
    token.burn(amountReceived);
    userStuff[msg.sender].tokenBalance -= amountIn;


    }


function swapTokens(address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut, uint24 tier, uint40 deadline, address receiverAddr) public {
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
function createGame(uint256 totalPlayers, uint256 betAmountRequired) public {
    require(userStuff[msg.sender].mAddr != address(0), ErrorLib.Entry__not_Registered());
    require(betAmountRequired > manager.getminbetAmount(), ErrorLib.Entry__bet_Amount_Cannot_Be_Zero());
    require(betAmountRequired <= manager.getmaxbetAmount(), ErrorLib.Entry_betAmountTooBig());

    gameContract.CreateNewGame(totalPlayers, betAmountRequired);
}

function startGame(uint256 gamesId, uint256 _betamount) public {
    require(userStuff[msg.sender].mAddr != address(0), ErrorLib.Entry__not_Registered());
    require(_betamount > manager.getminbetAmount(), ErrorLib.Entry__bet_Amount_Cannot_Be_Zero());
    require(_betamount <=manager.getmaxbetAmount(), ErrorLib.Entry_betAmountTooBig());

    
    gameContract.startGame(gamesId);
    
}

function hit(uint256 gameId) public{
   
    gameContract.hit(gameId);
}

function stand(uint256 gameId) public{
   
    gameContract.stand(gameId);
}
function poke(uint256 gameId, address target) public {
   
    gameContract.poke(gameId, target);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////// Internal Functions/////////////////////////////////////////////////////////////////////////////////////////////

function activate(address UserAdminAddress)  internal returns(address mAddr){
    address impl = getManagerAddress();
     mAddr = Clones.clone(impl);
      return mAddr;

}

    //@dev move this to entry contract and addd to user
function cloneRankNFTContract(address user) internal returns (address rNFT) {
    address impl = getNFTContractAddress();
     rNFT = Clones.clone(impl);
    return rNFT;
}


//Only certain function can call this
function increaseBlance(address user, uint256 amount) internal {
    require(userStuff[user].mAddr != address(0), ErrorLib.Entry__not_Registered());
    userStuff[user].balance += amount;
}

//Only certain function can call this
function decreaseBlance(address user, uint256 amount) internal {
    require(userStuff[user].mAddr != address(0), ErrorLib.Entry__not_Registered());
    require(userStuff[user].balance >= amount, "Insufficient balance");
    userStuff[user].balance -= amount;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////  Getters///////////////////////////////////////////////////////////////////////////////////////////////
function getUserInfo(address user) public view returns(address, uint256, uint256, address) {
    require(userStuff[user].mAddr != address(0), ErrorLib.Entry__not_Registered());
    // Return the user information
  Structss.UserInfoMation  memory userInfo = userStuff[user];
    return (userInfo.mAddr, userInfo.balance, userInfo.tokenBalance, userInfo._rankNFT);

}
function getBalanceOf(address user, address tokenAddress) public view returns (uint256) {
    IERC20 _token = IERC20(tokenAddress); // correct type
    return _token.balanceOf(user);        // call balanceOf() on IERC20 instance
}

function getManagerAddress() public view returns(address){
    return address(manager);}

    function getNFTContractAddress() public view returns(address){
    return address(_rankNFT);}

}