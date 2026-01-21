# Claude Task Manager - Landing Page PRD

## Project Overview

A modern, futuristic landing page for Claude Task Manager built with Next.js, Tailwind CSS, and shadcn/ui. The design features a dark mode aesthetic with cyan accent colors, smooth animations, and a tech-forward visual identity.

---

## Tech Stack

| Technology | Version | Notes |
|------------|---------|-------|
| **Next.js** | 16.1 | App Router, Turbopack, Cache Components |
| **React** | 19.2 | View Transitions, Activity API, useEffectEvent |
| **Tailwind CSS** | 4.1 | CSS-first config, @property support, color-mix() |
| **Motion** | 12.x | Formerly Framer Motion, rebranded package |
| **shadcn/ui** | Latest | Tailwind v4 compatible components |
| **Lucide React** | 0.562.x | Tree-shakable icon library |
| **TypeScript** | 5.x | Type safety throughout |

### Additional Utilities

- **class-variance-authority** `^0.7.1` - Component variants
- **clsx** `^2.1.1` - Conditional classNames
- **tailwind-merge** `^3.4.0` - Merge Tailwind classes (v4 compatible)

---

## Tailwind CSS v4 Notes

Tailwind CSS v4 introduces significant changes:

- **CSS-first configuration** - Define theme in CSS using `@theme` directive instead of `tailwind.config.js`
- **No PostCSS config required** - Use the Vite plugin or CLI directly
- **Automatic content detection** - No need to specify content paths
- **Native CSS features** - Uses cascade layers, `@property`, and `color-mix()`
- **Browser support** - Safari 16.4+, Chrome 111+, Firefox 128+

---

## Design System

### Color Palette

Define in `app/globals.css` using Tailwind v4 syntax:

```css
@theme {
  --color-background: #0a0a0f;
  --color-background-secondary: #12121a;
  --color-foreground: #e4e4e7;
  --color-muted: #71717a;
  --color-cyan-primary: #06b6d4;
  --color-cyan-glow: #22d3ee;
  --color-cyan-dark: #0891b2;
  --color-border: #27272a;
}
```

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-background` | `#0a0a0f` | Main background |
| `--color-background-secondary` | `#12121a` | Card backgrounds |
| `--color-foreground` | `#e4e4e7` | Primary text |
| `--color-muted` | `#71717a` | Secondary text |
| `--color-cyan-primary` | `#06b6d4` | Primary accent |
| `--color-cyan-glow` | `#22d3ee` | Glow effects |
| `--color-cyan-dark` | `#0891b2` | Hover states |
| `--color-border` | `#27272a` | Borders |

### Visual Effects

- Glassmorphism cards with backdrop blur
- Subtle grid/dot pattern backgrounds
- Animated gradient meshes
- Glow effects on interactive elements
- Particle effects (optional)
- Smooth scroll animations

---

## Phase 1: Project Setup

- [ ] Initialize Next.js 16 project with TypeScript
  ```bash
  npx create-next-app@latest claude-task-manager-lp --typescript --tailwind --eslint --app --turbopack
  ```
- [ ] Upgrade to Tailwind CSS v4 with Vite plugin
- [ ] Install and configure shadcn/ui (Tailwind v4 compatible)
- [ ] Install Motion (formerly Framer Motion)
  ```bash
  npm install motion
  ```
- [ ] Configure Geist font (Next.js built-in)
- [ ] Create base color scheme in CSS using `@theme`
- [ ] Set up project folder structure

---

## Phase 2: Core Components

### 2.1 Layout Components

- [ ] Create root layout with dark theme
- [ ] Build responsive navigation header
  - [ ] Logo with glow effect
  - [ ] Navigation links with hover animations
  - [ ] Mobile hamburger menu
  - [ ] CTA button (Get Started)
- [ ] Create footer component
  - [ ] Links sections
  - [ ] Social media icons
  - [ ] Copyright info

### 2.2 Reusable UI Components

- [ ] Animated button component (with glow/ripple effects)
- [ ] Glassmorphism card component
- [ ] Gradient text component
- [ ] Animated badge/tag component
- [ ] Section wrapper with scroll animations

---

## Phase 3: Landing Page Sections

### 3.1 Hero Section

- [ ] Large headline with gradient text animation
- [ ] Animated subheadline/description
- [ ] Primary and secondary CTA buttons
- [ ] Animated hero illustration/graphic
  - [ ] Option A: 3D mockup of the app
  - [ ] Option B: Abstract animated mesh/particles
  - [ ] Option C: Isometric illustration
- [ ] Floating elements animation
- [ ] Grid/pattern background with glow effects

### 3.2 Features Section

- [ ] Section heading with fade-in animation
- [ ] Feature cards grid (3-4 features)
  - [ ] Icon with glow effect
  - [ ] Feature title
  - [ ] Feature description
  - [ ] Hover lift animation
- [ ] Staggered reveal animation on scroll

**Suggested Features to Highlight:**
1. AI-Powered Task Management
2. Smart Priority Scheduling
3. Real-time Collaboration
4. Intelligent Insights & Analytics

### 3.3 How It Works Section

- [ ] Step-by-step process visualization
- [ ] Numbered steps with connecting lines/animations
- [ ] Icons or mini illustrations for each step
- [ ] Progressive reveal animation

**Steps:**
1. Create your workspace
2. Add and organize tasks
3. Let Claude optimize your workflow
4. Track progress and achieve goals

