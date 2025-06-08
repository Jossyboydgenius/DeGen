# Mobile Verifier Frontend

A modern, responsive frontend application for the Mobile Verifier DApp, built with Next.js, TypeScript, and Tailwind CSS. This frontend provides a user-friendly interface for interacting with the smart contracts and managing mobile verification processes.

## Tech Stack

- **Framework**: Next.js 15.3.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: React Hooks
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Web3 Integration**: Ethers.js
- **Data Protection**: iExec DataProtector
- **Random Number Generation**: Chainlink VRF
- **Data Visualization**: Recharts

## Features

### Core Features
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

### Chainlink VRF Integration
- Provably fair random number generation
- VRF request management
- Random number display and verification
- Subscription management interface
- Request history tracking

### Transaction Management
- Real-time transaction verification
- Transaction history with filtering
- Transaction status monitoring
- Gas estimation and optimization
- Transaction confirmation tracking

### Yield Management
- Yield vault monitoring
- APY calculation and display
- Deposit and withdrawal interface
- Yield distribution tracking
- Historical yield data visualization

### Voting System
- Proposal creation and management
- Voting power calculation
- Vote casting interface
- Results visualization
- Voting history tracking

### Lite Mode
- Optimized for low-end devices
- Reduced data usage
- Simplified UI components
- Offline functionality
- Performance optimization

### Balance Management
- Real-time balance tracking
- Multi-token support
- Transaction history
- Balance notifications
- Portfolio overview

## Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm
- MetaMask or other Web3 wallet
- Chainlink VRF subscription
- iExec DataProtector account

## Installation

1. Install dependencies:
```bash
pnpm install
# or
npm install
```

2. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_RPC_URL=your_rpc_url_here
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address_here
NEXT_PUBLIC_CHAIN_ID=11155111 # Sepolia
NEXT_PUBLIC_VRF_COORDINATOR=your_vrf_coordinator_address
NEXT_PUBLIC_VRF_SUBSCRIPTION_ID=your_subscription_id
NEXT_PUBLIC_IEXEC_APP_ADDRESS=your_iexec_app_address
```

## Development

1. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # Base UI components
│   │   ├── balance-card.tsx
│   │   ├── lite-mode.tsx
│   │   ├── message-list.tsx
│   │   ├── mobile-navigation.tsx
│   │   ├── transaction-list.tsx
│   │   ├── verify-section.tsx
│   │   ├── voting-card.tsx
│   │   └── yield-card.tsx
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utility functions and configurations
├── public/              # Static assets
├── components.json      # UI components configuration
└── package.json         # Project dependencies
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## UI Components

The project uses Radix UI components for a consistent and accessible user interface:

- Accordion
- Alert Dialog
- Avatar
- Checkbox
- Dialog
- Dropdown Menu
- Navigation Menu
- Popover
- Progress
- Radio Group
- Select
- Slider
- Switch
- Tabs
- Toast
- Toggle
- Tooltip

## Web3 Integration

The frontend integrates with Ethereum using ethers.js:

- Wallet connection
- Contract interaction
- Transaction handling
- Event listening
- Chainlink VRF integration
- iExec DataProtector integration

## Styling

The project uses Tailwind CSS for styling with:

- Custom color schemes
- Dark/light mode support
- Responsive design
- Animation utilities
- Custom components
- Mobile-first approach

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Best Practices

- Follow TypeScript best practices
- Use proper error handling
- Implement proper loading states
- Follow accessibility guidelines
- Write meaningful commit messages
- Keep components small and focused
- Use proper naming conventions
- Implement proper error boundaries
- Use proper state management
- Follow security best practices

## License

This project is licensed under the MIT License.

## Acknowledgments

- Next.js documentation
- Radix UI documentation
- Tailwind CSS documentation
- Ethers.js documentation
- Chainlink VRF documentation
- iExec DataProtector documentation 