# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Claude Code agent framework** for developing a Next.js landing page called "Claude Task Manager". The repository contains:
- Custom agents for specialized development tasks
- Reusable skills defining best practices
- Hook scripts for validation and safety
- A PRD defining the landing page requirements

## Tech Stack (Landing Page)

| Technology | Version | Notes |
|------------|---------|-------|
| Next.js | 16.1 | App Router, Turbopack |
| React | 19.2 | View Transitions, Activity API |
| Tailwind CSS | 4.1 | CSS-first config using `@theme` directive |
| Motion | 12.x | Import from `motion/react` (not framer-motion) |
| shadcn/ui | Latest | Tailwind v4 compatible |

**Browser Support:** Safari 16.4+, Chrome 111+, Firefox 128+

## Commands

```bash
npm run dev      # Development server with Turbopack
npm run build    # Production build
npm run lint     # ESLint
npm test         # Run tests
```

## Custom Agents

Seven specialized agents are available (invoke with `/agents` or directly):

| Agent | Purpose | Permission Mode |
|-------|---------|-----------------|
| `code-reviewer` | Code quality analysis, PR reviews | Read-only |
| `test-runner` | Test execution and failure analysis | acceptEdits |
| `security-auditor` | OWASP Top 10, dependency audits | Read-only |
| `documentation-writer` | API docs, README, JSDoc/TSDoc | acceptEdits |
| `db-reader` | Database queries (SELECT only) | dontAsk |
| `researcher` | Codebase investigation, web research | Read-only |
| `refactor-assistant` | Code restructuring, pattern improvement | acceptEdits |

Agents use skills from `.claude/skills/` and are validated by hooks in `.claude/scripts/`.

## Architecture

```
.claude/
├── agents/          # Agent definitions with hooks and skills
├── skills/          # Reusable skill definitions (code-review, testing, security, etc.)
├── scripts/         # Validation scripts for hooks
├── settings.json    # Global hooks and permissions
└── settings.local.json  # Local permission overrides
```

## Tailwind CSS v4 Specifics

- Define theme in CSS using `@theme` directive (not `tailwind.config.js`)
- No PostCSS config required
- Automatic content detection
- Uses native CSS features: cascade layers, `@property`, `color-mix()`

**Color Palette** (defined in `app/globals.css`):
- Background: `#0a0a0f` (dark)
- Primary accent: `#06b6d4` (cyan)
- Glow effects: `#22d3ee`

## Design Guidelines

- Dark mode aesthetic with glassmorphism cards
- 60fps animations using CSS transforms and opacity (GPU accelerated)
- Respect `prefers-reduced-motion` for accessibility
- Mobile-first responsive design

## Safety Constraints

The hook system enforces:
- Blocks destructive commands (`rm -rf /`, `sudo rm`, etc.)
- Prevents modification of credential files (`.env`, `.pem`, `.key`)
- DB reader blocks write operations (INSERT/UPDATE/DELETE/DROP)
- Dependency file changes require confirmation

## Key Files

- `PRD.md` - Complete product requirements with design specs and development phases
- `.claude/settings.json` - Global hooks and allowed permissions
- `.claude/agents/*.md` - Individual agent configurations
