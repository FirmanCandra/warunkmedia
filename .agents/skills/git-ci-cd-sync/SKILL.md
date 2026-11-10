---
name: git-ci-cd-sync
description: >-
  Standard workflow for version control, automated commits, and CI/CD sync for Warunk Media.
  Use whenever code or documentation changes are made, requiring Git commits, push to remote,
  and verification of GitHub Actions CI/CD workflows on main or production branches.
---

# Git & CI/CD Sync Workflow

This skill outlines the standard operating procedure for updating the Warunk Media codebase on GitHub and ensuring CI/CD workflows execute successfully.

## 1. Branch Strategy

- **`main`**: Development branch. All active features, bug fixes, refactoring, and documentation updates are pushed here first.
- **`production`**: Production branch. Dedicated to stable, deployable releases meant for live hosting. Merges or pushes to `production` trigger production-readiness checks in GitHub Actions.

## 2. Commit & Push Procedure

Follow these steps for every modification:

### Step 1: Pre-commit Inspection
Before staging, inspect the status and diff:
```powershell
git status
git diff
```

### Step 2: Quality Check
Ensure no broken syntax, build errors, or unresolved conflicts:
- For frontend (React/Vite): check that lint or build succeeds without errors.
- For backend (Laravel): check syntax and tests.
- Ensure strict adherence to `design.md` and `antislop` guidelines (no placeholder text, accurate color tokens, mobile responsive layouts).

### Step 3: Stage and Commit with Conventional Commits
Use standard conventional commit prefixes:
- `feat:` for new features (e.g., `feat(tracking): implement public order timeline view`)
- `fix:` for bug fixes (e.g., `fix(auth): correct customer session expiration`)
- `style:` for UI styling adjustments conforming to `design.md`
- `refactor:` for code cleanups without behavior change
- `docs:` for documentation updates
- `chore:` for workflow/dependency changes

Example:
```powershell
git add <files>
git commit -m "feat(module): descriptive message"
```

### Step 4: Push to Remote
Push changes to the current working branch:
```powershell
git push origin <branch-name>
```

### Step 5: Production Deployment Sync
When code is ready for live hosting:
1. Ensure `main` is clean, tested, and up-to-date.
2. Checkout or merge `main` into `production`:
   ```powershell
   git checkout production
   git merge main --ff-only
   git push origin production
   git checkout main
   ```
3. GitHub Actions CI/CD workflow (`.github/workflows/ci-cd.yml`) will automatically trigger and validate the build.

## 3. CI/CD Monitoring
- Monitor workflow runs on GitHub Actions: `https://github.com/FirmanCandra/warunkmedia/actions`
- If any job fails (Frontend Lint/Build or Backend Tests), immediately investigate the failure logs, fix the issue locally, and push an update.

