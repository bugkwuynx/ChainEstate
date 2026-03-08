# ChainEstate

A blockchain-based real estate platform that enables property tokenization as NFTs on the Ethereum network. Built with a modern React frontend, Express.js backend, and Solidity smart contracts.

## Tech Stack

### Client
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Ethers.js** - Ethereum wallet integration

### Server
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Ethers.js** - Blockchain interaction

### Smart Contract
- **Solidity** - Smart contract language
- **Hardhat** - Development environment
- **OpenZeppelin** - Secure contract libraries
- **Ethereum (Sepolia)** - Testnet deployment

## Project Structure

```
ChainEstate_Client/
├── client/                          # React frontend
│   ├── src/
│   │   ├── abi/                    # Contract ABIs
│   │   ├── components/             # Reusable components (NavBar, PropertyCard)
│   │   ├── context/                # React context (AuthContext)
│   │   ├── hooks/                  # Custom hooks (ProtectedRoute, ConnectWallet)
│   │   ├── lib/                    # Utility functions
│   │   ├── pages/                  # Page components
│   │   │   ├── LandingPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── PropertiesPage.tsx
│   │   │   └── AddPropertyPage.tsx
│   │   ├── services/               # API and contract services
│   │   └── types/                  # TypeScript definitions
│   ├── package.json
│   └── vite.config.ts
│
├── server/                          # Express.js backend
│   ├── controllers/                # Route controllers
│   │   ├── auth/
│   │   ├── properties/
│   │   ├── listings/
│   │   └── transactions/
│   ├── services/                   # Business logic
│   ├── routes/                     # API routes
│   ├── database/                   # Database configuration
│   ├── types/                      # TypeScript definitions
│   └── package.json
│
├── smartcontract/                   # Solidity smart contracts
│   ├── contracts/
│   │   └── PropertyNFT.sol         # ERC721 property token
│   ├── ignition/                   # Hardhat Ignition deployment
│   ├── test/                       # Contract tests
│   ├── hardhat.config.ts
│   └── package.json
│
└── README.md
```

## Features

- **Property Tokenization** - Mint real estate as ERC721 NFTs
- **Marketplace** - List, update, and cancel property listings
- **Secure Transactions** - Buy properties with ETH using reentrancy protection
- **Wallet Integration** - Connect with MetaMask or other Web3 wallets
- **User Authentication** - JWT-based auth system

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- MetaMask wallet (for blockchain interaction)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ChainEstate_Client
```

2. Install dependencies for each module:

```bash
# Client
cd client
npm install

# Server
cd ../server
npm install

# Smart Contract
cd ../smartcontract
npm install
```

3. Configure environment variables:

Create `.env` files in `client/` and `server/` directories with the required configuration.

### Development

**Client:**
```bash
cd client
npm run dev
```
The client will be available at `http://localhost:5173`

**Server:**
```bash
cd server
npm run dev
```

**Smart Contract:**
```bash
cd smartcontract
npx hardhat compile
npx hardhat test
```

### Build

**Client:**
```bash
cd client
npm run build
```

**Server:**
```bash
cd server
npm run build
```

### Deployment

**Smart Contract (Sepolia Testnet):**
```bash
cd smartcontract
npx hardhat ignition deploy ignition/modules/PropertyNFT.ts --network sepolia
```

## API Endpoints

| Route | Description |
|-------|-------------|
| `/auth` | Authentication (login, register) |
| `/properties` | Property CRUD operations |
| `/listings` | Marketplace listings |
| `/transactions` | Transaction history |

## Smart Contract

The `PropertyNFT` contract (deployed on Sepolia) provides:

- `mintProperty(address owner, string physicalAddress)` - Mint new property NFT
- `listProperty(uint256 tokenId, uint256 priceWei)` - List property for sale
- `cancelListing(uint256 tokenId)` - Cancel listing
- `updateListing(uint256 tokenId, uint256 newPrice)` - Update listing price
- `buyProperty(uint256 tokenId)` - Purchase listed property

## Available Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server
- `npm run dev` - Start development server with nodemon
- `npm run test` - Run tests with Jest
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues

### Smart Contract
- `npx hardhat compile` - Compile contracts
- `npx hardhat test` - Run tests
- `npx hardhat ignition deploy` - Deploy contracts

## License

This project is private and proprietary.
