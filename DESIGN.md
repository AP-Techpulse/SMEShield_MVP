---
name: SMEShield Design System
colors:
  surface: '#FFFFFF'
  surface-dim: '#dcd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#44474d'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#75777e'
  outline-variant: '#c5c6ce'
  surface-tint: '#4e5f7e'
  primary: '#031632'
  on-primary: '#ffffff'
  primary-container: '#1a2b48'
  on-primary-container: '#8293b5'
  inverse-primary: '#b6c7eb'
  secondary: '#0060ac'
  on-secondary: '#ffffff'
  secondary-container: '#68abff'
  on-secondary-container: '#003e73'
  tertiary: '#231300'
  on-tertiary: '#ffffff'
  tertiary-container: '#3e2600'
  on-tertiary-container: '#c88400'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#b6c7eb'
  on-primary-fixed: '#081b38'
  on-primary-fixed-variant: '#374765'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#a4c9ff'
  on-secondary-fixed: '#001c39'
  on-secondary-fixed-variant: '#004883'
  tertiary-fixed: '#ffddb4'
  tertiary-fixed-dim: '#ffb955'
  on-tertiary-fixed: '#291800'
  on-tertiary-fixed-variant: '#633f00'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
  app-bg: '#F8F9FA'
  muted-text: '#667085'
  border-subtle: '#E4E7EC'
  success-base: '#12B76A'
  success-text: '#027A48'
  success-bg: '#ECFDF3'
  warning-base: '#F79009'
  warning-text: '#B54708'
  warning-bg: '#FFFAEB'
  danger-base: '#F04438'
  danger-text: '#B42318'
  danger-bg: '#FEF3F2'
  info-base: '#0BA5EC'
  info-text: '#026AA2'
  info-bg: '#F0F9FF'
typography:
  display-hero:
    fontFamily: Newsreader
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 56px
  display-hero-mobile:
    fontFamily: Newsreader
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  headline-xl:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 42px
  headline-xl-mobile:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-lg:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Newsreader
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md-semibold:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-xxs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4rem
  touch-target-min: 2.75rem
  container-max: 75rem
---

## Brand & Style

This design system expresses a philosophy of **Protection Without Fear**. It rejects aggressive cybersecurity tropes—such as neon terminal glows, black-hat hacker silhouettes, skull iconography, or militaristic security operations center (SOC) dashboards. Instead, it draws from the dignity, warmth, and institutional trust of premium Nigerian fintech and editorial education design.

### Brand Attributes
- **Authoritative yet Approachable:** Delivers rigorous risk mitigation without inducing panic or paralysis.
- **Culturally Grounded & Inclusive:** Native support for Nigerian English and Nigerian Pidgin with equal typographical and visual hierarchy.
- **Editorial & Clear:** Emphasizes high-legibility typographic craft, deliberate whitespace, and calm structural cadence to support business owners and staff across varying levels of digital literacy.
- **Tactile Trust:** Employs crisp borders, subtle warm-tinted blue shadows, and deliberate feedback states that communicate stability, reliability, and modern protection.

### Design Movement
**Editorial Fintech Modernism:** Clean card-driven architecture, high-contrast typography pairing an authoritative serif with an ultra-legible neutral sans-serif, and a luminous light-mode palette grounded in deep maritime trust blue.

## Colors

The color palette is deliberately calibrated to preserve user trust while isolating critical semantic feedback. Dark mode is excluded by design to ensure hyper-consistent accessibility across varying mobile display profiles and daytime outdoor usage.

### Chromatic Governance
- **Primary Trust Blue (`#1A2B48`):** The foundational brand color. Used for dominant chrome, primary interaction buttons, major section headers, and core brand moments. It projects stability and institutional permanence.
- **Secondary Blue (`#4A90E2`):** Used for non-destructive interactive accents, active navigation indicators, secondary progress fills, and supporting informational graphics.
- **Accent Warm Amber (`#F5A623`):** High-energy pedagogical accent reserved for progression highlights, achievement badges, attention callouts, and interactive quiz engagement.
- **Protected Semantic Green (`#12B76A`):** **Strictly guarded.** Never used for generic button chrome, decorative accents, or standard links. It is reserved solely for verified safe statuses, module completion badges, perfect security hygiene indicators, and correct quiz feedback states.

