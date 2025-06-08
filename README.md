# Belgrade

Belgrade is a comprehensive cross-chain DeFi gaming platform with mobile verification capabilities. The platform seamlessly combines DeFi yield farming, blockchain gaming, and cross-chain functionality with a focus on security and enhanced user experience.

## About

Belgrade introduces a novel approach to DeFi and gaming by creating a seamless experience across multiple blockchains. It allows users to engage with DeFi protocols (primarily Aave), play blockchain-based games with provably fair outcomes, and verify transactions across chains. The project uses a sophisticated mobile verification system to enhance security and user experience.

## Problem Statement

Current DeFi and blockchain gaming platforms face several challenges:

1. **Limited Cross-Chain Functionality**: Most DeFi applications are restricted to a single blockchain, limiting liquidity and functionality.
2. **Poor User Experience**: Complex interfaces and technical knowledge requirements create significant barriers to entry.
3. **Security Concerns**: Centralized verification systems and lack of transparency in random outcomes create trust issues.
4. **Limited Gaming Integration**: Few platforms effectively combine DeFi yield opportunities with engaging gaming experiences.
5. **Mobile Access Limitations**: Most blockchain applications lack proper mobile support and verification capabilities.

## Solution

Belgrade addresses these challenges through:

1. **Cross-Chain Architecture**: Seamless interaction between multiple blockchains (Ethereum, Flare, Polkadot) using state connectors.
2. **DeFi Integration**: Direct integration with Aave for yield farming and liquidity provision.
3. **Provably Fair Gaming**: Implementation of Chainlink VRF for verifiable random outcomes in games.
4. **Mobile Verification**: A dedicated mobile verification system to enhance security and usability.
5. **NFT Rewards System**: Rank-based NFTs that track player achievements and provide additional benefits.

## Architecture

The Belgrade platform is structured into three main components:

### 1. Smart Contracts (mobile-verifier-dapp)

- **Core Contracts**:
  - Entry points, managers, and transaction handlers
  - Permission management system
  - Error handling libraries
- **DeFi Integration**:
  - Aave connectors and yield farming mechanisms
  - Token implementation with minting and burning capabilities
  - Swap functionality between supported assets
- **Gaming Contracts**:
  - Card games with Chainlink VRF integration
  - Provably fair random number generation
  - Timeout management using Chainlink Automation
- **NFT System**:
  - Rank-based NFTs for gaming achievements
  - Dynamic minting based on game performance
- **Cross-Chain Connectors**:
  - State connector implementations for Flare and Polkadot
  - Cross-chain transaction verification

### 2. Frontend Application

- **Framework**: Next.js 15.3.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: React Hooks
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Web3 Integration**: Ethers.js
- **Data Protection**: iExec DataProtector
- **Features**:
  - Modern, responsive UI with dark/light mode support
  - Web3 wallet integration
  - Transaction verification interface
  - User profile management
  - Vendor registration and management
  - Yield vault monitoring
  - Random number generation interface
  - Form validation and error handling
  - Toast notifications
  - Responsive navigation
  - Data visualization with Recharts

### 3. Mobile Verification System

- **Transaction Verification**:
  - Secure transaction verification logic
  - Real-time transaction status monitoring
- **User Profile Management**:
  - Comprehensive user profile data handling
  - Identity verification mechanisms
- **Vendor Registry**:
  - Merchant integration system
  - Vendor verification and reputation tracking
- **Randomness Generation**:
  - Secure random number generation using Chainlink VRF
  - VRF request management and verification

## Detailed Features

### DeFi Capabilities

- **Aave Integration**:
  - Deposit and withdraw from Aave markets
  - Real-time APY tracking and optimization
  - Automated yield strategies
- **Yield Farming**:
  - Earn yields on deposited assets
  - Auto-compounding features
  - Yield optimization algorithms
- **Token Management**:
  - Custom token implementation with minting and burning capabilities
  - Multi-token support and portfolio management
  - Token analytics and performance tracking
- **Swap Functionality**:
  - Token swapping between supported assets
  - Cross-chain swaps with minimal slippage
  - Price impact protection

### Gaming Platform

- **Blackjack Implementation**:
  - Fully functional blackjack game with provably fair outcomes
  - Advanced game logic with multiple betting options
  - Tournament mode with leaderboards
- **Chainlink VRF Integration**:
  - Verifiable random card draws
  - Transparent and tamper-proof randomness
  - On-chain verification of random outcomes
- **Timeout Management**:
  - Chainlink Automation for handling timed-out games
  - Automatic refunds for interrupted games
  - Fair play enforcement mechanisms
