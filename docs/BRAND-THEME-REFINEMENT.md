# Branding, typography and experimental light mode

The supplied reference website's original `assets/img/logo.png` and `favicon.png` are copied byte-for-byte into `public/brand`. The intertwined W mark was visually cross-checked against the supplied visual-reference PDF. The bitmap remains unchanged in both themes; it is not a recreated lettermark. Source: https://arhistrategstudio.github.io/wci-test-site/index.html

Shared header and footer now use the original logo. The favicon and touch icon use the original reference assets. Inter is the shared interface/display family, with its actual 300–700 weights loaded; JetBrains Mono is used for technical labels and code. Removed the homepage serif exception and the WCI Arial/Courier overrides, including shorthand declarations.

The shared header includes a keyboard-accessible theme button with a pressed state. Dark remains the default. Light mode is experimental, uses explicit CSS grayscale counterparts for existing surfaces, borders and gradients, and saves the user's selection locally. A small pre-paint initialization restores the preference without waiting for hydration. Storage failure does not block changing themes. Original logo pixels are preserved. No animation dependency or global image-inversion filter is used.

Edge browser QA covered Home, About, WCI, Analysis, Roadmap and Contact at 1440px and 390px in both themes: all 24 combinations loaded the 180px source logo, used Inter for page text, had no horizontal overflow and produced no page JavaScript errors. Theme persistence was checked after reload. Screenshots remain in ignored `artifacts/brand`. TypeScript and whitespace checks passed. Light mode is an experiment rather than a complete accessibility audit; existing decorative SVG artwork retains some original dark materials.

Submission authorized by the user on 23 November 2026. Branch: `codex/brand-typography-light-mode`, targeting `main`. Selected browser screenshots are in `docs/review-images/brand-theme`; raw references and local test scripts remain ignored. Publishing the PR does not authorize merging it or manually deploying it.
