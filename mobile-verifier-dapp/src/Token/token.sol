// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IEntry} from "../Interface/Core/Ientry.sol";

contract Token is ERC20 {
    address public owner;
IEntry public entryPoint;

    constructor(address _entryPoint) ERC20("blopToken", "bT") {
        require(_entryPoint != address(0), "Entry point cannot be zero address");
        entryPoint = IEntry(_entryPoint);
        
     
    }

  
    function mint(address to, uint256 amount) public onlyEntryPoint{
        _mint(to, amount);
    }

    function burn(uint256 amount) public onlyEntryPoint {
        _burn(msg.sender, amount);
    }

      modifier onlyEntryPoint() {
        require(msg.sender == entryPoint);
        _;
        }
}