### 3.4 Product Showcase Section

- [ ] Large product screenshot/mockup
- [ ] Interactive hover effects
- [ ] Floating UI element annotations
- [ ] Parallax scroll effect
- [ ] Glow border animation

### 3.5 Testimonials Section (Optional)

- [ ] Testimonial cards carousel
- [ ] Avatar with glow ring
- [ ] Quote styling
- [ ] Company logos
- [ ] Auto-scroll animation

### 3.6 Pricing Section (Optional)

- [ ] Pricing cards (Free, Pro, Enterprise)
- [ ] Popular plan highlight with glow
- [ ] Feature comparison list
- [ ] Animated toggle (monthly/yearly)
- [ ] CTA buttons per plan

### 3.7 CTA Section

- [ ] Large call-to-action block
- [ ] Gradient background with animation
- [ ] Compelling headline
- [ ] Email input + submit button
- [ ] Or direct "Get Started" CTA

### 3.8 FAQ Section (Optional)

- [ ] Accordion-style questions
- [ ] Smooth expand/collapse animation
- [ ] Icon transitions

---

## Phase 4: Animations & Interactions

### 4.1 Scroll Animations

- [ ] Fade-in-up for sections using Motion's `whileInView`
- [ ] Staggered children animations with `staggerChildren`
- [ ] Parallax effects for backgrounds
- [ ] Progress indicator in navbar

### 4.2 Micro-interactions

- [ ] Button hover effects (glow, scale)
- [ ] Link underline animations
- [ ] Card hover lift effects
- [ ] Icon animations on hover
- [ ] Cursor glow effect (optional)

### 4.3 Background Effects

- [ ] Animated gradient mesh
- [ ] Subtle floating particles
- [ ] Grid pattern with glow points
- [ ] Noise texture overlay

### 4.4 Loading States

- [ ] Page loading animation
- [ ] Skeleton loaders for dynamic content
- [ ] Smooth transitions between states
- [ ] React 19.2 View Transitions (optional)

---

## Phase 5: Responsive Design

- [ ] Mobile-first approach
- [ ] Tablet breakpoint adjustments
- [ ] Desktop optimizations
- [ ] Large screen enhancements
- [ ] Touch-friendly interactions
- [ ] Mobile navigation menu

### Breakpoints (Tailwind v4 defaults)

| Breakpoint | Size |
|------------|------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

---

## Phase 6: Performance & SEO

- [ ] Image optimization (Next.js Image component)
- [ ] Font optimization (Geist font built-in)
- [ ] Lazy loading for below-fold content
- [ ] Reduce animation on `prefers-reduced-motion`
- [ ] Meta tags and Open Graph
- [ ] Structured data (JSON-LD)
- [ ] Sitemap generation
- [ ] Robots.txt configuration

---

## Phase 7: Final Polish

- [ ] Cross-browser testing (Safari 16.4+, Chrome 111+, Firefox 128+)
- [ ] Accessibility audit (WCAG 2.1)
- [ ] Performance audit (Lighthouse)
- [ ] Content review and copywriting polish
- [ ] Final animation timing adjustments
- [ ] Dark mode consistency check
- [ ] Mobile experience review

---

## Folder Structure

```
claude-task-manager-lp/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css          # Tailwind v4 @theme config
├── components/
│   ├── ui/                   # shadcn components
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Showcase.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Pricing.tsx
│   │   ├── CTA.tsx
│   │   └── FAQ.tsx
│   └── shared/
│       ├── AnimatedButton.tsx
│       ├── GlassCard.tsx
│       ├── GradientText.tsx
│       └── SectionWrapper.tsx
├── lib/
│   └── utils.ts
├── public/
│   ├── images/
│   └── icons/
└── config/
    └── site.ts
```

---

## Key Dependencies

```json
{
  "dependencies": {
    "next": "^16.1.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "tailwindcss": "^4.1.0",
    "motion": "^12.0.0",
    "lucide-react": "^0.562.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.4.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.0",
    "typescript": "^5.7.0",
    "@types/react": "^19.0.0",
    "@types/node": "^22.0.0"
  }
}
```

---

## Motion (Framer Motion) v12 Notes

The package has been renamed from `framer-motion` to `motion`:

```tsx
// Old import (deprecated)
import { motion } from "framer-motion";

// New import
import { motion } from "motion/react";
```

Key features in Motion 12:
- Multiple output value maps with `useTransform`
- Auto-scrolling for `Reorder.Item` components
- Improved GPU animation time sampling
- Better Radix Dialog + AnimatePresence support

---

## Success Metrics

- [ ] Lighthouse Performance Score > 90
- [ ] Lighthouse Accessibility Score > 95
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Mobile-friendly validation pass

---

## Timeline Overview

| Phase | Description |
|-------|-------------|
| Phase 1 | Project Setup |
| Phase 2 | Core Components |
| Phase 3 | Landing Page Sections |
| Phase 4 | Animations & Interactions |
| Phase 5 | Responsive Design |
| Phase 6 | Performance & SEO |
| Phase 7 | Final Polish |

---

## Notes

- Prioritize performance - animations should be smooth (60fps)
- Use CSS transforms and opacity for animations (GPU accelerated)
- Consider `prefers-reduced-motion` for accessibility
- Keep bundle size minimal - code split where possible
- Test on real devices, not just browser dev tools
- Tailwind v4 requires modern browsers (no IE11 support)

---

*Last Updated: January 2026*
