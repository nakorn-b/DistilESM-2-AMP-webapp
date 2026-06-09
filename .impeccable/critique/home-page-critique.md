# Critique: Home Page
**Target**: `src/components/Home.tsx`
**Slug**: src-components-home-tsx
**Score**: 26/40 (Acceptable)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Static page, but primary action is clear. |
| 2 | Match System / Real World | 3 | Uses scientific terms (MCC, Sequences), but "Engine" is slightly off-brand. |
| 3 | User Control and Freedom | 4 | Navigation is straightforward. |
| 4 | Consistency and Standards | 2 | Font (`jakarta`) and rounding (`xl`) deviate from DESIGN.md. |
| 5 | Error Prevention | 4 | No inputs here, so low risk. |
| 6 | Recognition Rather Than Recall | 4 | Actions are visible and labeled. |
| 7 | Flexibility and Efficiency | 3 | Buttons are large and accessible, but no keyboard shortcuts mentioned. |
| 8 | Aesthetic and Minimalist Design | 2 | Background blurs and heavy shadows are decorative noise. |
| 9 | Error Recovery | n/a | |
| 10 | Help and Documentation | 3 | "View Publication" is a good contextual link. |
| **Total** | | **26/40** | **Acceptable** |

## Anti-Patterns Verdict

**Verdict**: **Moderate Slop**.

**LLM Assessment**:
The interface attempts a "modern lab" look but falls into several AI/SaaS-slop traps that undermine its "Scientific Authority" goal.
- **The Glow Trap**: The background blurs (`blur-[120px]`, `blur-[150px]`) and heavy primary shadows (`shadow-primary/10`) are classic SaaS-marketing aesthetics that clash with the "Digital Laboratory" creative north star.
- **Tone Drift**: "Initialize Engine" and the italicized uppercase headlines feel more like a futuristic game or a "magical AI" tool than a piece of scientific equipment.
- **System Drift**: Use of the `Plus Jakarta Sans` font and non-standard rounding (`rounded-xl`) deviates from the DESIGN.md mandate of `Inter` and smaller, precise radii (4px-8px).

**Deterministic Scan**:
- Automated detector found 0 issues. This indicates that while the *code* structure is clean, the *aesthetic choices* are where the slop resides.

## Overall Impression
The page is functional and has a strong sense of hierarchy, but it tries too hard to look "cool" for a scientific tool. It feels more like a product landing page for a developer tool than a serious portal for researchers.

## What's Working
- **Information Density**: The layout effectively presents model stats (MCC, Sequences) without feeling cluttered.
- **Clear Call-to-Action**: The "Initialize Engine" button is prominent and well-positioned.
- **Responsive Handling**: Good use of hidden/visible blocks to optimize the layout for mobile.

## Priority Issues

- **[P1] Visual Noise (Aesthetic & Minimalist Design)**: The background blurs and button shadows violate the "Tonal Layering > Shadows" principle from DESIGN.md.
  - **Why it matters**: It makes the tool feel "flimsy" or "over-decorated," which can reduce institutional trust.
  - **Fix**: Remove background blurs and shadows. Use borders and subtle tonal shifts for depth.
  - **Suggested command**: `impeccable distill`

- **[P1] Design System Drift (Consistency & Standards)**: Using `font-jakarta` and `rounded-xl` breaks the "Scientific Precision" system.
  - **Why it matters**: Consistency is the foundation of reliability in professional tools.
  - **Fix**: Revert to `Inter` and use smaller rounding (max `rounded-lg` or `0.5rem`).
  - **Suggested command**: `impeccable typeset`

- **[P2] Tonal Mismatch (Match System / Real World)**: Italicized uppercase headlines and "Initialize Engine" copy lean too far into marketing hype.
  - **Why it matters**: Scientists value precision over "magic."
  - **Fix**: Use non-italic headlines and update copy to "Start Analysis" or "Enter Console."
  - **Suggested command**: `impeccable clarify`

- **[P2] Color Deviation (Consistency & Standards)**: Page uses `bg-white` instead of the specified `surface: #f7f9fb`.
  - **Why it matters**: The surface color defines the "laboratory" environment.
  - **Fix**: Apply `bg-surface` or `#f7f9fb` to the main container.
  - **Suggested command**: `impeccable colorize`

## Persona Red Flags

**Alex (Power User / Researcher)**:
- **Red Flag**: The marketing-heavy tone might feel "unreliable" or "hyped" to a researcher looking for raw data. They might suspect the model's performance is also "hyped."

**Jordan (First-Timer / Lab Scientist)**:
- **Red Flag**: "Initialize Engine" is slightly ambiguous for a scientist. "Start Prediction" or "Sequence Analysis" would be more direct.

## Minor Observations
- The "Benchmarked" section is a bit too faded (`opacity-20`), making it hard to read the institutional names which provide the actual credibility.

## Questions to Consider
- If we removed all decorative blurs, would the page feel "empty" or "focused"?
- What if the primary action reflected the actual scientific task (e.g., "Analyze Sequence") instead of "Initializing an Engine"?