- **Betting System**:
  - Flexible betting with configurable limits
  - Multi-token betting options
  - Risk management features

### NFT and Rewards

- **Rank NFTs**
  - NFTs that represent player achievements and rankings
  - Tiered system with increasing benefits
  - Visual representations of gaming prowess
- **Dynamic Minting**:
  - NFT issuance based on game performance
  - Rarity determined by player skill and achievements
  - Limited edition tournament NFTs
- **Cross-Chain Recognition**:
  - NFT recognition across supported chains
  - Consistent benefits regardless of blockchain
  - Cross-chain transfer capabilities

### Security Features

- **Mobile Verification**:
  - Secure transaction verification through mobile application
  - Two-factor authentication for high-value transactions
  - Biometric security options
- **Permission System**:
  - Granular permission controls for different operations
  - Role-based access control
  - Time-locked permissions for sensitive operations
- **Error Handling**:
  - Comprehensive error libraries and handling mechanisms
  - Graceful failure modes
  - User-friendly error messages
- **Chainlink Integration**:
  - Secure external data and randomness
  - Decentralized oracle network
  - Tamper-proof execution

### Additional Frontend Features

- **Chainlink VRF Integration**:
  - Provably fair random number generation
  - VRF request management
  - Random number display and verification
  - Subscription management interface
  - Request history tracking

- **Transaction Management**:
  - Real-time transaction verification
  - Transaction history with filtering
  - Transaction status monitoring
  - Gas estimation and optimization
  - Transaction confirmation tracking

- **Yield Management**:
  - Yield vault monitoring
  - APY calculation and display
  - Deposit and withdrawal interface
  - Yield distribution tracking
  - Historical yield data visualization

- **Voting System**:
  - Proposal creation and management
  - Voting power calculation
  - Vote casting interface
  - Results visualization
  - Voting history tracking

- **Lite Mode**:
  - Optimized for low-end devices
  - Reduced data usage
  - Simplified UI components
  - Offline functionality
  - Performance optimization

## Technologies Used

### Blockchain Technologies

- **Ethereum**: Primary blockchain for smart contracts
- **Flare Network**: Cross-chain state connector integration
- **Polkadot**: Cross-chain functionality and interoperability
- **Arbitrum & Optimism**: Layer 2 scaling solutions (planned)

### DeFi Protocols

- **Aave V3**: Liquidity and yield farming capabilities
- **Uniswap**: Token swapping functionality

### Development Tools and Libraries

- **Foundry/Forge**: Smart contract development and testing
- **Next.js**: Frontend framework
- **Radix UI**: Component library for the frontend
- **Ethers.js**: Ethereum JavaScript API
- **Chainlink VRF & Automation**: Verifiable randomness and automation
- **OpenZeppelin**: Security-focused smart contract libraries
- **TypeScript**: Typed JavaScript for improved development
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: Form handling
- **Zod**: Schema validation
- **Recharts**: Data visualization
- **iExec DataProtector**: Data protection features

## Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- pnpm, Yarn or npm
- Foundry/Forge for smart contract development
- MetaMask or another Ethereum wallet
- Testnet ETH (for testing on Sepolia or other testnets)
- Chainlink VRF subscription (for randomness features)

### Smart Contracts Setup

1. Clone the repository:

```bash
git clone https://github.com/jossyboydgenius/Belgrade.git
cd Belgrade
```

2. Install dependencies:

```bash
cd mobile-verifier-dapp
forge install
```

3. Configure environment variables:

- Create a `.env.local` file in the root directory
- Add necessary environment variables:

```
PRIVATE_KEY=your_private_key
RPC_URL=your_rpc_url
CHAINLINK_VRF_COORDINATOR=coordinator_address
CHAINLINK_SUBSCRIPTION_ID=subscription_id
AAVE_LENDING_POOL=aave_pool_address
```

4. Compile smart contracts:

```bash
forge build
```

5. Run tests:

```bash
forge test
```

6. Deploy contracts:

```bash
forge script script/deployFlare.s.sol:DeployScript --rpc-url $RPC_URL --broadcast --verify
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
```

3. Configure environment:

- Create a `.env.local` file in the frontend directory
- Add necessary environment variables:

```
NEXT_PUBLIC_RPC_URL=your_rpc_url
NEXT_PUBLIC_CONTRACT_ADDRESS=deployed_contract_address
NEXT_PUBLIC_CHAIN_ID=chain_id
NEXT_PUBLIC_VRF_COORDINATOR=your_vrf_coordinator_address
NEXT_PUBLIC_VRF_SUBSCRIPTION_ID=your_subscription_id
NEXT_PUBLIC_IEXEC_APP_ADDRESS=your_iexec_app_address
```

