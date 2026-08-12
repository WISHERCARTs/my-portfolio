---
target: "https://my-portfolio-wish.vercel.app/ (homepage readability)"
total_score: 26
p0_count: 0
p1_count: 3
timestamp: 2026-08-12T15-43-39Z
slug: my-portfolio-wish-vercel-app
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Chat has typing indicator + PixelOffice status; modal has clear open/close state |
| 2 | Match System / Real World | 3 | Plain-language TH/EN, natural portfolio section order |
| 3 | User Control and Freedom | 3 | Modal Esc + arrow keys, view toggle reversible; no "back to top" on long scroll |
| 4 | Consistency and Standards | 3 | Internally consistent, but same card treatment reused across 3 unrelated sections |
| 5 | Error Prevention | 2 | Low-stakes site, little to prevent; chat retry exists |
| 6 | Recognition Rather Than Recall | 3 | Labeled nav, visible section headers, tags on skills |
| 7 | Flexibility and Efficiency | 2 | No shortcuts beyond modal Esc/arrows; no jump-to-section beyond nav click |
| 8 | Aesthetic and Minimalist Design | 2 | Real contrast failures undermine "clean"; identical card grids in 3 places |
| 9 | Error Recovery | 3 | Chat error state has clear Thai message + retry button |
| 10 | Help and Documentation | 2 | 3 starter prompts hint at chat capability; no other help/tooltips |
| **Total** | | **26/40** | **Acceptable — significant improvements needed** |

## Anti-Patterns Verdict

**LLM assessment**: Not heavily AI-slop. No gradient text, no side-stripe borders, no hero-metric template, no numbered-eyebrow spam found in source. The one real tell: identical card grids (Skills categories, Projects, Certificates) all use the exact same white/slate-900 + 1px border + rounded-lg + p-6 treatment — which PRODUCT.md's own anti-reference list explicitly names as something to avoid, so this is a self-identified gap, not a guess.

**Deterministic scan**: `detect.mjs` skipped (URL target, no local markup to scan). Live browser overlay injection failed: mixed-content block (`ERR_BLOCKED_BY_CLIENT` loading `http://localhost:8400/detect.js` from the `https://` page — browser security, not a site bug). Substituted manual DOM/canvas contrast + tap-target scans directly in the live page as deterministic evidence instead. No visible overlay is available in the browser tab; the findings below come from that script-based scan.

## Overall Impression

Visual system is coherent and IA is logical. But the site fails its own stated bar: DESIGN.md commits to WCAG AA and the primary Neon Cyan (`oklch(0.72 0.16 195)`) is light enough that using it as *text* — not just accents — breaks that promise in measurable, specific spots. That's the single biggest opportunity: fix contrast where cyan and muted slate are carrying text, not just accenting it.

## What's Working

- Alt text: 70/70 images have real alt text, zero missing.
- Chat error/retry flow: plain Thai message, clear recovery button, no dead end.
- Section order and copy: no jargon, matches how a recruiter would actually scan a portfolio top to bottom.

## Priority Issues

**[P1] Primary CTA text fails contrast**
Why it matters: "View My Projects" is the hero's main call to action — white text on `bg-cyan-500`, measured **2.37:1**. WCAG AA needs 4.5:1 at 16px. The button people are most likely to click is the hardest to read.
Fix: darken the button fill to `cyan-600`/`cyan-700`, or invert to `bg-white text-cyan-700` with a cyan border.
Suggested command: `/impeccable audit`

**[P1] Cyan reused as link/text color, not just accent**
Why it matters: hero name highlight, "Live Demo" links, nav hover state all sit at **2.4–3.65:1** against their backgrounds, measured on opaque backgrounds (not a measurement artifact). DESIGN.md's own "10% Cyan Rule" says cyan is for accents/CTAs, not running text — this breaks that rule in practice.
Fix: keep cyan for icons, borders, hover underlines; render link/heading text in slate ink with cyan reserved for hover/focus only.
Suggested command: `/impeccable audit`

**[P1] Card description text too light in dark mode**
Why it matters: project/certificate card body copy measured **2.63:1** on opaque `slate-900` card backgrounds in dark mode — well under the 4.5:1 floor for 14px text. This is the actual project descriptions recruiters are supposed to read.
Fix: bump muted body text from `slate-400`-equivalent to `slate-300`, verify against `slate-900`/`slate-950` card backgrounds.
Suggested command: `/impeccable audit`

**[P2] Mobile tap targets under 44×44pt**
Why it matters: "Code" / "Live Demo" / "Preview" links inside project cards measure **~20px tall** at 375px viewport. Casey (mobile, thumb-only) will mis-tap repeatedly.
Fix: increase vertical padding/line-height on these link rows for mobile breakpoints, target ≥44px hit area.
Suggested command: `/impeccable adapt`

**[P2] Identical card grids across 3 sections**
Why it matters: Skills categories, Projects, and Certificates all use the same card shell with no visual differentiation between content types — PRODUCT.md names this exact pattern as an anti-reference.
Fix: differentiate at least one axis per section (size rhythm, icon treatment, featured-item emphasis) without falling into the banned side-stripe-border shortcut.
Suggested command: `/impeccable layout`

## Persona Red Flags

**Jordan (First-Timer, portfolio visitor)**: Chat starter prompts help, but "View My Projects" — the very first action offered — is genuinely hard to read at a glance due to contrast. Everything else reads clearly and jargon-free.

**Riley (Stress Tester)**: Dark mode specifically degrades readability further than light mode (card body text, nav links) — an inconsistency between the two themes that a careful visitor will notice on toggle.

**Casey (Mobile)**: Small tap targets on "Code"/"Live Demo"/"Preview" links are the concrete failure point; everything above the fold reads fine one-handed otherwise.

## Minor Observations

- A few body paragraphs run 74–78ch (About intro, Certificates section blurb, Contact line) — DESIGN.md's own cap is 70ch. Not severe, worth trimming on a polish pass.
- Nav has 6 top-level links; at the edge of the ≤5-item recommendation but not a real problem at this scale.
- No "back to top" affordance on a fairly long single-page scroll.

## Questions to Consider

- Is Neon Cyan the right *text* color anywhere, or should it be accent-only everywhere (buttons, icons, focus rings) and never body/link copy?
- Would a slightly deeper cyan token (e.g. `cyan-600`/`cyan-300` split by theme) preserve the brand feel while actually passing AA?
- Does the card-grid repetition matter for a portfolio's core job (scannable proof of skill), or is it acceptable at this scale?
