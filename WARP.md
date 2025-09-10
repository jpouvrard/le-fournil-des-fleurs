# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

TerroirDirect is a React application built with Vite, TypeScript, and modern tooling. The project uses Appwrite for backend services, TailwindCSS for styling with shadcn/ui components, and follows a layout-based routing architecture with React Router.

## Development Commands

### Core Development

- `npm run dev` - Start development server (Vite) on <http://localhost:5173>
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run preview` - Preview production build locally

### Code Quality

- `npm run format` - Format code using Biome
- `npm run lint` - Lint and auto-fix code using Biome
- `npx tsc --noEmit` - Type-check without emitting files
- `npx biome check --write .` - Run all Biome checks (format + lint)

### Testing

- `npm test` or `npm run test` - Run tests with Vitest
- `npm run test:ui` - Run tests with Vitest UI interface
- `npx vitest run` - Run tests once without watch mode
- `npx vitest --ui` - Open Vitest UI for interactive testing

### Git Hooks & Validation

- `npx commitlint --edit` - Validate commit message format
- Pre-commit hooks automatically run Biome checks, TypeScript validation, and tests

## Architecture & Structure

### Application Structure

- **Entry Point**: `src/main.tsx` - Sets up React Router with nested route configuration
- **Root Component**: `src/App.tsx` - Provides global context providers (Theme, Toast, User)
- **Routing**: Layout-based routing with `MainLayout` for authenticated pages and `AuthLayout` for auth pages

### Key Directories

- `src/components/` - Reusable React components
- `src/components/ui/` - shadcn/ui component library (Button, Input, Label, etc.)
- `src/components/icons/` - Custom icon components
- `src/layouts/` - Layout components for different page types
- `src/lib/` - Utility functions and configurations
- `src/lib/context/` - React Context providers (User, Theme, Toast)
- `src/tests/` - Test files and setup

### Context Architecture

The app uses a nested context provider pattern in `App.tsx`:

1. **ThemeProvider** - Manages dark/light theme with localStorage persistence
2. **ToastContextProvider** - Handles toast notifications
3. **UserProvider** - Manages authentication state with Appwrite

### Backend Integration

- **Appwrite Self-Hosted**: Official installation via `appwrite/appwrite:1.7.4` Docker image
- **Appwrite Client**: Configured in `src/lib/appwrite.ts`
- **Authentication**: Email/password sessions via Appwrite Account API
- **API Endpoint**: `http://localhost/v1` (Traefik proxy on port 80)
- **Console Access**: `http://localhost` (Appwrite Console)
- **Environment**: Requires `VITE_APPWRITE_PROJECT_ID` and `VITE_APPWRITE_ENDPOINT`

## Configuration Details

### Biome Configuration

- **Formatter**: 4-space indentation, 120 character line width
- **Linter**: Recommended rules + experimental `useSortedClasses` for TailwindCSS class sorting
- **VCS Integration**: Git integration enabled with `main` as default branch

### TypeScript Configuration

- Path alias `@/` maps to `src/` directory
- Strict TypeScript configuration with separate app and node configs

### Vite Configuration

- **Build Tool**: Vite with React and TailwindCSS plugins
- **Development Server**: Optimized for local development (host: true, port: 5173)
- **Path Resolution**: `@/` alias configured for `src/` directory
- **Vitest Integration**: Uses `vitest/config` for proper TypeScript support with test configuration

### Testing Setup

- **Vitest** with jsdom environment for component testing
- **Testing Library**: React Testing Library with jest-dom matchers
- Setup file at `src/tests/setup.ts` configures test environment
- Configuration integrated in `vite.config.ts` using `vitest/config` for proper typing

### Shadcn/ui Integration

- **Style**: "new-york" variant
- **Theme**: CSS variables enabled with neutral base color
- **Icons**: Lucide React icon library
- **Aliases**: Configured for `@/components`, `@/lib`, `@/hooks`, etc.

## Navigation Pattern

The application uses React Router's front-end routing system. When implementing navigation:

