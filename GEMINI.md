# Warunk Media - Project Rules & Guidelines

## 1. Design & Anti-Slop Discipline
- **Direction File**: Strictly follow [`design.md`](file:///c:/SMT%207/WarunkMedia/design.md) as the single source of truth for visual identity, typography (Plus Jakarta Sans for headings, Inter for body), spacing, and color tokens.
  - Primary Red: `#B91C1C` (Dark: `#991B1B`)
  - Ink: `#1F1F1F`
  - Success Green: `#2E9E44` (Badge: `#DDF3E1` / `#14532D`)
  - Warning Amber: `#F5B400` (Badge: `#FDF0C4` / `#5B4300`)
  - Canvas: `#F7F6F4`, Surface: `#FFFFFF`, Line: `#E5E2DD`
- **Anti-Slop Filter Active**: Do not invent generic AI marketing fluff, placeholder stats, fake speed metrics, or ungrounded claims. Every element must pass the purpose test.
- **Copywriting**: Natural, clear Indonesian language suitable for a real garment/printing business (konveksi) based in Semarang.
- **Mobile First**: Minimum touch target 44x44px, full responsive layout with mobile bottom navigation bar and desktop header navigation matching the wireframe and reference layout.

## 2. Git & CI/CD Synchronization Rules
- **Automatic GitHub Sync**: Every completed feature, bug fix, or milestone must be staged, cleanly committed, and pushed to GitHub.
- **Branch Strategy**:
  - `main`: Active development branch for ongoing features, testing, and revisions.
  - `production`: Stable production branch reserved for live deployment and hosting.
- **Conventional Commits**: Every commit message must use standard prefixes:
  - `feat(...)`: New user-facing or backend features
  - `fix(...)`: Bug fixes
  - `style(...)`: CSS/UI adjustments matching design.md
  - `refactor(...)`: Code refactoring without behavior alteration
  - `docs(...)`: Documentation or PRD updates
  - `chore(...)`: Configuration, dependencies, and CI/CD workflow adjustments
- **CI/CD Pipeline**:
  - The repository utilizes GitHub Actions workflow at [`.github/workflows/ci-cd.yml`](file:///c:/SMT%207/WarunkMedia/.github/workflows/ci-cd.yml).
  - Every push to `main` and `production` triggers linting, build checks, and backend test validations.

## 3. PRD Scope Compliance
- Refer to [`PRD_Warunk_Media.md`](file:///c:/SMT%207/WarunkMedia/PRD_Warunk_Media.md) for all functional specifications.
- **Roles**: Public Visitor, Customer (Participant), and Owner/Admin.
- **Core Modules**: Order Tracking (via code), Customer Dashboard (Berandaku), Admin Order & Stage Manager with photo upload, Order Worksheet, and Invoice display/print.
- **Explicit Exclusions**: Online payment gateway is excluded in this phase.
