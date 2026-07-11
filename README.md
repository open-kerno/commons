<h1 align="center">
  <code>@open-kerno/commons</code>
</h1>

<p align="center">
📦 Shared core utilities, base configurations, and essential building blocks for open-kerno projects.
</p>

---

## Overview

`@open-kerno/commons` is a TypeScript utility library that provides shared building blocks for backend Node.js services. It includes structured logging, HTTP error classes, HTTP status codes, math and distribution helpers, collection utilities, sorting, object utilities, and a PostgreSQL connection wrapper.

> **Full API documentation:** [open-kerno.github.io/commons-ts](https://open-kerno.github.io/commons-ts)

## Installation

```bash
npm install @open-kerno/commons
```

> Requires Node.js ≥ 18 and TypeScript ≥ 5.

## Modules

| Module | Description |
|---|---|
| `logger` | Structured logger (logfmt / JSON) with field masking, built on Winston |
| `http` | Complete `HttpStatusCode` enum (1xx–5xx) |
| `errors/http` | Typed HTTP error classes (`BadRequestError`, `InternalServerError`, …) |
| `errors/database` | Database-specific error classes (`DatabaseConnectionError`) |
| `math/rounding` | Precision-safe rounding |
| `math/distribution` | Weighted value distribution (`prorate`, `proratePennies`) |
| `collections` | Array-to-Map and Array-to-Set helpers |
| `sorting` | Multi-criteria, null-safe, locale-aware sorting |
| `object` | Safe JSON parsing with optional fallback |
| `infrastructure/database/postgres` | `pg` connection pool wrapper with session and transaction helpers |

## Development

```bash
# Install dependencies
npm install

# Build (outputs to ./lib)
npm run build

# Run tests with coverage
npm run test

# Lint
npm run linter

# Lint + auto-fix + Prettier
npm run linter-fix
```

Tests live under `tests/` and mirror the `src/` directory structure.

## Contributing

1. Fork the repository and create a feature branch.
2. Follow the existing code style — enforced by ESLint + Prettier. Run `npm run linter-fix` before committing.
3. Add or update tests under `tests/` for any changed behavior.
4. Open a pull request against `main`.

Bug reports and feature requests are tracked on [GitHub Issues](https://github.com/open-kerno/commons-ts/issues).

## License

[MIT](LICENSE) © Open Kerno
