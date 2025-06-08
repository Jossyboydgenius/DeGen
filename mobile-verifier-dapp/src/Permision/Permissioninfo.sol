//SPDX-License-Identifier:MIT

pragma solidity 0.8.28;
import{ErrorLib} from "../DataTypes/Errors.sol";
contract PermissionImp{

address adminUser;
address proModeAdmin = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;

// will be cloned by manager contract
//////////Two Major Control Factor////////////////////////////////////////////////////////
// when user is on normal mode (they have 100% perssion and control)
// when user is on other mode (they have partical permision, alwhile still maintianing normal role power)
////////////////////////////////////////////////////////////////////////////////////////
/// changed plans lol



modifier CancallOnUser() {
    require(msg.sender == adminUser, ErrorLib.Permssion__OnlyUserAmin() );
    _;

}

modifier CanCallonProAdmin() {
    require(msg.sender == proModeAdmin, ErrorLib.Permssion__OnlyUserAmin());
    _;
}


}