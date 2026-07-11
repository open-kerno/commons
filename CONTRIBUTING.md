# Contributing

Thank you for your interest in contributing to `@open-kerno/commons`.

## Reporting Issues

- Search [existing issues](https://github.com/open-kerno/commons-ts/issues) before opening a new one.
- Include a clear title, a short description of the problem, and steps to reproduce it.
- If possible, add the expected vs. actual behavior.

## Suggesting Features

- Open an issue with the label `enhancement`.
- Describe the problem you want to solve and why it belongs in this library.

## Submitting a Pull Request

1. Fork the repository and create a branch from `main`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Make your changes.
4. Run the linter and tests before committing:
   ```bash
   npm run linter-fix
   npm run test
   ```
5. Open a pull request against `main` with a clear description of what you changed and why.

## Coding Standards

- Follow the existing code style — enforced by ESLint and Prettier.
- Add or update tests under `tests/` for any changed behavior.
- Keep changes focused. One pull request per feature or fix.
- Do not add new dependencies unless strictly necessary.

## Questions

For general questions, open a [GitHub Discussion](https://github.com/open-kerno/commons-ts/discussions) or an issue.
