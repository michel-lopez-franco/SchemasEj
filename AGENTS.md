# Repository Guidelines

## Project Structure & Module Organization
- src/: Production code grouped by domain (e.g., src/lexer/, src/parser/, src/cli/).
- grammars/: Grammar/spec files (e.g., ANTLR .g4) and schema examples.
- tests/: Automated tests mirroring src/ (e.g., tests/parser/).
- assets/: Sample inputs/fixtures used by tests and docs.
- scripts/: Helper scripts (dev, release, CI).
- docs/: Design notes and diagrams.

Keep modules small and cohesive. Mirror src/ structure in tests/ and prefix internal modules with an __init__.py when using Python packages.

## Build, Test, and Development Commands
- make setup: Install dependencies and pre-commit hooks.
- make build: Compile or generate artifacts (e.g., code from grammars/).
- make test: Run the full test suite with coverage.
- make run ARGS="...": Run the CLI locally with arguments.
- make lint: Static analysis and formatting checks.

If Makefile is absent, use language-native tools, e.g., python -m pytest, npm test, or cargo test. Add a Makefile mapping to these for consistency.

## Coding Style & Naming Conventions
- Indentation: 4 spaces (no tabs). Line length ≤ 100.
- Python: Black + isort; file names snake_case.py; Classes PascalCase; functions snake_case.
- JSON/YAML: 2-space indent; stable key order.
- Grammars (.g4): PascalCase.g4; one grammar per file in grammars/.
- Scripts/CLI: kebab-case for executable names.

Run make lint before committing. Prefer pure functions and small modules.

## Testing Guidelines
- Framework: pytest with pytest-cov; minimum coverage target: 80%.
- Naming: tests/ mirrors src/; files test_*.py; one behavior per test.
- Fast tests by default; mark slow/integration with @pytest.mark.slow.
- Run: make test or python -m pytest -q.

## Commit & Pull Request Guidelines
- Commits: Conventional Commits style, e.g., feat:, fix:, docs:, chore:, refactor:, test:.
- Messages: Imperative, concise, and scoped (feat(parser): handle ε-transitions).
- PRs: Clear description, linked issue, reproducible steps, and before/after notes. Include tests, update docs, and attach sample inputs in assets/ when relevant.

## Security & Configuration
- Never commit secrets; use .env and provide .env.example.
- Pin dependencies; update via make update or a scripts/update-deps.sh.
- Validate untrusted inputs in CLI paths and file readers.