4. Run development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

5. Build for production:

```bash
pnpm build
# or
npm run build
# or
yarn build
```

## Project Structure

```bash
Belgrade/
├── frontend/                 # Next.js frontend application
│   ├── app/                  # Next.js app directory
│   │   ├── dashboard/        # Dashboard pages
│   │   ├── game/             # Gaming pages
│   │   ├── lite/             # Lite mode pages
│   │   ├── messages/         # Messaging pages
│   │   ├── transactions/     # Transaction pages
│   │   ├── verify/           # Verification pages
│   │   ├── vote/             # Voting pages
│   │   └── yield/            # Yield pages
│   ├── components/           # React components
│   │   ├── game/             # Game-specific components
│   │   └── ui/               # Base UI components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   └── public/               # Static assets
├── mobile-verifier-dapp/     # Smart contracts
│   ├── src/                  # Contract source code
│   │   ├── Aave/             # Aave integration contracts
│   │   ├── Butter/           # Protocol-specific contracts
│   │   ├── Core/             # Core protocol contracts
│   │   ├── DataTypes/        # Data structures
│   │   ├── Games/            # Gaming contracts
│   │   ├── Interface/        # Contract interfaces
│   │   ├── Permision/        # Permission system
│   │   ├── swap/             # Token swap functionality
│   │   └── Token/            # Token implementations
│   ├── script/               # Deployment scripts
│   └── test/                 # Test suite
└── lib/                      # External libraries
    ├── chainlink-brownie-contracts/ # Chainlink contracts
    └── openzeppelin-contracts/      # OpenZeppelin contracts
```

## Usage Guide

### DeFi Features

1. **Deposit to Aave**:
   - Connect your wallet
   - Navigate to the "Yield" section
   - Select the asset and amount to deposit
   - Confirm the transaction
   - Receive equivalent tokens representing your deposit
   - Monitor your position in real-time

2. **Withdraw from Aave**:
   - Navigate to the "Yield" section
   - Select the amount to withdraw
   - Confirm the transaction
   - Receive your assets plus earned yield
   - View transaction history and yield performance

### Gaming Features

1. **Playing Blackjack**:
   - Navigate to the "Games" section
   - Select your bet amount and token
   - Start the game
   - Choose to "Hit" or "Stand" based on your cards
   - If you win, receive double your bet amount
   - Earn rank NFTs based on your performance
   - View game history and statistics

2. **NFT Rewards**:
   - View your earned NFTs in the "Profile" section
   - NFTs represent your gaming achievements
   - Higher ranks provide additional benefits in the ecosystem
   - Trade or display your NFTs
   - Unlock special features with premium NFTs

### Mobile Verification

1. **Transaction Verification**:
   - Download the mobile app
   - Connect to your account using secure QR code
   - Verify transactions through secure push notifications
   - Manage permissions for different operations
   - View transaction history and security logs

### Voting and Governance

1. **Participating in Governance**:
   - Navigate to the "Vote" section
   - View active proposals
   - Cast your vote based on your token holdings
   - Monitor proposal outcomes
   - Submit your own proposals (with sufficient tokens)

## Roadmap

- **Q3 2025**:
  - Launch on additional chains (Arbitrum, Optimism)
  - Implement cross-chain bridging with minimal fees
  - Expand DeFi integrations beyond Aave

- **Q4 2025**:
  - Implement additional games (Poker, Slots)
  - Launch tournament system with prize pools
  - Enhance mobile verification with biometric options

- **Q1 2026**:
  - Launch governance token and DAO
  - Implement community-driven development fund
  - Begin transition to fully decentralized governance

- **Q2 2026**:
  - Develop mobile-first experience with native apps
  - Implement advanced security features
  - Launch fiat on/off ramps for broader accessibility

- **Q3 2026**:
  - Integration with additional DeFi protocols
  - Launch advanced yield aggregation strategies
  - Implement institutional-grade security measures

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

Special thanks to the contributors, supporters, and the blockchain community for their valuable input and feedback during the development process.

## Mobile Verifier DApp

A decentralized application for mobile verification and transaction management, featuring Chainlink VRF integration for secure random number generation. This project is part of the ETH Belgrade Hackathon.

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

## Acknowledgments

- ETH Belgrade Hackathon organizers
- Chainlink VRF documentation
- Foundry/Forge documentation
- React and Vite documentation
