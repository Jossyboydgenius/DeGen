// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { PermissionImp } from "../Permision/Permissioninfo.sol";
import { ErrorLib } from "../DataTypes/Errors.sol";
import { Structss } from "../DataTypes/Structs.sol";
import { IEntry } from "../Interface/Core/IEntry.sol";
import { IManager } from "../Interface/Core/Imanager.sol";

contract Manager is IManager, PermissionImp {
    IEntry public entryPoint;
    Structss.TokenInfo tokenImfo;
    
    address public manager;
    address public UserGov;

    address defaultProAdmin = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;

    uint256 minAmount = 1e18;
    uint256 cap;
    uint256 minbetAmount;
    uint256 maxbetAmount;

    uint256 numberogGamesWonn;
    uint256 numberOfGamesPlayed;

    /// Mappings
    mapping(address => Structss.TokenInfo) public tokenAddressToInfo;
    mapping(address => bool) public whitelistTokens;

    mapping(address => bool) public isExistingOracle;
    address[] private oracles;

    constructor(address userAdmin, address _entryPoint) {
        require(_entryPoint != address(0), ErrorLib.Manager__EntryPoint_Cannot_Be_Zero());
        entryPoint = IEntry(_entryPoint);
        adminUser = userAdmin;
    }

    function addwhiteListTokens(address _tokenAddr) public OnlyManager {
        require(!whitelistTokens[_tokenAddr], ErrorLib.Manager_Token_Already_Added());
        tokenAddressToInfo[_tokenAddr] = Structss.TokenInfo({
            heartbeat: 1 days,
            lastechangeRate: 1e18
        });
        whitelistTokens[_tokenAddr] = true;
    }

    function addOracle(address _oracleAddress) public OnlyManager {
        require(!isExistingOracle[_oracleAddress], ErrorLib.Manager__Oracle_already_Added());
        oracles.push(_oracleAddress);
        isExistingOracle[_oracleAddress] = true;
    }

    function setManager(address _manager) public CanCallonProAdmin {
        require(_manager != address(0), ErrorLib.Manager__Can_not_be_Address());
        manager = _manager;
    }

    function setMinDeposit(uint256 _min) public OnlyManager {
        require(_min > 0, ErrorLib.Manager__UserGov_Connot_be_Zero());
        minAmount = _min;
    }

    function setCap(uint256 _newCap) external OnlyManager {
        cap = _newCap;
        emit CapUpdated(_newCap);
    }

    function setCaponbet(uint256 _minbetAmount, uint256 _maxbetAmount) external OnlyManager {
        minbetAmount = _minbetAmount;
        maxbetAmount = _maxbetAmount;
    }

    function setUserRolesGoverner(address _userGov) public CancallOnUser {
        require(_userGov != address(0), ErrorLib.Manager__UserGov_Connot_be_Zero());
        UserGov = _userGov;
    }

    function getminbetAmount() public view returns (uint256) {
        return minbetAmount;
    }

    function getmaxbetAmount() public view returns (uint256) {
        return maxbetAmount;
    }

    function getMinAmount() public view returns (uint256) {
        return minAmount;
    }

    modifier OnlyManager() {
        require(msg.sender == address(manager), ErrorLib.Manager__must_Be_Manager());
        _;
    }

    modifier OnlyEntryPoint() {
        require(msg.sender == address(entryPoint), ErrorLib.Manager__OnlyEntryPoint());
        _;
    }
}
