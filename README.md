# Wayne Citadel

Wayne Citadel is a Next.js website for exploring software engineering, cloud
infrastructure, and cybersecurity through an evidence-first product narrative.
The site introduces Wayne Cloud Infrastructure (WCI), an early-stage,
read-only analysis concept for understanding the security impact of Terraform
and OpenTofu changes before they reach production.

The project combines editorial content, scroll-driven interaction, animated
visualizations, and a contact flow implemented with MongoDB-backed persistence.

## Problem

Infrastructure changes are often difficult to review because a plan diff shows
what was edited without making the security implications obvious. A small
network rule change can expose an administrative port, a policy update can
expand permissions, and a replacement or stateful-resource change can be hidden
inside a large plan.

Wayne Citadel presents a clearer way to investigate these changes. Wayne Cloud
Infrastructure is designed to connect infrastructure diffs with evidence,
explain the possible impact, distinguish evidence from assumptions, and keep
human review at the center of the decision.

## Status

This project is in early development. WCI is presented as an AWS-first,
read-only analysis direction; the website's roadmap and scope pages distinguish
current concepts from future product work.

## Features

- Dark, grayscale visual system with Inter, JetBrains Mono, and Playfair
  Display typography.
- Responsive App Router pages with shared header, footer, skip links, metadata,
  and reduced-motion support.
- Motion and scroll experiences built with Framer Motion and Lenis.
- WCI product story with infrastructure diagrams, evidence orbit visuals,
  security examples, and a scroll-based narrative.
- Analysis model explaining layers, claims, evidence, findings, and coverage.
- Roadmap content covering V1 direction, scope boundaries, known gaps, and
  success criteria.
- Contact form implementation with server-side validation, honeypot protection,
  request-size limits, IP-based rate limiting, and MongoDB persistence.
- Frontend preview mode that disables contact-message storage.
- Reusable UI primitives, CSS Modules, animated canvas/WebGL-style textures,
  and data-driven content modules.

## Tech stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- React 19
- TypeScript with strict checking
- Tailwind CSS 4 through `@tailwindcss/postcss`
- Framer Motion and Motion for animation
- Lenis for smooth scrolling
- Mongoose for MongoDB access
- Lucide React, `clsx`, and `tailwind-merge`

## Requirements

