# Git & CI/CD Workflow Rules

1. Every task or unit of work completed must be committed to git and pushed to the remote repository.
2. Commit messages must follow Conventional Commits format (`feat`, `fix`, `docs`, `style`, `refactor`, `chore`).
3. Branching:
   - Work happens on `main`.
   - Production-ready releases are merged/pushed to `production`.
4. Ensure the GitHub Actions CI/CD pipeline passes after each push.

