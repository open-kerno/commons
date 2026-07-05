# Project Name: `@open-kerno/commons`

## Build and Development Commands
* Build project: `npm run build`
* Run development server: N/A — this is a shared library package, not a runnable app
* Run tests: `npm run test`
* Run single test: `npx jest tests/<path>/<file>.test.ts` (add `-t "<test name>"` to filter by test name)
* Lint/Format code: `npm run linter` (check) · `npm run linter-fix` (auto-fix + Prettier write)

## Code Style and Architecture Guidelines
* **Language/Framework:** TypeScript (Node.js library; compiled via `tsc`, target `es2025`, module `commonjs`; published to npm as `@open-kerno/commons`)
* **Naming Conventions:** `camelCase` for variables/functions (`createMapFromArray`, `roundWithPrecision`); `PascalCase` for classes/interfaces/types (`ServerError`, `PostgreSQL`, `Allocable`); `UPPER_SNAKE_CASE` for enum members (`HttpStatusCode.BAD_REQUEST`)
* **Error Handling:** Throw typed error classes extending `ServerError` (`src/errors/http`), each carrying an `HttpStatusCode` and optional typed `errors` payload (e.g., `BadRequestError`, `InternalServerError`, `DatabaseConnectionError`)
* **Architecture:** Modular utility library; each domain lives under `src/<domain>/index.ts` as a barrel export (`collections`, `errors/{database,http}`, `http`, `infrastructure/database/postgres`, `logger`, `math/{distribution,rounding}`, `object`); no DI container — plain factory functions (`logger()`, `wrapper()`) are used instead of classes for services
* **Strict Rules:** `strict: true` in `tsconfig.json`, but `strictNullChecks`/`noImplicitAny` are disabled; `@typescript-eslint/no-explicit-any` is off (`any` permitted) while `no-unused-vars` is an error; imports/exports must stay sorted (`simple-import-sort` ESLint rule); Prettier formatting is enforced via ESLint (`singleQuote`, `trailingComma: all`, `printWidth: 120`, 2-space indent, no tabs); tests mirror `src/` structure under `tests/`, matched by glob `**/tests/**/*.test.ts`