- Node.js compatible with the installed Next.js and React versions
- npm
- MongoDB for contact-message persistence
- A `MONGODB_URI` value for contact submissions and production builds

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Waynegridtech-co/website.git
cd website
npm install
```

Create a local environment file when you want to use the contact API:

```bash
# .env.local
MONGODB_URI=mongodb://127.0.0.1:27017/wci
```

For MongoDB Atlas, replace `MONGODB_URI` with the Atlas connection string.
Keep `.env.local` out of source control and never expose database credentials
to the client.

The production build also requires a `MONGODB_URI` value because the contact
API configuration is evaluated during build. It is safe to use a local-only
placeholder for a build that will not process contact submissions:

Add `MONGODB_URI` to `.env.local`, or provide the variable through the
deployment environment, before running `npm run build`.

## Development

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The contact API loads its database module only for real submissions. The rest
of the website can therefore be developed without configuring MongoDB, but a
valid `MONGODB_URI` is required for successful message storage.

## Production

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

The build uses the Webpack builder explicitly. The Next.js configuration also
sets the Turbopack root to the repository root for development.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Build and contact submissions | MongoDB connection string used by the server-side contact model and evaluated during build. |
| `FRONTEND_PREVIEW` | No | Set to `true` to return a preview-disabled response from `POST /api/contact`. |
| `NEXT_PUBLIC_FRONTEND_PREVIEW` | No | Set to `true` to let the client contact form show frontend preview behavior. |

`MONGODB_URI` is server-only. The two preview flags are intentionally separate:
the public flag controls client presentation, while `FRONTEND_PREVIEW` protects
the server endpoint.

## Pages and routes

| Route | File | Purpose |
| --- | --- | --- |
| `/` | `app/page.tsx` | Wayne Citadel home page and engineering positioning. |
| `/about` | `app/about/page.tsx` | Mission, principles, method, and current focus. |
| `/analysis` | `app/analysis/page.tsx` | Evidence-first analysis model, claims, layers, findings, and coverage. |
| `/contact` | `app/contact/page.tsx` | Contact experience and message form. |
| `/roadmap` | `app/roadmap/page.tsx` | Product direction, V1 scope, exclusions, gaps, and success criteria. |
| `/scope` | `app/scope/page.tsx` | Redirects to `/roadmap` for compatibility. |
| `/wci` | `app/wci/page.tsx` | Dedicated Wayne Cloud Infrastructure product story. |
| `POST /api/contact` | `app/api/contact/route.ts` | Validates and stores contact messages in MongoDB. |

Global page structure is defined in `app/layout.tsx`. It loads fonts and
metadata, applies the site-wide motion configuration, renders the shared
header and footer, provides a skip link, and mounts smooth scrolling and the
scroll-progress line.

## Component organization

### Layout

`components/layout/`

- `SiteHeader.tsx` — primary navigation, active-route state, mobile menu, and
  keyboard escape handling.
- `SiteFooter.tsx` — brand, navigation, project links, and footer wordmark.
- `AnnouncementBar.tsx` — announcement-bar component, currently not mounted in
  the root layout.
- `SmoothScroll.tsx` — Lenis smooth-scroll lifecycle.
- `ScrollProgressLine.tsx` — page scroll progress indicator.
- `navigation.module.css` — navigation-specific responsive styles.

### Home

`components/home/`

`HomePageContent` composes the home experience from `CinematicPortal`,
`DirectionSignal`, `FocusVisualization`, `HomeEnhancements`,
`PhilosophyExperience`, `StructuralBridge`, `ThresholdEcho`, and
`WCIChangeSequence`. The directory also contains home-specific CSS Modules and
the `useScrollScene` scroll interpolation helpers.

### About

`components/about/`

- `AboutHero` — opening positioning and product statement.
- `AboutMission` — mission content.
- `AboutPrinciples` — operating principles.
- `AboutMethod` — method and workflow steps.
- `AboutNow` — current state and focus.
- `AboutManifest` and `ManifestVisual` — animated manifesto content and visuals.

### Analysis

`components/analysis/`

- `AnalysisHero` — analysis page introduction.
- `LayersSection` — layered analysis model.
- `ClaimsSection` — claims and confidence framing.
- `FirstRuleSection` — detailed first-rule example with Terraform, evidence,
  and finding JSON views.
- `CoverageSection` — V1 checks, technology scope, exclusions, and known gaps.

### Contact

`components/contact/`

- `ContactSection` — contact page composition.
- `ContactForm` — client form, submission state, validation feedback, and
  preview-mode behavior.
- `ContactHeroTexture` — contact-page visual texture.
- `ContactToolsSection` — contact-related supporting content.

### Roadmap

`components/roadmap/`

- `RoadmapHero` — roadmap introduction.
- `DirectionSection` — current and future direction tabs.
- `SuccessSection` — success criteria.
- `StackPanels` — stacked roadmap panel layout.

### WCI product experience

`components/wci/`

- `PageExperience` — page-level motion context.
- `Navigation` — WCI-specific in-page navigation.
- `ScrollStory` — main scroll narrative.
- `InfrastructureDiagram` — infrastructure workflow visual.
- `EvidenceOrbit` — evidence-focused visualization.
- `SecurityPreview` — security finding preview.
- `Atmosphere.tsx` — `WireGlobe`, `TerrainWordmark`, and `RibbonGlow`
  atmosphere visuals.
- `Icons.tsx` — WCI arrows, marks, and glyphs.
- `wci.module.css` and `story.module.css` — WCI-specific styling.

### Shared UI

`components/ui/`

- `AppWindow` — application-window framing.
- `CellRow` — structured data row.
- `ClosingBlock` — reusable page closing call-to-action.
- `ContourCanvas` and `TextureCanvas` — procedural visual textures.
- `GlyphTiles` — visual tile groups.
- `ParticleShellStage` — particle-shell stage with a dynamic client import.
- `Pill` — compact status or category label.
- `Reveal` and `WindowReveal` — motion-aware reveal wrappers.
- `SectionHead` — consistent section heading structure.
- `Stage` — shared visual stage container.
- `TabsRow` — accessible tab-row behavior and panel ID helper.
- `folding-particle-shell.mjs` and its declaration file — particle-shell
  runtime and TypeScript declaration.

## Data and server modules

### Content data

- `lib/aboutData.ts` — About page copy and structured content.
- `lib/analysisData.ts` — analysis layers, claims, finding example, coverage,
  and page tiles.
- `lib/scopeData.ts` — roadmap scope, gaps, direction, and success data.
- `lib/utils.ts` — shared class-name utility.

### Contact persistence

- `lib/db.ts` — cached Mongoose connection for Next.js development and
  server-side requests.
- `lib/models/Contact.ts` — `contacts` collection schema, validation, indexes,
  and status workflow (`new`, `read`, `replied`).

`app/api/contact/route.ts` applies the request safeguards before writing:

1. Preview-mode blocking.
2. Five requests per IP per minute in the in-memory rate limiter.
3. Ten-kilobyte request-size limit.
4. JSON, honeypot, name, email, and message validation.
5. Mongoose-backed persistence.

The rate limiter is process-local and suitable for a single-instance or small
deployment. A shared store such as Redis is needed for consistent limits across
multiple server instances.

## Styling and configuration

- `app/globals.css` contains the global grayscale design tokens, typography
  variables, layout primitives, accessibility styles, and page-specific global
  styles.
- CSS Modules are used for focused page and component styling, including
  navigation, home, and WCI experiences.
- `postcss.config.mjs` enables Tailwind CSS 4 through the PostCSS plugin.
- `next.config.ts` configures the repository as the Turbopack root.
- `tsconfig.json` enables strict TypeScript, bundler module resolution, the
  `@/*` path alias, and incremental checking.

## Accessibility and motion

The site includes skip links, semantic navigation labels, `aria-current` route
state, keyboard escape handling for the mobile menu, and reduced-motion
configuration through Framer Motion. Global smooth scrolling is disabled when
the user prefers reduced motion.

When adding interactive components, preserve keyboard access, semantic labels,
focus behavior, and the existing reduced-motion conventions.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Create a production build with Webpack. |
| `npm run start` | Start the built production application. |

There are currently no dedicated lint or test scripts in `package.json`.

## Project structure

```text
app/                   App Router routes, metadata, global CSS, and API route
components/            Feature, layout, WCI, and shared UI components
lib/                   Content data, utilities, database connection, and models
public/                Static images and public assets
refs/                  Local visual reference assets
docs/                  Design, implementation, and review documentation
next.config.ts         Next.js configuration
postcss.config.mjs     Tailwind/PostCSS configuration
tsconfig.json          TypeScript configuration
package.json           Scripts and dependencies
```

## Contributing

Keep content data-driven where a page already uses a `lib/*Data.ts` module,
reuse existing UI primitives before adding new ones, and preserve the
grayscale visual system. Before opening a change:

1. Run `npm run build`.
2. Check the affected routes at mobile and desktop widths.
3. Test keyboard navigation and reduced-motion behavior for interactive work.
4. Confirm that server-only environment variables are not imported into client
   components.

## License

No license has been declared in this repository yet.
