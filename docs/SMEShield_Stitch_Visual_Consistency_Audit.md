# SMEShield — Stitch Visual Consistency Audit

This document reviews the consistency of visual design elements across the Google Stitch screens.

## 1. Typography & Font Usage
- **Headings:** Merriweather (`font-headline-*`) is consistently used for major section titles and branding elements.
- **Body & UI:** Inter (`font-body-*` and `font-label-*`) is consistently applied for all standard text, navigation, and badges.
- **Consistency:** PASS. The typography hierarchy is strictly maintained across all screens.

## 2. Color Palette & Theming
- **Primary:** `text-primary` (Green hues inferred from brand) used for active states, CTA backgrounds, and primary text highlights.
- **Surface:** `bg-surface`, `bg-surface-container-low`, `bg-surface-container-lowest` are consistently used for cards, sidebars, and main page backgrounds.
- **Error/Alert:** `bg-error` used for notification indicators.
- **Consistency:** PASS. Color tokens are applied uniformly without arbitrary hex values.

## 3. UI Components (Cards, Buttons, Inputs)
- **Border Radius:** `rounded-lg` (typically 8px or 12px) is highly consistent across cards, input fields, and standard buttons. Circular elements like avatars and icon buttons use `rounded-full`.
- **Shadows:** Subtle `shadow-sm` is applied to buttons and some elevated cards, matching modern flat-design trends.
- **Padding:** Cards heavily use `p-space-sm` and `p-space-md`. 
- **Consistency:** PASS. The padding and border-radius tokens are universally respected.

## 4. Iconography
- **System:** `Material Symbols Outlined` is used everywhere.
- **Examples:** `language` (toggle), `notifications` (bell), `person_add` (invite staff), `shield` (score).
- **Consistency:** PASS. No mixing of different icon sets (e.g., FontAwesome or Phosphor).

## 5. Imagery & Asset Usage
- **Treatment:** Images are generally given `object-cover` and rounded corners (`rounded-lg` or `rounded-full`) to match the surrounding UI.
- **Photography Style:** Warm, natural lighting, professional Nigerian corporate/editorial style.
- **Consistency:** PASS. The prompt instructions for image generation created a cohesive visual narrative across all screens.

## 6. Identified Inconsistencies
1. **Desktop vs Mobile Spacing:** While tokens are consistent, the spacing between sections (`gap-space-xl` vs `space-y-space-md`) differs drastically between Desktop and Mobile, sometimes causing mobile elements to feel cramped compared to the spacious desktop layouts.
2. **Dashboard Sidebars:** The left sidebar uses a distinct border treatment (`border-r border-outline-variant/40`) which feels slightly disconnected from the "floating card" aesthetic of the main dashboard grid.

**Conclusion:** The visual design language in Stitch is incredibly consistent. The primary issues are missing responsive views, not visual contradictions.
