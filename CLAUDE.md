# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ravana-astrology** is a React + TypeScript + Vite application with the React Compiler enabled for automatic performance optimizations.

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production (runs TypeScript compiler then Vite build)
npm run build

# Lint all files
npm run lint

# Preview production build locally
npm run preview
```

## Architecture

### Tech Stack
- **React 19.2** with TypeScript
- **Vite 7.2** for build tooling and dev server
- **React Compiler** (babel-plugin-react-compiler) - automatically optimizes React components for performance
- **ESLint** with TypeScript, React Hooks, and React Refresh plugins

### Project Structure
- `src/main.tsx` - Application entry point with StrictMode enabled
- `src/App.tsx` - Root component
- `src/assets/` - Static assets (images, SVGs)
- `public/` - Public static files served directly
- TypeScript configuration split into `tsconfig.app.json` (app code) and `tsconfig.node.json` (build config)

### Key Configuration Notes

**Vite Configuration** (`vite.config.ts`):
- Uses `@vitejs/plugin-react` with Babel for Fast Refresh
- React Compiler plugin enabled via Babel - this impacts dev & build performance but provides automatic memoization and optimization

**TypeScript Configuration** (`tsconfig.app.json`):
- Strict mode enabled with additional linting flags (`noUnusedLocals`, `noUnusedParameters`)
- Module resolution set to "bundler" mode
- `erasableSyntaxOnly` enabled for React Compiler compatibility
- JSX transform set to `react-jsx` (modern JSX transform)

**ESLint Configuration** (`eslint.config.js`):
- Flat config format using `eslint/config`
- Recommended rules for JavaScript, TypeScript, React Hooks, and React Refresh
- Ignores `dist` directory

### React Compiler
The React Compiler is enabled and will automatically optimize React components by:
- Automatically memoizing components and values
- Reducing unnecessary re-renders
- Note: This adds overhead to build and dev server performance

For more information, see: https://react.dev/learn/react-compiler
