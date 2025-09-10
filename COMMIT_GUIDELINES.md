# 📝 Commit Guidelines - TerroirDirect

This document defines the commit message conventions for this project to maintain a clean and readable Git history.

## 1. Commit Message Format

Each commit message must follow the [Conventional Commits](https://conventionalcommits.org/) structure:

```txt
<type>(<scope>): <short description>

[optional body with detailed explanation]

[optional footer with refs/breaking changes]
```

### Example

```txt
feat(auth): add user authentication with Appwrite

- Implement login/logout functionality
- Add user context provider
- Integrate with Appwrite Account API

Refs: #42
```

## 2. Commit Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(ui): add dark mode toggle` |
| `fix` | Bug fix | `fix(auth): resolve login redirect loop` |
| `docs` | Documentation only | `docs(readme): update installation steps` |
| `style` | Code style/formatting | `style(components): format with Biome` |
| `refactor` | Code refactoring | `refactor(api): simplify user service` |
| `test` | Add/update tests | `test(auth): add login component tests` |
| `perf` | Performance improvement | `perf(ui): optimize component re-renders` |
| `build` | Build system changes | `build(vite): update to version 5.0` |
| `chore` | Maintenance tasks | `chore(deps): update dependencies` |
| `ci` | CI/CD changes | `ci(github): add automated testing` |

## 3. Writing Rules

✅ Use imperative present tense (e.g., "add", not "added" or "adds")  
✅ Keep subject line short (<72 chars)  
✅ Provide details in the body if needed (bullets encouraged)  
✅ Reference issues/tickets with `Refs: #id`  
✅ Stick to one language (English recommended) across the repo  

## 4. Best Practices

- **No noise**: avoid vague commits like "update", "fix bug", "misc"
- **Granularity**: one commit = one logical change
- **Self-check**: the agent should review the diff before writing the commit
- **Readable history**: commit messages should help future developers understand context

## 5. Good Commit Examples

### ✅ Good Examples

```txt
feat(auth): add Appwrite authentication integration
fix(ui): resolve dark mode toggle state persistence
refactor(api): simplify user context provider logic
docs(quickstart): update installation instructions
test(auth): add login component unit tests
chore(deps): update React to version 19
style(components): format code with Biome
```

### ❌ Bad Examples

```txt
update stuff
fixed bug
working on feature
changes
Update README.md
```

## 6. Breaking Changes

For breaking changes, add `!` after the type/scope and include `BREAKING CHANGE:` in the footer:

```txt
feat(api)!: change user authentication method

Replace JWT with Appwrite sessions for better security.

BREAKING CHANGE: All existing JWT tokens will be invalidated.
Users will need to re-authenticate.
```

## 7. Validation

This project uses:

- **Lefthook**: Pre-commit hooks for code quality
- **Commitlint**: Automatic validation of commit message format

Commits that don't follow these guidelines will be rejected.

## 6. Scopes

Scopes should represent the area of the codebase affected by the change:

### Frontend Scopes

| Scope | Description | Files/Directories |
|-------|-------------|------------------|
| `ui` | UI components | `src/components/` |
| `pages` | Page components | `src/pages/` |
| `layouts` | Layout components | `src/layouts/` |
| `auth` | Authentication | `src/lib/context/UserProvider.tsx` |
| `styles` | Styling and themes | `src/lib/context/ThemeProvider.tsx` |
| `routing` | React Router setup | `src/main.tsx`, routing logic |

### Backend/Integration Scopes

| Scope | Description | Files/Directories |
|-------|-------------|------------------|
| `api` | Appwrite integration | `src/lib/appwrite.ts` |
| `appwrite` | Appwrite configuration | `appwrite/` directory |

### Development Scopes

| Scope | Description | Files/Directories |
|-------|-------------|------------------|
| `config` | Configuration files | `vite.config.ts`, `.env*` |
| `docs` | Documentation | `*.md` files |
| `test` | Testing setup | `src/tests/` |
| `deps` | Dependencies | `package.json`, `package-lock.json` |
| `ci` | CI/CD and git hooks | `.github/`, `lefthook.yml` |

### 💡 Scope Guidelines

- Use the most specific scope possible
- If multiple scopes are affected, consider splitting into separate commits
- For global changes, you can omit the scope: `feat: add new feature`
