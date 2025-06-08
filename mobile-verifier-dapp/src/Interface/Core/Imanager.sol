// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface IManager {
    /// @notice Emitted when the cap is updated
    event CapUpdated(uint256 newCap);

    /// @notice Adds a token to the whitelist
    /// @param _tokenAddrr The address of the token
    function addwhiteListTokens(address _tokenAddrr) external;

    /// @notice Adds a new oracle
    /// @param _oracleAddress The oracle's address
    function addOracle(address _oracleAddress) external;

    /// @notice Sets the manager identifier (bytes32 format)
    /// @param _manager The new manager role identifier
    function setManager(bytes calldata _manager) external;

    /// @notice Sets the minimum deposit amount
    /// @param _min The new minimum amount
    function setMinDeposit(uint256 _min) external;

    /// @notice Sets the platform cap
    /// @param _newCap The new cap value
    function setCap(uint256 _newCap) external;

    /// @notice Sets the betting min and max amounts
    /// @param _minbetAmount Minimum allowed bet
    /// @param _maxbetAmount Maximum allowed bet
    function setCaponbet(uint256 _minbetAmount, uint256 _maxbetAmount) external;

    /// @notice Sets the user governance role identifier
    /// @param _userGov The new user governor role identifier
    function setUserRolesGoverner(bytes calldata _userGov) external;

    /// @notice Returns the minimum allowed bet amount
    function getminbetAmount() external view returns (uint256);

    /// @notice Returns the maximum allowed bet amount
    function getmaxbetAmount() external view returns (uint256);

    /// @notice Returns the minimum deposit amount
    function getMinAmount() external view returns (uint256);
}
