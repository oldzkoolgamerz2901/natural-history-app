# Agent Instructions

## Project context

## Investigate and design

- Inspect relevant code, configuration, documentation, and existing design decisions before proposing changes. Base conclusions on evidence.
- Evaluate every solution against the overall architecture. Explain how it fits existing responsibilities and boundaries, or why a design change is justified.
- Keep behavior with the component that owns it. Respect dependency boundaries and avoid unnecessary coupling.
- Prefer the simplest maintainable solution that satisfies the requirements. Add infrastructure, dependencies, and abstractions only for a demonstrated need.
- Distinguish verified facts, assumptions, risks, and recommendations. Investigate accessible facts rather than asking the owner to supply them.
- Present meaningful architectural choices and tradeoffs for approval before implementing them.

## Collaborate and execute

- Treat the owner as the decision-maker for product scope and consequential architecture choices. Offer candid technical recommendations and challenge assumptions when evidence warrants it.
- Keep work scoped to the requested task. Planning or investigation does not authorize implementation.
- For implementation tasks, agree on a small, reviewable scope before changing code. Make focused changes and avoid unrelated refactoring.
- Follow the repository's established technology choices, conventions, and documented decisions.
- Validate changes with relevant automated checks and, where appropriate, manual verification. Report what was tested, what remains unverified, and any risks.
- Explain consequential changes clearly enough for the owner to understand and review them.

## Harness experimentation

This project is also an experiment in agentic software development.

- Follow explicit phases: requirements, investigation, planning, approval, implementation, and verification.
- Do not proceed from planning to implementation without explicit human approval.
- Keep product requirements separate from agent workflow instructions.
- Prefer small, independently verifiable development increments.
- Report assumptions, uncertainties, verification evidence, and deviations from approved plans.
- Do not introduce additional agents, skills, frameworks, or infrastructure without a demonstrated need.
- Treat human decisions and approved specifications as authoritative. Challenge them when justified, but do not silently override them.