### Status Tokens & Backgrounds
Every semantic state follows a three-tier system of a baseline indicator, high-contrast dark text, and a soft tinted container background:
- **Protected / Success:** Surface `#ECFDF3` | Text `#027A48` | Border/Icon `#12B76A`
- **Warning / Moderate Risk:** Surface `#FFFAEB` | Text `#B54708` | Border/Icon `#F79009`
- **Critical Risk / Danger:** Surface `#FEF3F2` | Text `#B42318` | Border/Icon `#F04438`
- **Informational / Guidance:** Surface `#F0F9FF` | Text `#026AA2` | Border/Icon `#0BA5EC`

## Typography

The typographical pairing anchors the system's character: **Newsreader** provides warmth, authority, and editorial gravitas for narrative headlines, while **Inter** delivers crisp utilitarian precision across UI controls, operational data, and long-form training modules.

### Rules of Application
- **Minimum Body Size:** Standard interactive body copy must never drop below 16px (`body-md`) on mobile devices. This ensures effortless readability under bright sunlight and across lower-resolution smartphone displays.
- **Bilingual Typographic Parity:** Both English and Nigerian Pidgin strings share identical typographic scale, tracking, and leading tokens. Nigerian Pidgin copy is never italicized, bracketed, or visually demoted; it is rendered with the exact same visual authority as standard English.
- **Display Headings:** Apply `Newsreader` with a minimum font weight of 700 to counteract anti-aliasing softening on non-retina displays.
- **Microcopy & Captions:** `body-sm` (14px) and `label-sm` (12px) are reserved strictly for supplementary metadata, input hint helpers, badge pill labels, and timestamp strings.

## Layout & Spacing

The layout model uses a strict 8-point base grid (with a 4-point micro-step for compact metadata badges and iconography alignment). It prioritizes clean visual scanning and prevents interactive crowding.

### Grid Architecture & Form Factors
- **Mobile (<768px):** 4-column fluid layout with `1rem` (16px) outer gutter margins and `1rem` vertical item spacing. All primary actions span full container width.
- **Tablet (768px - 1023px):** 8-column layout with `1.5rem` (24px) gutters and margins. Card lists (such as the 15 core training modules) transition from a single stacked column to a dual-column grid.
- **Desktop (≥1024px):** 12-column layout capped at a maximum container width of `75rem` (1200px) with `2rem` (32px) gutters. Complex tables (such as Business Owner employee rosters) display complete columns without horizontal overflow clipping.

### Core Layout Constraints
- **One Primary Action Per Screen:** Workflows such as self-assessment diagnostic screens, quiz submissions, and role setup flows highlight one unambiguous primary button. All alternate flows are demoted to ghost or secondary button styling.
- **Strict Touch Target Floor:** Interactive zones—including checkboxes, radio item cards, pagination pills, and the language toggle switch—must fulfill a minimum bounding area of `2.75rem` (44px) on both axes.

## Elevation & Depth

Depth in this system is conveyed through structural card separation, crisp borders, and subtle warm-tinted blue shadows. Complex glassmorphic reflections and dramatic high-blur drop shadows are excluded to keep CPU rendering overhead light on low-power devices.

### Elevation Hierarchy
- **Level 0 (Flat Ground):** `#F8F9FA` background canvas. Base for all layout sections.
- **Level 1 (Card & Content Containers):** Pure white `#FFFFFF` surface accompanied by a subtle stroke `1px solid #E4E7EC` and a soft ambient shadow: `0 1px 3px rgba(26, 43, 72, 0.04), 0 1px 2px rgba(26, 43, 72, 0.02)`.
- **Level 2 (Interactive Cards Hover / Dropdowns):** Subtle elevation increase using `0 4px 12px rgba(26, 43, 72, 0.06), 0 2px 4px rgba(26, 43, 72, 0.04)`. Indicates clickability on module cards.
- **Level 3 (Modals & Fixed Flyouts):** High-priority focus layers utilizing `0 12px 32px rgba(26, 43, 72, 0.12), 0 4px 8px rgba(26, 43, 72, 0.04)`. Paired with an accessible backdrop scrim of `rgba(26, 43, 72, 0.40)`.

### Depth Focus Rings
To guarantee full WCAG 2.1 AA accessibility, all focused interactive elements invoke an outer double ring: `box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px #4A90E2`.

