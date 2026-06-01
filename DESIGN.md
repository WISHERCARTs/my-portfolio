---
name: Wish Nakthong Portfolio
description: Modern, high-tech, and professional portfolio for a DST student at Mahidol University.
colors:
  primary: "#06b6d4"
  accent: "#0891b2"
  neutral-bg: "#f8fafc"
  neutral-bg-dark: "#020617"
  neutral-text: "#334155"
  neutral-text-dark: "#cbd5e1"
  border: "#e2e8f0"
  border-dark: "#1e293b"
typography:
  display:
    fontFamily: "var(--font-sans), system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "var(--font-sans), system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
  card:
    backgroundColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Wish Nakthong Portfolio

## 1. Overview

**Creative North Star: "The Neural Minimalist"**

"The Neural Minimalist" aesthetic combines the precision of Data Science and AI networks with a clean, highly structured, and readable portfolio layout. Spacing is treated as a core design element, providing clear breathing room that allows tech recruiters and employers to scan information in seconds. Every visual element is deliberate, functional, and aligned, avoiding unnecessary clutter.

This design system explicitly rejects generic AI clichés—such as saturated rainbow neon gradients, excessive border-radii (>24px) that look childish, and identical flat card grids with no hierarchy. Instead, it relies on crisp grid structures, clean slate surfaces, high contrast, and a futuristic Neon-Cyan accent to represent high-tech capability without sacrificing professional credibility.

**Key Characteristics:**
- **Crisp Grid Structure:** Clean, logical alignments inspired by mathematical coordinate systems.
- **Cyber-Contrast:** Neon-Cyan highlights cutting through a deep, pristine Slate background in Dark mode.
- **Flat & Layered Depth:** Depicts hierarchy using subtle color shifts and precise border strokes rather than heavy shadows.

---

## 2. Colors

The color palette utilizes a clean, cool-neutral Slate ramp as the solid foundation, punctuated by a sharp Neon-Cyan primary accent that directs the user's attention to key actions and headings.

### Primary
- **Neon Cyan** (`#06b6d4` / `oklch(0.72 0.16 195)`): The primary brand color. Representing modern, high-tech, and dynamic interfaces. Used sparingly (≤10%) for primary buttons, focus states, and key highlights.

### Secondary
- **Deep Cyan Accent** (`#0891b2` / `oklch(0.60 0.15 195)`): A slightly deeper, darker cyan used for hover states and active indicators to maintain a high-quality, tactile feel.

### Neutral
- **Slate Ink (Text)** (`#334155` / `oklch(0.37 0.04 240)`): Primary body text color in Light mode, ensuring optimal contrast and readability against cool white.
- **Slate Screen (Bg)** (`#f8fafc` / `oklch(0.98 0.01 240)`): Pristine, off-white background in Light mode to ensure a clean, modern atmosphere.
- **Obsidian Dark (Bg)** (`#020617` / `oklch(0.12 0.03 240)`): The deep, ink-black background in Dark mode, providing a gorgeous, premium canvas for neon elements.
- **Ice Slate (Text-Dark)** (`#cbd5e1` / `oklch(0.85 0.02 240)`): The clean, high-contrast light text for dark mode surfaces.

### Named Rules
**The 10% Cyan Rule.** Neon Cyan is a highly luminous accent. It must be used on no more than 10% of any viewport's surface area. Excessive cyan creates visual fatigue and dilutes the focal point.

---

## 3. Typography

**Display Font:** System Sans (e.g. Inter, system-ui)
**Body Font:** System Sans (e.g. Inter, system-ui)

The system relies on a single high-quality grotesque sans-serif family to reinforce the mathematical, highly precise "Neural Minimalist" concept. Weight and scale contrasts are maximized to create a sharp reading hierarchy.

