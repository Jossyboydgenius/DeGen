// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

interface IManager {
    // State-changing functions
    function addwhiteListTokens(address _tokenAddr) external;
    function addOracle(address _oracleAddress) external;
    function setManager(address _manager) external;
    function setMinDeposit(uint256 _min) external;
    function setCap(uint256 _newCap) external;
    function setCaponbet(uint256 _minbetAmount, uint256 _maxbetAmount) external;
    function setUserRolesGoverner(address _userGov) external;

    // View functions
    function getminbetAmount() external view returns (uint256);
    function getmaxbetAmount() external view returns (uint256);
    function getMinAmount() external view returns (uint256);

    // Optional: You can also define events here if you want others to listen for changes
    event CapUpdated(uint256 newCap);
}
