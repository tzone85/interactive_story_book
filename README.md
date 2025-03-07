# Interactive Reading Adventure PWA

A Progressive Web Application designed to encourage reading through interactive storytelling. Readers can make choices that affect how their stories progress, creating a personalized and engaging reading experience. Each story features multiple branching paths and meaningful endings based on reader choices.

## Features

- Progressive Web App (PWA) support for offline reading
- Rich interactive storytelling with deep branching narratives
- Age-appropriate content for different reader groups:
  - Young Adult (15-18): Complex sci-fi and ethical dilemmas
  - Teen (12-15): Mystery and technology themes
  - Pre-teen (9-12): Adventure and nature exploration
  - Children (6-9): Friendship and social learning
- Reader profiles with personalized story recommendations
- Beautiful, responsive UI with Tailwind CSS
- Comprehensive test coverage with Vitest and Playwright

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:5173 in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run unit tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint

## Testing

### Unit Tests
```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage
```

### E2E Tests
```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run E2E tests
npm run test:e2e
```

## Project Structure

- `/src`
  - `/components` - React components
    - `ReaderSelection.tsx` - Reader profile selection
    - `StoryLibrary.tsx` - Age-appropriate story listing
    - `StoryReader.tsx` - Interactive story viewer
  - `/data` - Static data and story content
    - `readers.ts` - Reader profiles
    - `stories.ts` - Interactive stories
  - `/store` - State management using Zustand
  - `/types` - TypeScript type definitions
  - `/test` - Unit tests
- `/e2e` - End-to-end tests using Playwright

## Features in Detail

### Reader Profiles
- Four predefined readers with different age groups
- Age-appropriate story recommendations
- Progress tracking

### Interactive Stories
- Rich branching narratives with multiple story paths
- Four complete stories with unique themes:
  - The Quantum Decision: A sci-fi thriller about parallel universes and ethical choices
  - Digital Detective: A cyber mystery involving AI and school technology
  - The Secret Garden Club: An adventure with rare and magical plants
  - The Friendly Dragon's Dilemma: A heartwarming tale about friendship and acceptance
- Each story features:
  - Multiple decision points
  - 8+ unique endings based on choices
  - Age-appropriate themes and complexity
  - Engaging visuals with high-quality images
  - Progress tracking and choice history

### PWA Features
- Offline support
- Installable on devices
- Fast loading and smooth transitions

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand (State Management)
- Vitest (Unit Testing)
- Playwright (E2E Testing)
- PWA Support

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure tests pass
4. Submit a pull request

## License

MIT