### Hierarchy
- **Display** (Bold (700), `clamp(2.5rem, 6vw, 4rem)`, `1.1`): Used solely for Hero sections and prominent landing headlines. Tight letter-spacing (`-0.03em`) for a designed grotesque look.
- **Headline** (Bold (700), `1.875rem` / `30px`, `1.2`): Used for primary section titles (e.g., "Projects", "About").
- **Title** (Semibold (600), `1.25rem` / `20px`, `1.3`): Used for project cards, job titles, or section cards.
- **Body** (Regular (400), `1rem` / `16px`, `1.6`): Used for all standard paragraphs. Maximum line length capped at `70ch` to prevent reader fatigue.
- **Label** (Medium (500), `0.875rem` / `14px`, `letter-spacing: 0.05em`, uppercase): Used for tags, badges, buttons, and short metadata items.

### Named Rules
**The No-All-Caps-Body Rule.** Uppercase is strictly limited to short labels (≤4 words). Running body text must never be capitalized, as it degrades readability.

---

## 4. Elevation

In alignment with the "Flat & Layered" philosophy, this system rejects soft drop shadows that blur the boundaries of elements. Depth is communicated strictly through surface color shifting and crisp border definitions.

### Depth Vocabulary
- **Resting Flat:** Elements lie flat on the canvas background. No shadow. Boundaries are demarcated using 1px borders of a slightly lighter or darker slate tint.
- **Layered Sheet:** Elevating cards or modals is achieved by shifting the background color (e.g., using `bg-slate-50` to `bg-white` in Light mode, or `bg-slate-950` to `bg-slate-900` in Dark mode) rather than lifting with shadows.

### Named Rules
**The Zero-Shadow Rule.** Drop shadows (`box-shadow`) are prohibited on cards, containers, and buttons. Depth must be conveyed strictly using flat color fills and 1px border lines.

---

## 5. Components

### Buttons
- **Shape:** Softly curved corners (`rounded-md`, 12px border radius).
- **Primary:** Background Neon Cyan (`#06b6d4`), Text White (`#ffffff`), padding `12px 24px` (`3rem` equivalents).
- **Hover:** Deep Cyan Accent (`#0891b2`), smooth color transition (`transition-colors duration-200`).
- **Secondary / Bordered:** Transparent background, `border border-slate-300 dark:border-slate-700`, text Slate (`text-slate-700 dark:text-slate-200`), hover border Neon Cyan, hover text Neon Cyan.

### Cards / Containers
- **Corner Style:** Rounded corners (`rounded-lg`, 16px border radius).
- **Background:** White (`#ffffff`) in Light mode, deep Slate (`#0f172a` or `bg-slate-900`) in Dark mode.
- **Border:** Crisp 1px border (`border-slate-200` in Light, `border-slate-800` in Dark).
- **Internal Padding:** `24px` (`p-6` equivalent) on all viewports.

### Inputs / Fields
- **Style:** Background white or transparent, `border border-slate-300 dark:border-slate-800`, `rounded-md` (12px).
- **Focus:** Border shifts to Neon Cyan (`#06b6d4`), no glowing shadow ring.
- **Error:** Border changes to crisp warning red (`#ef4444`).

### Navigation
- **Style:** Floating top bar with glass blur effect (`bg-white/80 dark:bg-slate-950/80 backdrop-blur-md`). No bottom border scrolled, only a very thin, elegant `border-b border-slate-100 dark:border-slate-800/50`.
- **Links:** Slate (`text-slate-600 dark:text-slate-300`), hovering to Neon Cyan. Active links highlighted using a small cyan indicator.

---

## 6. Do's and Don'ts

### Do:
- **Do** maintain a strict 1px border around all card containers to define their boundaries cleanly.
- **Do** respect the 10% Cyan Rule, using the neon color only for emphasis and key calls to action.
- **Do** cap body text line lengths at 70 characters (`max-w-prose` or `max-w-2xl`) for optimal scanning.
- **Do** use `backdrop-blur-md` on navigation panels only when they overlap content during scrolling.

### Don't:
- **Don't** use any large, soft drop shadows (`shadow-lg`, `shadow-xl`) on elements; stick strictly to flat-layered depth.
- **Don't** use diagonal stripe backgrounds or sketchy SVG drawings. Keep assets clean and mathematically crisp.
- **Don't** use overly rounded edges (`rounded-[32px]` or `rounded-[40px]`) on cards or containers.
- **Don't** use text gradients (`background-clip: text` with a gradient) for headings. Use solid, high-contrast text colors.
