# Civo Design System

A recreation of the Civo product design system, extracted from the `civo-k8s-dashboard.fig` Figma file (22 pages, 1,184 frames). This system powers the Civo cloud console — a dashboard for Kubernetes clusters, compute instances, databases, object stores, volumes, VPCs, and related cloud-native infrastructure.

## About Civo

Civo is a developer-first cloud platform focused on **Kubernetes-native infrastructure**. The product identity centers on:

- Managed Kubernetes clusters (k3s-based, launched "in under 90 seconds")
- Compute instances, GPUs (NVIDIA), databases, object stores, volumes
- VPC, load balancers, firewalls, DNS, reserved IPs
- A GitOps catalog / Konstruct integration for installable apps
- Team & account management, billing, usage

The tone of voice in the Figma is practical and direct — copy like *"Launch a production-ready cluster in under 90 seconds. Simple pricing, no lock-in."* The brand pairs a deep **Metal** (dark slate) canvas with a vivid **electric green** accent (`#00FF6F`) — an unusual, confident, signature combination.

## Source

- **Figma:** `civo-k8s-dashboard.fig` (mounted virtual filesystem; see scope below)
- Primary pages referenced: `/Rebrand` (color tokens), `/Navigation` (shell), `/Dashboard` (empty state), `/Kubernetes`, `/Compute`, `/Sign-up-Log-in`, `/external-shared` (shared component library)
- Key frames: `1448:5352` (Color Section - Metal), `3923:67874` (Navigation), `1857:35811` (Left Nav Full), `2911:22429` (Primary Button)

Assume the reader may not have access to the Figma — everything they need is recreated here.

## Index

Root files:
- `README.md` — this file
- `colors_and_type.css` — CSS variables for tokens + semantic styles (`--fg-1`, `--h1`, etc.)
- `SKILL.md` — cross-compatible skill definition (portable to Claude Code)
- `assets/` — logos, icons, imagery
  - `assets/logo/` — Civo wordmark SVGs (white)
  - `assets/icons/` — product UI icons (copy from Figma, used in UI kit)
- `fonts/` — webfont assets (Inter, Hanken Grotesk)
- `preview/` — Design System tab cards (700×N each)
- `ui_kits/console/` — interactive Civo console recreation (Kubernetes screens, nav, buttons, forms)

## Content fundamentals

**Voice:** practical, efficient, developer-first. Copy is short, action-forward, and free of marketing fluff.

- **Casing:** Sentence case for headers, buttons, menu items. ("Launch a Kubernetes cluster", "Create cluster", "Read the docs") — not Title Case, not ALL CAPS. Section dividers in the left nav (e.g. `storage`, `vpc`, `access`) render lowercase as a typographic accent.
- **Pronouns:** Addresses the user as "you" ("Launch a production-ready cluster..."). Avoids "we" except in signed content.
- **Verbs:** Imperative, unhedged. "Launch", "Create", "Delete", "Recycle", "Read the docs".
- **Claims:** Specific numbers over adjectives. "under 90 seconds", "no lock-in", "transparent predictable pricing". The Figma frame labels include lines like *"Run powerful NVIDIA® GPUs, engineered for AI."* — proper-noun products get the trademark.
- **Emoji:** Not used. Not part of the brand.
- **Unicode as icon:** Not used. All glyphs are SVGs. A single `/` separator appears between breadcrumb segments (e.g. `eleanor.carroll@acme.com / Lon1`).
- **Error + empty states:** Short hero headline + one-line subtitle + primary + secondary button. Example: "Launch a Kubernetes cluster" / "Launch a production-ready cluster in under 90 seconds. Simple pricing, no lock-in." / [Read the docs] [Create cluster].
- **Sample data:** Realistic. `eleanor.carroll@acme.com`. Regions named by code (`Lon1`, `Nyc1`, `Fra1`).

## Visual foundations

**The system is dark-first.** Light mode variants exist for marketing surfaces, but the product console is near-black (Metal-1100 `#111518` canvas, Metal-900 `#192124` panels) with electric green primary and cool-grey text.

### Color
- **Metal** is the full neutral scale (50→1100). The darkest three steps (900/950/1100) form the product canvas. 500–700 are for borders/dividers. 200–400 are text on dark. 50–100 are text on darkest surfaces and light-mode surfaces.
- **Electric green** `#00FF6F` is the sole brand accent — primary buttons, selected states, focus, active indicators, logo "O".
- **Success green** `#22C55E` / `#16A34A` are a separate semantic green used for success toasts, status pills. (Electric green is reserved for interactive primary, not for generic success.)
- **Semantic:** Red `#DC2626` for destructive / error. Amber `#FEF9C2` (fill) for warning. Blue `#00BCFF` for informational. Violet `#A800B7` for avatar/account accents.
- **Backgrounds** are flat colors — no gradients as primary backgrounds. Black, Metal-1100, and Metal-900 do the heavy lifting. Full-bleed product illustrations (e.g. the Kubernetes cluster illustration in empty states) are monochrome on the dark canvas.
- **Imagery vibe:** cool, technical. No warm photography. No grain. Illustrations are line-art with minimal color — typically stroke-only in greens or Metal-400.

