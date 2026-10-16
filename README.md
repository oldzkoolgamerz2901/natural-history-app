# Natural History Explorer

A static Angular scientific atlas with a natural history museum atmosphere. The first approved development increment includes a complete Phanerozoic timeline and two finished exhibits: the Permian and the end-Permian extinction. The other 15 exhibit destinations explicitly show that their content is in preparation.

## Run locally

Use Node 26 (the version used for verification) and npm 11. Angular 22 also supports the Node versions listed in its [compatibility table](https://angular.dev/reference/versions).

```sh
npm ci
npm start
```

Open `http://localhost:4200`. Example exhibit: `http://localhost:4200/#/period/permian`.

The application uses Angular CLI's standard build and development-server tooling, with no separate Vite configuration or direct Vite dependency. Angular CLI internally uses Vite for development serving; the application is configured through `angular.json`. Production output is static; there is no Kotlin/Spring service, database, or runtime API.

## Verify

```sh
npm run typecheck
npm test
npm run build
npm exec -- playwright install chromium
npm run test:browser
```

The data tests use Node's built-in test runner and native TypeScript stripping. Browser checks use Playwright and axe on desktop and a touch-enabled phone viewport. They cover the directory, direct links, history, reload, recovery from unknown links, proportional geometry, viewport overflow, focus, keyboard use, and automated accessibility. These checks do not establish scientific peer review, screen-reader usability, or the five-minute learning outcome.

To use an installed Google Chrome instead of downloading Playwright Chromium:

```sh
PLAYWRIGHT_CHROME_CHANNEL=chrome npm run test:browser
```

For code formatting, use the installed Prettier on TypeScript, HTML, CSS, JSON, and Markdown files. SVG diagrams do not need an additional formatter dependency.

## Static hosting

```sh
npm run build
```

Serve `dist/natural-history-explorer/browser/`. Hash-based routes do not require server rewrite rules. For deployment under a subdirectory, build with the corresponding base path, for example `npm run build -- --base-href /natural-history/`. No deployment has been configured or performed in increment 1.

## Content and architecture

- [Approved MVP specification](docs/product-specification.md)
- [Approved architecture and incremental implementation plan](docs/implementation-plan.md)
- [Verification record and remaining work](docs/verification.md)
- [Visual credits and rights](public/visuals/README.md)

Scientific data and exhibit text live in `src/app/content/catalogue.ts`. Boundary ages and supplied uncertainties follow the fixed [ICS 2026/06 chart](https://stratigraphy.org/ICSchart/ChronostratChart2026-06.pdf). Extinction overview ranges are separate from period boundary dates; the Late Devonian is shown as multiple crises over a range.

Angular Router owns selection. The root component composes the timeline, directory, and routed exhibit. There is no global state library, UI kit, external font service, or runtime network dependency. Source links remain external and open only when visitors choose them.

## Next increments

The approved MVP ultimately requires all 17 complete exhibits. Completing the other 15 and running the three-person usability exercise are future increments and have not been approved for implementation yet.
