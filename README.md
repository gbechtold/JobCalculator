# Job Calculator 🎯

A smart calculator for determining the reach of job advertisements in the hotel industry. This tool helps recruiters and HR professionals optimize their job posting strategy by calculating potential candidate reach based on various factors.

## Features ✨

- Regional reach calculation for all of Austria
- Hotel category segmentation
- Demographic targeting
- Power-up system for extended reach
- Campaign factor analysis
- Real-time calculations
- Dark mode support
- Responsive design

## Tech Stack 🛠

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- shadcn/ui Components
- Radix UI Primitives

## Getting Started 🚀

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://your-repository-url/job-calculator.git
cd job-calculator
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure 📁

```
src/
├── app/                    # Next.js App Router
├── components/             # Shared components
│   ├── ui/                # UI components
│   └── ClientWrapper.tsx  # Client-side wrapper
├── features/              # Feature modules
│   └── calculator/        # Calculator feature
│       ├── constants/     # Feature constants
│       ├── model/        # Business logic
│       ├── types/        # Type definitions
│       └── ui/           # Feature UI components
├── lib/                   # Shared utilities
│   ├── constants.ts      # Global constants
│   ├── types.ts          # Global types
│   └── utils.ts          # Utility functions
└── store/                # Global state management
```

## Available Scripts 📝

```bash
# Development
npm run dev          # Start development server

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode

# Code Quality
npm run lint         # Run linting
npm run format       # Format code

# Production
npm run build        # Build for production
npm run start        # Start production server
```

## Calculation Features 🧮

The calculator takes into account various factors:

- Geographic reach by region
- Hotel segment specifics
- Age group targeting
- Demographic factors
- Distance calculations
- Power-up bonuses
- Marketing reach
- Campaign duration
- Motivation factors
- Incentives
- Potential barriers
- Solution approaches

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details
