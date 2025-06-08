// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "./DeployConfig.s.sol";
import "../src/RandomnessGame.sol";
import "../src/TransactionVerifier.sol";
import "../src/UserProfile.sol";
import "../src/VendorRegistry.sol";
import "../src/YieldVault.sol";

contract DeployPolkadotScript is Script {
    using DeployConfig for *;

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy RandomnessGame with Polkadot VRF config
        RandomnessGame randomnessGame = new RandomnessGame(
            DeployConfig.POLKADOT_VRF.coordinator,
            DeployConfig.POLKADOT_VRF.keyHash,
            DeployConfig.POLKADOT_VRF.subscriptionId
        );

        // Deploy TransactionVerifier
        TransactionVerifier transactionVerifier = new TransactionVerifier();

        // Deploy UserProfile
        UserProfile userProfile = new UserProfile();

        // Deploy VendorRegistry
        VendorRegistry vendorRegistry = new VendorRegistry();

        // Deploy YieldVault
        YieldVault yieldVault = new YieldVault();

        vm.stopBroadcast();

        // Log deployed addresses
        console.log("Network: Polkadot");
        console.log("Chain ID:", DeployConfig.POLKADOT_CHAIN_ID);
        console.log("RandomnessGame deployed to:", address(randomnessGame));
        console.log("TransactionVerifier deployed to:", address(transactionVerifier));
        console.log("UserProfile deployed to:", address(userProfile));
        console.log("VendorRegistry deployed to:", address(vendorRegistry));
        console.log("YieldVault deployed to:", address(yieldVault));

        // Verify contracts if enabled
        if (DeployConfig.POLKADOT_VERIFY.verify) {
            console.log("\nVerifying contracts...");
            verifyContract("RandomnessGame", address(randomnessGame));
            verifyContract("TransactionVerifier", address(transactionVerifier));
            verifyContract("UserProfile", address(userProfile));
            verifyContract("VendorRegistry", address(vendorRegistry));
            verifyContract("YieldVault", address(yieldVault));
        }
    }

    function verifyContract(string memory name, address deployedAddress) internal {
        string memory command = string(abi.encodePacked(
            "forge verify-contract ",
            deployedAddress,
            " src/",
            name,
            ".sol:",
            name,
            " --chain-id ",
            vm.toString(DeployConfig.POLKADOT_CHAIN_ID),
            " --watch"
        ));
        vm.ffi(command);
    }
} 