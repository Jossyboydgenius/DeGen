//SPDX-License-Identifier:MIT

pragma solidity 0.8.26;
import{PermissionImp} from "../src/Permision/Permissioninfo.sol";
import{ErrorLib} from "../DataTypes/Errors.sol";
import{Structss} from "../DataTypes/Structs.sol";
import{IEntry} from "../Core/Entry.sol";
import {IManager} from "../Interface/Core/Imanager.sol";

contract Manager is  IManager, PermissionImp{
    Entry entryPoint;
Structss.TokenInfo tokenImfo;
bytes manager = abi.encodePacked(keccak256("manager"));
bytes UserGov = abi.encodePacked(keccak256("UserGov"));


///Default anvil address
bytes defaultProAdmin = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;

////state variables////

uint256 minAmount = 1e18;
uint256 cap;
uint256 minbetAmount;
uint256 maxbetAmount;

///mapping
mapping(address => tokenImfo) public tokenAddressToInfo;
mapping(address => bool) public whitelistTokens;

mapping(address => bool) public isExistingOracle;
address[] private oracles;

 // the user address with control
constructor(bytes userAdmin){
   
    adminUser = userAdmin;
   
}


function addwhiteListTokens(address _tokenAddrr) public OnlyManager{
    require(whitelistTokens[_tokenAddrr] == false, ErrorLib.Manager_Token_Already_Added());
    tokenAddressToInfo[_tokenAddrr] = tokenImfo({
        heartbeat: 1 days,
        lastechangeRate: 1e18
    });

    whitelistTokens[_tokenAddrr] = true;

}

function addOracle(address _oracleAddress) public OnlyManager{
    require( isExistingOracle == false, ErrorLib.Manager__Oracle_already_Added());
    oracles.push(_oracleAddress);
     isExistingOracle = true;


}

// for users on trade mode , will trigger only trade mode activities
//only owner manager can change this
function setManager(bytes _manager) public CanCallonProAdmin {
  require(_manager != bytes(0), ErrorLib.Manager__Can_not_be_Address());
  manager = _manager;
}    

function setMinDeposit(uint256 _min) public OnlyManager{
    require(_min > 0, ErrorLib.Manager__UserGov_Connot_be_Zero());
    minAmount  = _min;
}

    function setCap(uint256 _newCap) external OnlyManager{
        cap = _newCap;
        emit CapUpdated(_newCap);
    }

    
    function setCaponbet(uint256 _minbetAmount, uint256 _maxbetAmount) external OnlyManager{
       minbetAmount = _minbetAmount;
       maxbetAmount = _maxbetAmount;
        emit CapUpdated(_newCap);
    }

////OnlyUser Can cahange this//////
function setUserRolesGoverner(bytes _userGov) public CancallOnUser {
    require(_userGov != bytes(0), ErrorLib.Manager__UserGov_Connot_be_Zero());
    UserGov = _userGov;
}
function getminbetAmount() public view returns(uint256){
    return minbetAmount;
}
function getmaxbetAmount() public view returns(uint256){
    return maxbetAmount;
}
function getMinAmount() public view returns(uint256){
    return minAmount;
}


modifier OnlyManager() {
    require(msg.sender == manager, ErrorLib.Manager__must_Be_Manager());
}
modifier OnlyEntryPoint(){
    require(msg.sender == entryPoint, ErrorLib.Manager__OnlyEntryPoint() );
}

}