## Shapes

The design system employs a rounded, friendly, and structured corner language (`roundedness: 2`). Curves soften the analytical nature of cybersecurity while maintaining professional architectural geometry.

### Radius Distribution
- **Cards & Primary Modules (`rounded-xl` / 12px):** All assessment module tiles, summary diagnostic boxes, and authentication panels.
- **Interactive Controls & Inputs (`rounded-lg` / 8px):** Primary/secondary buttons, text input fields, selector menus, and modal containers.
- **Badges, Status Chips & Language Toggle (`rounded-full` / 9999px):** Risk pills, module progress counters, and the global bilingual English/Pidgin toggle switch.
- **Inner Micro-Elements (4px):** Checkbox square containers, progress bar meters, and inline code/token tags.

## Components

### Buttons
- **Primary Button:** Solid `#1A2B48` background, `#FFFFFF` text, `rounded-lg` (8px), height 48px, minimum horizontal padding 24px. Hover state deepens to `#132036`. Focus state exhibits the double white/blue ring.
- **Secondary Button:** Surface `#FFFFFF`, border `1.5px solid #1A2B48`, text `#1A2B48`. On hover: surface tints to `#F8F9FA`.
- **Ghost / Tertiary Button:** No border or surface fill, text `#1A2B48`, underlined on hover.
- **Prohibition:** Buttons must never be rendered using the protected green (`#12B76A`). Green is strictly reserved for safe states and correct answer validation.

### Language Toggle (English | Pidgin)
- Pill-shaped container (`rounded-full`, 9999px) with `#E4E7EC` border and `#F8F9FA` background.
- Minimum 44px height. Contains two equal segment targets: "English" and "Pidgin".
- Active state: `#1A2B48` background with `#FFFFFF` text, elevated with `shadow-sm`.
- Inactive state: `#667085` muted text with transparent background. Transitions with a 150ms ease.

### Cards (15 Core Training Modules)
- White background (`#FFFFFF`), `1px solid #E4E7EC` border, `rounded-xl` (12px) corners, and Level 1 elevation.
- **Content Hierarchy:**
  1. Top metadata row: Module index number + Category/Risk status pill.
  2. Heading: `Newsreader`, 18px / 26px bold, `#1A2B48`.
  3. Description / Practical context: `Inter`, 14px / 20px, `#667085`.
  4. Footer: Progress bar and estimated completion time (e.g., "5 mins").
- **State Variations:** Completed modules swap the right indicator for the protected semantic green badge (`#12B76A` shield/checkmark).

### Form Inputs & Error Handling
- Default field: Height 48px, `rounded-lg` (8px), background `#FFFFFF`, border `1px solid #E4E7EC`, text `#333333` at 16px to prevent iOS zoom-on-focus.
- Active/Focus: Border changes to `#4A90E2` with an ambient glow ring.
- Error state: Border `#F04438`, background `#FEF3F2`.
- **Form Validation Rule:** Floating disappearing toast alerts are explicitly forbidden. Errors must be displayed inline directly beneath the related field with a `#B42318` error message accompanied by an explanatory warning icon.

### Checkboxes & Radio Selection Tiles
- **Selection Card (Assessment Question Options):** 
  - Standard state: `1px solid #E4E7EC` border, white background, `rounded-lg` (8px), padding 16px.
  - Selected state: `2px solid #4A90E2`, background tint `#F0F9FF`.
  - Correct post-quiz answer state: `2px solid #12B76A`, background tint `#ECFDF3`.
  - Incorrect answer state: `2px solid #F04438`, background tint `#FEF3F2`.

### Status Badges & Pills
- Always composed of an icon + text label (never color alone).
- Height 24px, padding 4px 10px, `rounded-full` (9999px), typography `label-sm` (12px, weight 600).
- Uses the designated semantic background and high-contrast text tokens.

### Data Tables (Business Owner View)
- Reserved strictly for administrative overviews and employee rosters.
- Header: `#F8F9FA` background, uppercase 12px `label-sm` text in `#667085`, `1px solid #E4E7EC` bottom divider.
- Rows: Minimum height 52px, zebra striping avoided in favor of clean 1px borders. Mobile alternative collapses table rows into discrete summary cards.