- Use `<Link to="/path">` components for navigation instead of page reloads
- Route changes should be client-side only
- Authentication redirects use `window.location.replace()` for full page navigation

## Development Workflow

### Git Workflow

- Lefthook enforces pre-commit hooks for code quality
- Commit messages must follow conventional commit format
- All staged files are automatically formatted and linted before commit

### Environment Setup

#### Frontend Setup

1. Copy `.env.example` to `.env`
2. Run `npm install` to install dependencies
3. Use `npm run dev` to start development server

#### Appwrite Backend Setup

1. Install Appwrite using the official method:

   ```bash
   docker run -it --rm \
       --volume /var/run/docker.sock:/var/run/docker.sock \
       --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
       --entrypoint="install" \
       appwrite/appwrite:1.7.4
   ```

2. Follow the interactive setup (use default values for development)
3. Start Appwrite services: `cd appwrite && docker-compose up -d`
4. Access Appwrite Console at `http://localhost`
5. Create your project with ID: `project-id`

### Component Development

- Follow the existing pattern of functional components with TypeScript
- Use the established context hooks (`useUser()`, `useToasts()`) for global state
- Place reusable UI components in `src/components/ui/`
- Custom icons go in `src/components/icons/`

### Styling Guidelines

- TailwindCSS classes should be sorted (enforced by Biome)
- Use CSS variables defined by the theme system
- Follow the shadcn/ui design system patterns

## Development Architecture

### Current Setup

- **Frontend**: React + Vite development server (no Docker) - <http://localhost:5173>
- **Backend**: Appwrite self-hosted via official Docker installation - <http://localhost>
- **Database**: MariaDB (included in Appwrite stack)
- **Cache**: Redis (included in Appwrite stack)
- **Proxy**: Traefik (included in Appwrite stack)

### Appwrite Management

- **Start Appwrite**: `cd appwrite && docker-compose up -d`
- **Stop Appwrite**: `cd appwrite && docker-compose down`
- **View Logs**: `cd appwrite && docker-compose logs -f`
- **Console Access**: <http://localhost>
- **API Endpoint**: <http://localhost/v1>

### First-time Appwrite Project Setup

1. Access <http://localhost> after starting Appwrite
2. Create admin account in Appwrite Console
3. Create project with ID: `project-id`
4. Frontend will automatically connect to `http://localhost/v1`

### Production Deployment

- **Frontend**: Build with `npm run build` and deploy static files
- **Backend**: Deploy Appwrite using official installation on production server
- **Domain Setup**: Configure custom domain for Appwrite in production
- **SSL**: Enable HTTPS for production Appwrite installation

### Environment Variables for Production

```env
VITE_APPWRITE_ENDPOINT=https://your-domain.com/v1
VITE_APPWRITE_PROJECT_ID=project-id
```

## Development Best Practices

### Code Quality Workflow

1. **Before committing**: Run the quality checks

   ```bash
   npx tsc --noEmit    # TypeScript check
   npm run lint        # Biome linting
   npm run format      # Code formatting
   npx vitest run      # Run all tests
   ```

2. **Pre-commit hooks**: Lefthook automatically runs these checks on commit
3. **IDE Integration**: Configure your editor to use Biome for formatting and linting

### Common Issues & Solutions

#### TypeScript Errors in Vite Config

- **Issue**: `'test' does not exist in type 'UserConfigExport'`
- **Solution**: Import `defineConfig` from `vitest/config` instead of `vite`

#### Appwrite Connection Issues

- **Issue**: Frontend can't connect to Appwrite
- **Solutions**:
  - Verify Appwrite is running: `cd appwrite && docker-compose ps`
  - Check project ID matches in `.env` and Appwrite Console
  - Ensure endpoint is `http://localhost/v1` (not port 8080)

#### Development Server Issues

- **Issue**: Vite dev server not accessible
- **Solution**: Verify configuration uses `host: true` for local network access

### Testing Guidelines

- Write tests for components in `src/tests/components/`
- Use React Testing Library for component testing
- Test user interactions and accessibility
- Run tests in watch mode during development: `npm test`
