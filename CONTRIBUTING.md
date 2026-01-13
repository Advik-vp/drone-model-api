# Contributing to Drone Model API

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful and constructive in all interactions.

## How to Contribute

### 1. Fork the Repository
```bash
# Click "Fork" button on GitHub
git clone https://github.com/yourusername/drone-model-api.git
cd drone-model-api
```

### 2. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

### 4. Test Your Changes
```bash
npm install
npm test
npm run lint
```

### 5. Commit with Clear Messages
```bash
git commit -m "feat: add new feature"
# or
git commit -m "fix: resolve issue"
git commit -m "docs: update documentation"
```

### 6. Push and Create a Pull Request
```bash
git push origin feature/your-feature-name
```

## Commit Message Format

Use semantic commit messages:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style (formatting)
- `refactor:` - Code refactoring
- `perf:` - Performance improvement
- `test:` - Test additions/updates
- `chore:` - Build, dependencies, etc.

Example: `feat: add drone filtering by category`

## Code Style

- Use ESLint configuration provided
- Follow Node.js best practices
- Use const/let, avoid var
- Use async/await instead of callbacks
- Add JSDoc comments for functions

## Testing

- Write unit tests for new features
- Ensure >80% code coverage
- Run tests before committing: `npm test`

## Documentation

- Update README.md for new features
- Add Swagger/OpenAPI comments
- Update CHANGELOG if significant
- Include code examples

## Pull Request Process

1. Update documentation
2. Add/update tests
3. Ensure lint passes: `npm run lint`
4. Ensure tests pass: `npm test`
5. Create descriptive PR title
6. Reference related issues
7. Wait for code review

## Reporting Issues

1. Check if issue already exists
2. Provide clear description
3. Include steps to reproduce
4. Share error messages/logs
5. Specify your environment

## Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# View API docs
open http://localhost:3000/api-docs
```

## Project Structure

```
src/
├── controllers/     # Business logic
├── models/         # Data models
├── routes/         # API endpoints
├── validators/     # Request validation
├── middleware/     # Middleware
└── config/         # Configuration

tests/              # Test files
examples/           # Usage examples
docs/               # Documentation
```

## Questions?

- Check existing documentation
- Review test files for examples
- Open a discussion issue
- Contact maintainers

Thank you for contributing! 🚀
