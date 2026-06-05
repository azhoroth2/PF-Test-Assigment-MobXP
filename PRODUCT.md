# Product

## Register

product

## Users

Foreman on a factory floor. Deskless, time-poor, one thumb available, often wearing gloves. Reviews and corrects worker clock-out data after a shift ends — typically a 5-minute task squeezed between handoffs. Low software familiarity; high stake for accuracy (payroll downstream). May be in poor lighting, noisy environment, mild time pressure.

Secondary: HR reviewer who processes submitted corrections from a desktop. Not prototyped here but the handoff context matters.

## Product Purpose

A mobile-first AI correction flow inside a workforce management platform (PeopleForce). Foreman reviews flagged clock-out anomalies, sees an AI-suggested correction with a confidence score, approves in bulk or reviews individually, then submits. The AI does the heavy lifting; the human approves. Payroll integrity is the outcome.

## Brand Personality

Bold · Efficient · Honest

Strong visual decisions that earn trust fast. No decorative complexity. Every element either carries information or clears the way for action. The AI's confidence is surfaced visibly, not hidden behind polish.

## Anti-references

- **Generic HR SaaS (Workday, BambooHR):** bloated, desktop-first, too many nav levels, zero mobile consideration, corporate grey.
- **Consumer fintech (Revolut, Cash App):** wrong emotional register — playful, lifestyle-oriented, dark mode as aesthetic rather than utility.
- **Bland admin dashboards:** flat cards everywhere, no hierarchy, neutral to the point of invisibility, indistinguishable from any other tool.

## Design Principles

1. **One action per moment.** The foreman should never have to choose between more than two things at once. Complexity hides behind progressive disclosure, not up front.
2. **Confidence is a signal, not a decoration.** The AI score bar is functional data — its color and label carry meaning. Don't style it for aesthetics; design it for comprehension.
3. **Speed is a form of respect.** This is a 5-minute task. Every extra tap, scroll, or decision is a cost to a person who is already busy. Optimize ruthlessly for the happy path.
4. **Honest about uncertainty.** When the AI isn't sure, the UI says so plainly. No softening. The foreman is a professional — treat them like one.
5. **Floor-grade, not dumbed-down.** High contrast, large tap targets, and simple language come from the environment (glare, gloves, noise), not from assumptions about the user's intelligence.

## Accessibility & Inclusion

- Minimum tap target 56×56px (primary CTAs 64px tall) — gloves + motion environment.
- WCAG AA contrast minimum; floor glare means actionable labels never use secondary-grey text.
- No reliance on color alone for state — confidence states use both color and label text.
- Reduced motion: transitions exist but are restrained (150ms ease-out max). No bounce, no spring.
