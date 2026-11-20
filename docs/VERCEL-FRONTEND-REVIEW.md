# Vercel frontend review deployment

19 November 2026. User authorized deploying the full project for frontend review, clarified that no database/backend setup is part of the assignment, and approved a 7-day shareable link scoped to the new deployment.

## Deployed version

Deployment: `dpl_7pVvazeDrC2c1eboJG1gaqE2M52g`.
Origin: https://website-bgce7iq7q-abhishekguptadhan26-5367.vercel.app .
Vercel project: `website` in the existing account. Environment: Preview; production alias was not promoted. The deployment contains the current uncommitted `feat/cinematic-homepage` source, including all existing routes and the complete enhanced homepage. No GitHub push or PR change was made.

The approved review link expires after seven days and grants access only to this deployment. Its access token is intentionally omitted from tracked documentation; use the full review link delivered in the chat. Project-wide Vercel Authentication remains enabled and was verified after sharing.

## Frontend-only mode

This deployment sets `NEXT_PUBLIC_FRONTEND_PREVIEW=true` and `FRONTEND_PREVIEW=true` at build/runtime. The Contact page retains its fields, interactions and styling; its send button is disabled with the visible notice: “Frontend preview. Message sending is disabled for this review.” Programmatic form submission performs no network send. The API explicitly returns HTTP 503 with a preview explanation, before any database work.

Database modules are loaded only when a real submission needs them. This removes the unrelated database-credential dependency from frontend builds. Normal backend validation/storage code remains available when frontend-preview mode is off and a real database is configured by the backend team. No database, fake database credential or production submission is part of the final deployment.

Added `.vercelignore` to exclude local research, raw videos, generated recordings/screenshots, docs, environment files, node_modules and build artifacts from source upload. Application source and public assets remain included.

## Verification

- Local TypeScript check passed after the deployment-mode changes.
- Vercel's clean remote production build completed and deployment reached READY without MongoDB configuration.
- A clean Edge browser opened the scoped share URL without a Vercel login, then navigated across routes using its deployment cookie.
- Home and its pinned Philosophy stage rendered successfully. WCI, Analysis, Roadmap and Contact returned 200. Scope preserved its redirect to Roadmap.
- 375, 768 and 1440px checks passed without horizontal overflow; mobile navigation worked.
- Contact preview notice and disabled send button passed. A synthetic local field-interaction test caused zero browser POST requests. An empty request to the preview API returned the intended 503 without contacting a database.
- No page JavaScript/console errors or failed first-party Next assets were captured. Remote hero and Contact screenshots were visually inspected.
- Project-wide authentication was unchanged. Nothing was merged, pushed to GitHub or promoted to production.

Evidence: ignored `artifacts/vercel-frontend-verification.json` and `artifacts/deployed-*.png`.
