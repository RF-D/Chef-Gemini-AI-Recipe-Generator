# Chef Gemini AI Coding Guidelines

## Build Commands
- `npm install` - Install dependencies
- `npm start` or `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Code Style Guidelines

### Component Structure
- Use functional components with React Hooks
- Keep components focused on a single responsibility
- Use JSX fragments (`<>...</>`) for component root when multiple elements exist

### Imports & Exports
- Use named imports/exports for multiple items, default for primary component
- Group imports by: React, third-party libraries, local components, styles

### Naming Conventions
- Components: PascalCase (e.g., `ClaudeRecipe.jsx`)
- Variables/functions: camelCase (e.g., `getRecipeFromChefClaude`)
- Files: Component files match component name

### Error Handling
- Use try/catch blocks for async operations
- Log errors with appropriate context (see ai.js for example)

### State Management
- Use React useState/useEffect hooks for local state
- Follow React's immutability patterns for state updates

### Security
- Never commit API keys or tokens to repository
- Use environment variables for sensitive information

### Commit messages
- Never use commited with claude...