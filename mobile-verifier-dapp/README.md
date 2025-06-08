# Mobile Verifier DApp

A decentralized application for mobile verification and transaction management, featuring Chainlink VRF integration for secure random number generation. This project is part of the ETH Belgrade Hackathon.

## Project Structure

```
mobile-verifier-dapp/
├── src/
│   ├── RandomnessGame.sol      # Chainlink VRF integration for random number generation
│   ├── TransactionVerifier.sol # Transaction verification logic
│   ├── UserProfile.sol        # User profile management
│   ├── VendorRegistry.sol     # Vendor registration and management
│   ├── YieldVault.sol         # Yield generation and management
│   ├── PriceConvertor.sol     # Price conversion utilities
│   └── interfaces/            # Contract interfaces
├── frontend/                  # React frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   └── App.tsx          # Main application component
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
├── test/
│   └── RandomnessGame.t.sol   # Test suite for RandomnessGame
├── script/                    # Deployment scripts
├── lib/                       # Dependencies
└── foundry.toml              # Foundry configuration
```

## Core Components

### RandomnessGame
- Implements Chainlink VRF for provably fair random number generation
- Uses VRFCoordinatorV2 for secure random number requests
- Includes owner-only access control

### TransactionVerifier
- Handles transaction verification logic
- Integrates with the verification system

### UserProfile
- Manages user profile data
- Handles user-related operations

### VendorRegistry
- Manages vendor registration
- Handles vendor-related operations

### YieldVault
- Manages yield generation
- Handles yield-related operations

## Prerequisites

- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- A wallet with testnet ETH (for testing on networks like Sepolia)
- Chainlink VRF subscription

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd mobile-verifier-dapp
```

2. Install smart contract dependencies:
```bash
forge install
```

3. Install frontend dependencies:
```bash
cd frontend
yarn install # or npm install
```

## Configuration

1. Create a `.env` file in the root directory:
```env
PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC_URL=your_sepolia_rpc_url_here
```

2. Create a `.env` file in the frontend directory:
```env
VITE_RPC_URL=your_sepolia_rpc_url_here
VITE_CONTRACT_ADDRESS=your_deployed_contract_address
VITE_CHAIN_ID=11155111 # Sepolia
```

3. Configure Chainlink VRF in `src/RandomnessGame.sol`:
```solidity
constructor(
    address vrfCoordinator,
    bytes32 keyHash,
    uint64 subscriptionId
)
```

## Development

### Smart Contract Development

#### Building
```bash
forge build
```

#### Testing
```bash
forge test
```

For verbose output:
```bash
forge test -vv
```

#### Deployment

1. Deploy to Sepolia testnet:
```bash
forge script script/Deploy.s.sol:DeployScript --rpc-url $SEPOLIA_RPC_URL --broadcast --verify
```

2. Post-deployment setup:
   - Fund your Chainlink VRF subscription
   - Add your contract as a consumer in the Chainlink VRF subscription

### Frontend Development

1. Start the development server:
```bash
cd frontend
yarn dev # or npm run dev
```

2. Build for production:
```bash
yarn build # or npm run build
```

3. Preview production build:
```bash
yarn preview # or npm run preview
```

## Frontend Features

- Wallet connection using Web3Modal
- Transaction verification interface
- User profile management
- Vendor registration and management
- Yield vault monitoring
- Random number generation interface

## Smart Contract Usage

### RandomnessGame
```solidity
// Request random number
function requestRandomWords() external onlyOwner

// Get the latest random number
function s_randomWord() public view returns (uint256)
```

### TransactionVerifier
```solidity
// Verify a transaction
function verifyTransaction() external
```

### UserProfile
```solidity
// Update user profile
function updateProfile() external
```

### VendorRegistry
```solidity
// Register a vendor
function registerVendor() external
```

### YieldVault
```solidity
// Manage yield
function manageYield() external
```

## Security Features

- Chainlink VRF for provably fair random number generation
- Owner-only access control for critical functions
- Secure transaction verification system
- Protected user and vendor management
- Frontend security best practices
- Environment variable protection

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- ETH Belgrade Hackathon organizers
- Chainlink VRF documentation
- Foundry/Forge documentation
- React and Vite documentation
