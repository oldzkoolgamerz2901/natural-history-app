# Implementation plan

## Approved architecture

Approved by the product owner on 16 October 2026:

- Angular with TypeScript, standalone components, and Angular CLI tooling.
- No separate Vite setup, backend, accounts, or LLM integration.
- Local typed content; proportional geometry and displayed dates derive from the same boundary data.
- Angular Router with hash-based exhibit URLs for static hosting, reload, sharing, and browser history.
- Plain CSS and static deployment.

Angular was chosen to match the owner's expertise. Kotlin/Spring remains a possible future option if server responsibilities emerge; none are required by the approved MVP.

## Increment 1 — approved for implementation

- Record the approved product specification separately from implementation decisions.
- Establish the application and content structure.
- Populate the full timeline with 12 periods, three eras, and five extinction markers.
- Complete the Permian and end-Permian exhibits with sources and original, credited explanatory diagrams.
- Implement selection, direct links, reload, browser Back, responsive layout, and keyboard access.
- Mark the remaining 15 exhibits as in preparation.
- Verify build/type checking, scientific data integrity, geometry, routing, touch/keyboard interactions, and representative phone/desktop accessibility.

This increment is an independently reviewable exploration slice, not the complete MVP.

## Increment 2 — proposed, not approved for implementation

Complete the remaining 15 exhibits. Verify scientific explanations, references, uncertainties, and visual rights.

## Increment 3 — proposed, not approved for implementation

Finish launch acceptance checks and the three-person usability exercise. Participant recruitment and an independent scientific review remain to be arranged. Hosting/publication is a separate decision.

## Scientific preparation decisions

- Pin boundary ages and uncertainties to ICS 2026/06, using its versioned PDF.
- Keep extinction ranges separate from period boundaries: they are approximate overview positions, not exact onset dates. The Late Devonian represents multiple crises across a range.
- Use NPS background material and peer-reviewed research for the two complete exhibits. Every content section links to supporting references.
- Author original conceptual SVG diagrams, released under CC0, rather than depend on third-party reconstruction rights. Diagrams do not claim to reconstruct a specific landscape or provide a quantitative model.

## Ownership boundaries

- `content/catalogue.ts`: scientific entities, provenance, and exhibit text.
- `content/geology.ts`: pure formatting and proportional geometry.
- `timeline/`: proportional overview and extinction marker navigation.
- `catalogue/`: accessible directory, grouped by era, with editorial completion status.
- `exhibit/`: selected exhibit, sources, route-input resolution, and missing-content states.
- Root application: page composition only. Angular Router owns selected-exhibit navigation; there is no duplicated global selection store.
