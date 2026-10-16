# Natural History Explorer — approved MVP specification

Status: approved by the product owner in the project conversation, 16 October 2026.

## Purpose and audience

An interactive scientific atlas for curious adults and older teenagers without prior geology knowledge. Within five minutes, visitors should be able to place major mass extinctions in geological time and explain how one transformed life.

The experience evokes a natural history museum through clear visual hierarchy, relevant imagery, and concise exhibit-style interpretation.

## Content scope

- Detailed coverage of the Phanerozoic: its eras, all 12 periods, and five major mass extinctions.
- Earlier Earth history appears only as orientation.
- English only, with 17 complete exhibits at MVP launch.
- Period exhibits contain dates, an overview, characteristic life and environments, a relevant visual, and sources.
- Extinction exhibits contain timing, affected life, likely causes, consequences, scientific uncertainty, a relevant visual, and sources.

## Experience and interactions

Visitors arrive at a complete timeline with a brief orientation and invitation to explore. Selecting a period or extinction opens one accompanying exhibit panel.

Time is proportional, with clearly labelled direction and dates. Generous selection targets and an accompanying period list make narrow intervals accessible. Exploration requires no zooming, panning, dragging, or hover.

Each exhibit has a stable URL. Reload preserves the selected exhibit; browser Back restores the previous selection.

## Scientific and visual standards

Dates follow one identified edition of the International Chronostratigraphic Chart, recorded during content preparation. Approximate dates and disputed explanations are explicit. Extinction estimates explain what was measured.

Every exhibit includes references and a relevant, captioned visual with credits and documented usage rights. Existing scientific illustrations, photographs, and diagrams are acceptable; bespoke reconstructions are not required.

## Accessibility and delivery

The core experience works on phones and desktops using touch or keyboard. It provides readable contrast, visible focus, reduced-motion support, and essential information in text.

The MVP is a static web application with no backend, accounts, or embedded LLM. Technology decisions are recorded separately.

## Scope boundaries

Exclude detailed Precambrian coverage, epochs and ages, species profiles, maps, search, filters, comparisons, quizzes, bookmarks, saved progress, teacher tools, additional languages, virtual museum rooms, avatars, cinematic introductions, and ambient audio.

## Acceptance criteria

- All 17 exhibits are complete and reachable by touch and keyboard.
- Dates, interval proportions, and extinction positions match the chosen reference.
- Every exhibit meets its content, sourcing, and visual requirements.
- Phone and desktop layouts remain readable; essential content requires neither hover nor animation.
- Direct links, reload, and browser Back behave as specified.
- At least two of three participants unfamiliar with geology can find an extinction, identify its period, and explain one consequence within five minutes without coaching. This is an initial usability signal, alongside independent accuracy and interaction checks.

The main delivery risk is preparing and verifying 17 exhibits and their visual rights. Concise content keeps that commitment manageable.
