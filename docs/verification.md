# Increment 1 verification

Verified on 16 October 2026 using Node 26.12.0, npm 11.20.0, Angular 22.2.3, and installed Google Chrome via Playwright.

## Results

| Check                              | Result    | Evidence                                                                                                                                          |
| ---------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Production build                   | Passed    | `npm run build`; 279.04 kB initial JavaScript/CSS, estimated 75.91 kB transfer; output in `dist/natural-history-explorer/browser/`.               |
| TypeScript checking                | Passed    | `npm run typecheck`; strict TypeScript and Angular template checking enabled.                                                                     |
| Scientific data and geometry tests | 5 passed  | `npm test`; continuity, era containment, proportional widths, boundary precision, five event ranges, references, and credited local visual files. |
| Desktop browser checks             | 5 passed  | `PLAYWRIGHT_CHROME_CHANNEL=chrome npm run test:browser`; 1280 × 720 Chromium viewport.                                                            |
| Phone browser checks               | 5 passed  | Same command; 390 × 844 touch-enabled Chromium viewport with iPhone 13 emulation.                                                                 |
| Whitespace check                   | Passed    | `git diff --check`.                                                                                                                               |
| Visual inspection                  | Completed | Reviewed full-page screenshots of the desktop overview, phone overview, and phone Permian exhibit.                                                |

The browser checks exercise all 17 directory destinations, distinguish the two completed exhibits from unfinished destinations, and verify direct links, reload, Back/Forward, invalid-link recovery, focused headings, keyboard entry, return to timeline, and touch entry through both the overview and an extinction marker. Rendered period widths and extinction positions are checked against proportional calculations. Core pages have no horizontal viewport overflow.

Axe reported no WCAG 2 A/AA or WCAG 2.1 A/AA violations on the overview, Permian exhibit, end-Permian exhibit, and a preparation page in both viewports with reduced motion enabled. Automated accessibility results are not a claim of complete accessibility conformance.

## Corrections made during verification

- Routed component hosts explicitly use block layout; inline host layout had intercepted overview pointer interactions.
- Timeline abbreviations have contrasting backgrounds and are included in accessible names.
- The header's accessible name follows its visible text.
- Event-range shading remains visible above the numbered markers instead of being concealed behind them.

## Scientific provenance

Boundary ages and supplied uncertainties were transcribed from the versioned ICS 2026/06 PDF. Approximate event ranges are maintained separately and explained in the interface. NPS material and the cited Burgess, Penn, and Payne/Clapham publications support the two completed exhibits. Source links appear with individual text sections and visual captions. The two diagrams are original CC0 explanatory graphics; no third-party visual assets were copied.

Data tests establish internal consistency and selected reference values, not independent scientific peer review. Editorial review remains necessary before the full MVP launches.

## Remaining work and limits

- Fifteen exhibits are intentionally unfinished; the complete MVP's content acceptance criterion is not yet met.
- The approved three-person, five-minute learning exercise has not been run. Participants remain to be arranged.
- Physical-device testing, Safari/Firefox verification, and a manual screen-reader review have not been performed.
- No hosting integration or publication has been performed.
- Standard Angular CLI tooling is used. Its development server internally uses Vite; the repository has no independent Vite configuration or direct Vite dependency.
- Build and Chrome execution required the environment's sandbox escalation; they passed outside the sandbox.

The existing AGENTS.md edits were preserved. No agent instructions were modified during this implementation.
