# DeGen: Bridging Mobile Banking & DeFi

## Overview

Mobile money and Web3 banking are widely used, but many users fall victim to scams (false transaction notifications, account draining, stolen account information). This becomes problematic as users can't easily distinguish fake transactions from real ones, making it difficult to protect themselves. At the same time, jumping into Web3 is complex, fragmented, and intimidating for the average user. There's no smooth path from mobile banking to DeFi yield.

*YOUTUBE*
```
https://youtu.be/sEaAbslh69U
```

Mobile money and Web3 banking are widely used, but many users fall victim to scams (false transaction notifications, account draining, stolen account information). This becomes problematic as users can't easily distinguish fake transactions from real ones, making it difficult to protect themselves. At the same time, jumping into Web3 is complex, fragmented, and intimidating for the average user. There’s no smooth path from mobile banking to DeFi yield.

**DeGen** is a platform that bridges traditional mobile banking with decentralized finance (DeFi). It uses real-time transaction analysis, fraud detection, and Web3 integrations to help users understand, protect, and grow their money.

## Table of Contents
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [User Journey](#user-journey)
- [Project Components](#project-components)
- [Sponsor Technology Integration](#sponsor-technology-integration)
- [Deployment Information](#deployment-information)
- [Future Roadmap](#future-roadmap)
- [Development & Contribution](#development--contribution)
- [Contact & Support](#contact--support)

## Key Features

### Mobile Money to Web3 Bridge
Users can convert their mobile banking or mobile money assets directly within the platform through our integration with **Bybit**, allowing them to seamlessly purchase **USDT** without leaving the app.

### Secure Transaction Verification
- **Real-time verification** of mobile money transactions
- **QR code scanning** for merchant and agent validation
- **iExec confidential computing** for private data protection

### DeFi Integrations
Once they've acquired USDT, users can:

- **Cross-Chain Finance**: Participate in cross-chain lending and token swaps, accessing liquidity and earning yield across multiple blockchains
- **Conditional Voting**: Join Conditional Voting, where users vote on shared investment strategies and earn more yield (or take collective risk) depending on success
- **GameFi**: Play in a fully on-chain Blackjack game, competing head-to-head with other users using USDT, with the winner taking the full pot

### Community Features
- Conditional voting communities
- Gaming communities
- AI-powered announcements and insights for voters
- Private groups for specialized activities (staking, voting, gaming)

## Technology Stack

### Frontend
- **Next.js** - React framework
- **TypeScript** - Type-safe JavaScript
- **Shadcn UI** - Modern UI components
- **TailwindCSS** - Utility-first CSS
- **XMTP** - Secure messaging protocol

### Smart Contracts
- **Solidity** - Smart contract language
- **Foundry** - Development framework for testing and deployment
- **Chainlink** - Oracles and automation
- **OpenZeppelin** - Contract security libraries

### Blockchain Networks
- **Base** - Primary deployment network
- **Cross-chain functionality** via CCIP (Chainlink Cross-Chain Interoperability Protocol)

## Architecture

DeGen consists of two main components:

1. **Frontend Application**: Next.js-based web interface for user interactions
2. **Mobile Verifier DApp**: Solidity smart contracts handling blockchain interactions

The architecture is designed to be:
- **Modular**: Components can be upgraded independently
- **Secure**: Utilizing confidential computing and secure verification
- **Scalable**: Supporting multiple chains and transaction types
- **User-friendly**: Simplifying complex Web3 interactions

## User Journey

1. **Connect**: Link mobile money accounts for transaction monitoring
2. **Verify**: Validate transactions, agents, and merchants for security
3. **Convert**: Exchange mobile money to USDT seamlessly
4. **Explore**: Discover DeFi opportunities, communities, and games
5. **Earn**: Generate yield through lending, voting, and gaming

## Project Components

### Frontend (/frontend)
The web interface users interact with, providing:
- Dashboard for transaction monitoring
- Verification tools for scanning and validating
- DeFi integrations for yield generation
- Community features for collaboration
- GameFi interface for on-chain gaming

### Mobile Verifier DApp (/mobile-verifier-dapp)
Smart contracts handling:
- Transaction verification logic
- Cross-chain operations
- Token management
- Game mechanics
- Community governance

## Sponsor Technology Integration

DeGen integrates several innovative technologies:

- **iExec Confidential Computing**: For secure, private transaction data processing
- **Chainlink CCIP**: Enabling cross-chain asset transfers and operations
- **Chainlink VRF & Automation**: Powering fair, verifiable random outcomes for games and automatic processing
- **XMTP Protocol**: Secure, decentralized messaging between users and communities

## Deployment Information

### Base Network Deployment

**Smart Contract Addresses**:
- Manager: `0x76fB7D48d3cC6D1715DB44f61C6F0D36344C77eb`
- Entry Point: `0x518382220a0C9e474242Ec261019658E907776aE`
- Token: `0x198117b62F4ffB67d44E54bC6d2FE67Be1c9305C`
- Game Contract: `0x0EFB3d7EA0A0930ced25535BeCA582DC564EE081`
- Rank NFT: `0x816aAC1Dd487C3f7345256C3d62cBF52840977e0`
- Farm: `0xB262a3435A3a4aa948721B7C3882728634672588`
- Swap Manager: `0xC414100f3C8BB7e50ED340D2AB947B7Ebd41C39e`

## Future Roadmap

### Q3 2025
- CCIP integration for cross-chain supply management
- Cross-chain swap functionality
- Enhanced agent verification system

### Q4 2025
- Chainlink VRF implementation for gaming fairness
- Chainlink Automation for recurring processes
- Expanded conditional voting features

### Q1 2026
- Mobile application release
- Additional game integrations
- Advanced yield strategies

## Development & Contribution

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/jossyboygenius/DeGen.git
cd DeGen

# Frontend setup
cd frontend
pnpm install
pnpm dev

# Smart contract development
cd ../mobile-verifier-dapp
forge install
forge test
```

### Deployment

```bash
# Deploy to Base network
cd mobile-verifier-dapp
forge script script/Deploy.s.sol:DeployToBase \
  --rpc-url $BASE_URL \
  --broadcast \
  --private-key $PRIVATE_KEY
```

## Contact & Support

- **Project Website**: [degenplatform.io](https://degenplatform.io)
- **Documentation**: [docs.degenplatform.io](https://docs.degenplatform.io)
- **Support**: support@degenplatform.io
- **GitHub**: [github.com/DeGen](https://github.com/DeGen)

## Overview

Mobile money and Web3 banking are widely used, but many users fall victim to scams (false transaction notifications, account draining, stolen account information). This becomes problematic as users can't easily distinguish fake transactions from real ones, making it difficult to protect themselves. At the same time, jumping into Web3 is complex, fragmented, and intimidating for the average user. There's no smooth path from mobile banking to DeFi yield.

*YOUTUBE*
```
https://youtu.be/sEaAbslh69U
```

Mobile money and Web3 banking are widely used, but many users fall victim to scams (false transaction notifications, account draining, stolen account information). This becomes problematic as users can't easily distinguish fake transactions from real ones, making it difficult to protect themselves. At the same time, jumping into Web3 is complex, fragmented, and intimidating for the average user. There’s no smooth path from mobile banking to DeFi yield.

**DeGen** is a platform that bridges traditional mobile banking with decentralized finance (DeFi). It uses real-time transaction analysis, fraud detection, and Web3 integrations to help users understand, protect, and grow their money.

## Table of Contents
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [User Journey](#user-journey)
- [Project Components](#project-components)
- [Sponsor Technology Integration](#sponsor-technology-integration)
- [Deployment Information](#deployment-information)
- [Future Roadmap](#future-roadmap)
- [Development & Contribution](#development--contribution)
- [Contact & Support](#contact--support)

## Key Features

### Mobile Money to Web3 Bridge
Users can convert their mobile banking or mobile money assets directly within the platform through our integration with **Bybit**, allowing them to seamlessly purchase **USDT** without leaving the app.

### Secure Transaction Verification
- **Real-time verification** of mobile money transactions
- **QR code scanning** for merchant and agent validation
- **iExec confidential computing** for private data protection

### DeFi Integrations
Once they've acquired USDT, users can:

- **Cross-Chain Finance**: Participate in cross-chain lending and token swaps, accessing liquidity and earning yield across multiple blockchains
- **Conditional Voting**: Join Conditional Voting, where users vote on shared investment strategies and earn more yield (or take collective risk) depending on success
- **GameFi**: Play in a fully on-chain Blackjack game, competing head-to-head with other users using USDT, with the winner taking the full pot

### Community Features
- Conditional voting communities
- Gaming communities
- AI-powered announcements and insights for voters
- Private groups for specialized activities (staking, voting, gaming)

## Technology Stack

### Frontend
- **Next.js** - React framework
- **TypeScript** - Type-safe JavaScript
- **Shadcn UI** - Modern UI components
- **TailwindCSS** - Utility-first CSS
- **XMTP** - Secure messaging protocol

### Smart Contracts
- **Solidity** - Smart contract language
- **Foundry** - Development framework for testing and deployment
- **Chainlink** - Oracles and automation
- **OpenZeppelin** - Contract security libraries

### Blockchain Networks
- **Base** - Primary deployment network
- **Cross-chain functionality** via CCIP (Chainlink Cross-Chain Interoperability Protocol)

## Architecture

DeGen consists of two main components:

1. **Frontend Application**: Next.js-based web interface for user interactions
2. **Mobile Verifier DApp**: Solidity smart contracts handling blockchain interactions

The architecture is designed to be:
- **Modular**: Components can be upgraded independently
- **Secure**: Utilizing confidential computing and secure verification
- **Scalable**: Supporting multiple chains and transaction types
- **User-friendly**: Simplifying complex Web3 interactions

## User Journey

1. **Connect**: Link mobile money accounts for transaction monitoring
2. **Verify**: Validate transactions, agents, and merchants for security
3. **Convert**: Exchange mobile money to USDT seamlessly
4. **Explore**: Discover DeFi opportunities, communities, and games
5. **Earn**: Generate yield through lending, voting, and gaming

## Project Components

### Frontend (/frontend)
The web interface users interact with, providing:
- Dashboard for transaction monitoring
- Verification tools for scanning and validating
- DeFi integrations for yield generation
- Community features for collaboration
- GameFi interface for on-chain gaming

### Mobile Verifier DApp (/mobile-verifier-dapp)
Smart contracts handling:
- Transaction verification logic
- Cross-chain operations
- Token management
- Game mechanics
- Community governance

## Sponsor Technology Integration

DeGen integrates several innovative technologies:

- **iExec Confidential Computing**: For secure, private transaction data processing
- **Chainlink CCIP**: Enabling cross-chain asset transfers and operations
- **Chainlink VRF & Automation**: Powering fair, verifiable random outcomes for games and automatic processing
- **XMTP Protocol**: Secure, decentralized messaging between users and communities

## Deployment Information

### Base Network Deployment

**Smart Contract Addresses**:
- Manager: `0x76fB7D48d3cC6D1715DB44f61C6F0D36344C77eb`
- Entry Point: `0x518382220a0C9e474242Ec261019658E907776aE`
- Token: `0x198117b62F4ffB67d44E54bC6d2FE67Be1c9305C`
- Game Contract: `0x0EFB3d7EA0A0930ced25535BeCA582DC564EE081`
- Rank NFT: `0x816aAC1Dd487C3f7345256C3d62cBF52840977e0`
- Farm: `0xB262a3435A3a4aa948721B7C3882728634672588`
- Swap Manager: `0xC414100f3C8BB7e50ED340D2AB947B7Ebd41C39e`

## Future Roadmap

### Q3 2025
- CCIP integration for cross-chain supply management
- Cross-chain swap functionality
- Enhanced agent verification system

### Q4 2025
- Chainlink VRF implementation for gaming fairness
- Chainlink Automation for recurring processes
- Expanded conditional voting features

### Q1 2026
- Mobile application release
- Additional game integrations
- Advanced yield strategies

## Development & Contribution

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/jossyboygenius/DeGen.git
cd DeGen

# Frontend setup
cd frontend
pnpm install
pnpm dev

# Smart contract development
cd ../mobile-verifier-dapp
forge install
forge test
```

### Deployment

**DeGen** - Bridging the gap between traditional finance and Web3, safely and simply.

```bash
# Deploy to Base network
cd mobile-verifier-dapp
forge script script/Deploy.s.sol:DeployToBase \
  --rpc-url $BASE_URL \
  --broadcast \
  --private-key $PRIVATE_KEY
```

## Contact & Support

- **Project Website**: [degenplatform.io](https://degenplatform.io)
- **Documentation**: [docs.degenplatform.io](https://docs.degenplatform.io)
- **Support**: support@degenplatform.io
- **GitHub**: [github.com/DeGen](https://github.com/DeGen)

---

**DeGen** - Bridging the gap between traditional finance and Web3, safely and simply.

