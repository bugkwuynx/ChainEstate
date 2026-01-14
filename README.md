# ChainEstate Client

A modern React-based client application for ChainEstate, built with TypeScript, Vite, and Tailwind CSS.

## 🚀 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Folder Structure

```
ChainEstate_Client/
├── client/                          # Main application directory
│   ├── node_modules/               # Dependencies (git-ignored)
│   ├── public/                     # Static assets
│   │   └── vite.svg               # Vite logo
│   ├── src/                        # Source code
│   │   ├── assets/                # Images, fonts, and other static assets
│   │   ├── components/             # Reusable React components
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── lib/                   # Utility functions and helpers
│   │   │   └── utils.ts           # Utility functions
│   │   ├── pages/                 # Page components
│   │   ├── types/                 # TypeScript type definitions
│   │   ├── App.css                # Global app styles
│   │   ├── App.tsx                # Main app component with routing
│   │   ├── index.css              # Global styles and Tailwind imports
│   │   └── main.tsx               # Application entry point
│   ├── .env                       # Environment variables (git-ignored)
│   ├── .gitignore                 # Git ignore rules
│   ├── components.json             # Component configuration
│   ├── eslint.config.js           # ESLint configuration (legacy)
│   ├── eslint.config.ts           # ESLint configuration
│   ├── index.html                 # HTML template
│   ├── package.json               # Project dependencies and scripts
│   ├── package-lock.json          # Dependency lock file
│   ├── tsconfig.json              # TypeScript configuration
│   ├── tsconfig.app.json          # TypeScript app configuration
│   ├── tsconfig.node.json         # TypeScript node configuration
│   └── vite.config.ts             # Vite configuration
└── README.md                       # Project documentation
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `client` directory (if needed):
```bash
touch .env
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port specified by Vite).

### Build

Build the application for production:
```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview

Preview the production build locally:
```bash
npm run preview
```

### Linting

Run ESLint to check for code issues:
```bash
npm run lint
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Features

- ⚡ Fast development with Vite
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 🧩 Component-based architecture
- 🛣️ React Router for navigation
- 📦 Path aliases configured (`@` points to `src`)

## 📄 License

This project is private and proprietary.