### Type
- **Inter** is the workhorse (8,300+ uses). Regular/Medium/SemiBold/Bold at 12/14/16/18/24 px dominate. Line-height is 100% for tight labels, ~1.4–1.5× for body/menus.
- **Hanken Grotesk** appears in top-nav labels ("Docs", "Account") and other product-chrome surfaces — it lends a slightly softer, geometric feel than Inter for chrome.
- **Roboto** is used in tags, region labels ("Lon1"), and the "Powered by Civo" footer — character-wide tracking (`letterSpacing: 0.25–0.4px`) differentiates it from Inter.
- **Reddit Mono** is the monospace for code/IDs/keys (used in snippets & values).
- **Satoshi** / **Geist** / **Newsreader** appear in the `/Rebrand` explorations (rebrand studies — not shipped system).
- **No decorative display faces.** No serifs in product UI.

### Spacing & radius
- 4px spacing grid. Common gaps: 4, 8, 10, 16, 24, 32, 40.
- **Radius-4** (`4px`) is the dominant product radius — buttons, inputs, tags, avatar chips. Sharp, technical.
- **Radius-8** for larger cards/panels.
- **Radius-12** for menu items in the left nav (softer, pill-like).
- **Radius-full** for avatar circles and status dots.

### Borders
- `1px solid #3B4954` (Metal-700) — the standard divider between panels, top-nav boundary, left-nav boundary, card edges.
- `1px solid #00FF6F` — the outline variant of the primary button (secondary action).
- Borders are always 1px — no thicker strokes in product UI.

### Shadows
- The console is mostly **flat** — elevation is carried by border + background shift rather than drop shadow.
- Modals and dropdowns use a subtle shadow: `0 8px 24px rgba(0,0,0,0.35)` against the dark canvas.
- No inner shadows.

### Buttons
- **Primary:** `#00FF6F` fill, `#192124` (Metal-900) text, Inter Bold 14, radius-4, 40px tall.
- **Secondary:** transparent fill, `#00FF6F` border + text (dark mode) or Metal-700 border + text (light).
- **Tertiary/Link:** no background, colored text.
- **Danger:** red `#DC2626` / `#FB2C37` variants — same shape.
- Sizes: Small (32), Medium (40). No XL. Icons sit to the left inside 16px gap.

### Hover / press (inferred from state variants)
- Hover on menu items shifts background to Metal-800/700, text stays same color — no saturation shift.
- Selected left-nav items use `backgroundColor: #3B4954` (Metal-700) with `color: #FFFFFF`. Icon gains opacity.
- Active primary button (the Figma variants show this pattern across button families): shifts to a slightly darker green, no scale transform.
- No press-shrink transforms. No ripples.

### Transparency & blur
- Used sparingly. Dropdown overlays and toasts sit on solid Metal-900. No glassmorphism, no backdrop-filter.
- Selected menu items and hover chips get solid tinted fills, not translucent.

### Animation
- Minimal. The product is task-focused — panels appear, toasts fade in from the top-right.
- Easing: standard ease-in-out / ease-out. ~150–200ms for hover transitions. No bouncy spring animations. No morphing.

### Layout rules
- Left nav: fixed 256px wide.
- Top nav: fixed 70px tall.
- Content container: 24–80px horizontal padding, max content ~1024px.
- Cards inside the content area: `8px` radius, `1px solid #3B4954`, fill `#192124`.
- Avatar initials chip: 24px circle, magenta fill `#A800B7`, Inter Medium 9.4px text.

### Corner radii at a glance
- 4px — inputs, buttons, tags, small chips
- 8px — cards, major containers
- 12px — left-nav menu items
- full — avatars, status dots, the circular-initials chip

## Iconography
See the "ICONOGRAPHY" section below. Icons are 16×16 and 20×20 SVGs, single-stroke, color inheriting the current text color (typically Metal-400 for inactive, white for selected, electric-green for active/primary indicators).

## Font substitution
The Figma uses **Inter**, **Hanken Grotesk**, **Roboto**, **Reddit Mono**. All are Google Fonts and are loaded from the Google Fonts CDN in `colors_and_type.css`. No local font files were bundled — flagging this to the user: if you want offline fonts, download the `.woff2` files and drop them into `fonts/`.

## Iconography

Civo uses **line-style SVG icons** inline in the nav and buttons. Inspection of the Figma components shows they borrow from multiple public icon sets:

- `iconoir:folder` — Object Stores
- `material-symbols:key` — SSH keys
- `hugeicons:webhook` — Webhooks
- `carbon:inventory-management` — Account
- `oui:documentation` — Docs
- `circum:globe` — Region selector

These are drop-in SVGs (16×16 or 20×20) rendered with single-color strokes that inherit from the text color around them.

**For this design system**, we substitute with **[Lucide](https://lucide.dev)** (MIT, closest line-weight match, CDN-friendly) and flag the substitution. Selected matches:
- Object Stores → `lucide:folder`
- SSH keys → `lucide:key-round`
- Webhooks → `lucide:webhook`
- Account → `lucide:layers`
- Docs → `lucide:book-open`
- Region → `lucide:globe`
- Kubernetes → custom SVG from the Civo illustration set (copied from Figma)
- Home / Dashboard → `lucide:layout-dashboard`

Logo assets:
- `assets/logo/civo-logo-white.svg` — assembled Civo wordmark, white variant (the primary lockup)

Unicode glyphs are **not** used for icons anywhere in the product. Emoji are **not** used.
