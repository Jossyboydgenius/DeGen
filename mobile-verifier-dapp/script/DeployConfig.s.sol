// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library DeployConfig {
    // Network RPC URLs
    string constant POLKADOT_RPC = "wss://rpc.polkadot.io";
    string constant FLARE_RPC = "https://flare-api.flare.network/ext/bc/C/rpc";

    // Chain IDs
    uint256 constant POLKADOT_CHAIN_ID = 0;
    uint256 constant FLARE_CHAIN_ID = 14;

    // Gas Settings
    uint256 constant POLKADOT_GAS_LIMIT = 5000000;
    uint256 constant FLARE_GAS_LIMIT = 8000000;
    uint256 constant POLKADOT_GAS_PRICE = 1 gwei;
    uint256 constant FLARE_GAS_PRICE = 250 gwei;

    // VRF Settings
    struct VRFConfig {
        address coordinator;
        bytes32 keyHash;
        uint64 subscriptionId;
        uint32 callbackGasLimit;
        uint16 requestConfirmations;
        uint32 numWords;
    }

    // Polkadot VRF Configuration
    VRFConfig constant POLKADOT_VRF = VRFConfig({
        coordinator: 0x0000000000000000000000000000000000000000, // Replace with actual address
        keyHash: 0x0000000000000000000000000000000000000000000000000000000000000000, // Replace with actual key hash
        subscriptionId: 0, // Replace with your subscription ID
        callbackGasLimit: 100000,
        requestConfirmations: 3,
        numWords: 1
    });

    // Flare VRF Configuration
    VRFConfig constant FLARE_VRF = VRFConfig({
        coordinator: 0x0000000000000000000000000000000000000000, // Replace with actual address
        keyHash: 0x0000000000000000000000000000000000000000000000000000000000000000, // Replace with actual key hash
        subscriptionId: 0, // Replace with your subscription ID
        callbackGasLimit: 100000,
        requestConfirmations: 3,
        numWords: 1
    });

    // Verification Settings
    struct VerificationConfig {
        string apiKey;
        string apiUrl;
        bool verify;
    }

    // Polkadot Verification Configuration
    VerificationConfig constant POLKADOT_VERIFY = VerificationConfig({
        apiKey: "", // Add your API key
        apiUrl: "https://api.polkadot.subscan.io",
        verify: true
    });

    // Flare Verification Configuration
    VerificationConfig constant FLARE_VERIFY = VerificationConfig({
        apiKey: "", // Add your API key
        apiUrl: "https://flare-explorer.flare.network/api",
 