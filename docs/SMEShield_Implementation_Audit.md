# SMEShield Implementation Audit (PHASE 0)

> [!WARNING]
> This is a forensic audit comparing the current codebase implementation against three authoritative sources of truth: the PRD, `DESIGN.md`, and Google Stitch screens. No code changes have been made during this phase.

## 1. Executive Summary
The current SMEShield implementation has established foundational elements (Next.js App Router, Tailwind CSS, Supabase Auth), but deviates significantly from the authoritative sources of truth. The application currently suffers from a lack of high-fidelity adherence to the Google Stitch designs, incomplete PRD feature coverage (notably the 15 modules and full quiz system), and missing core navigational features (Profile, Settings, Logout). The design system implementation has mismatched values for typography, border radii, and imagery compared to the Google Stitch extraction and `DESIGN.md`.

## 2. Overall Compliance Percentage
**Estimated Compliance: ~25%**
- **Design/UI:** ~30% (Basic layout exists, but fonts, radii, and imagery are broken/mismatched).
- **Product/Features (PRD):** ~20% (Only 3 of 15 modules exist, minimal quiz functionality, missing employee invite flow).
- **Codebase/Stability:** ~50% (Next.js and Supabase are functioning, but hydration mismatches exist).

## 3. Screen Coverage
- **Landing Page (Desktop/Mobile):** Partially implemented.
- **Login / Sign Up (Desktop):** Implemented.
- **Onboarding (Desktop/Mobile):** Implemented.
- **Business Owner Dashboard:** Implemented.
- **Employee Learner Dashboard:** Implemented (shared dashboard).
- **Training Module:** Implemented for first 3 modules.
- **Baseline Assessment Question:** Implemented.

## 4. Missing Screens
- **Profile / Settings View:** Completely absent from the application.
- **Logout Flow:** No functional UI or screen to log out.
- **Dedicated "How It Works" Screen:** Stitch specifies a dedicated screen for "How It Works" which does not exist as a separate route.

## 5. Incorrect Screens
- **Dashboard:** Does not follow the exact structural layout of the Stitch design. Missing specific iconography and card structuring.
- **All Screens (Border Radius):** Global border-radius is overly rounded (e.g., `1.5rem` / 24px) in the previous `DESIGN.md`, contrasting with the `ROUND_EIGHT` (12px for cards, 8px for controls) specified in the Stitch extraction.
- **All Screens (Typography):** Merriweather is specified for Display/Headlines but is either not loading properly or not applied consistently, defaulting to a sans-serif or generic serif.
- **All Screens (Imagery):** Missing high-quality Stitch background images and portrait headshots.

## 6. Partial Screens
- **Training Modules:** Currently lack the full content body; they contain dummy data or just one quiz question.
- **Dashboard Progress Tracking:** Currently hardcoded or using mocked progression states.

## 7. Design-System Violations
> [!IMPORTANT]
> The `DESIGN.md` in the repository conflicts with the Stitch design in terms of corner radii and some shadow definitions.
- **Radii:** Current implementation uses values that are "a bit much." The Stitch design specifically states `ROUND_EIGHT` (8px for inputs/buttons, 12px for cards).
- **Icons:** Material symbols outline is used, but specific icons do not match the Stitch visual reference.
- **Shadows/Elevation:** The double focus ring (`box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px #4A90E2`) is not universally applied.

## 8. Font Violations
- **Merriweather (Serif):** Although defined in `globals.css` and `DESIGN.md`, it is failing to render correctly on the frontend, indicating a missing or misconfigured Google Font import in the Next.js `layout.tsx`.
- **Inter (Sans-serif):** Used correctly for body, but typographic scales (e.g., `label-sm` with letter spacing) are not strictly adhered to.

## 9. Image/Asset Violations
> [!WARNING]
> No placeholder or generic Unsplash images should be used.
- The high-quality background images and the specific portrait headshot ("Warm, professional portrait headshot of a friendly Nigerian business owner in Lagos...") from the Stitch design are completely missing from the rendered pages.

## 10. Dashboard Violations
- **Structure:** The current dashboard does not follow the asymmetric layout (8-column metric progression vs 4-column threat level sidebar) specified in the PRD and Stitch.
- **Empty States:** The employee roster does not prompt inviting the first employee when empty, violating the PRD.

## 11. Module/Content Violations
- **Curriculum:** The PRD explicitly mandates a 15-module curriculum. The current SQL migration only populates the first 3 modules.
- **Content:** The modules lack their full bilingual educational content and practical context.

## 12. Quiz Violations
- **Self-Assessment:** Modules currently contain only a single quiz question instead of a comprehensive assessment.
- **Scoring:** The immediate scoring, feedback, and weak-area detection mechanism is incomplete.

## 13. Missing Profile/Settings/Logout Functionality
- **Authentication Flow:** Users can log in, but they cannot log out.
- **User Management:** Users cannot view or edit their profile details or change preferences after onboarding.

## 14. Responsive Violations
- **Mobile Gutter Margins:** The grid architecture specifies `1rem` (16px) margins on mobile, which is inconsistently applied.
- **Touch Targets:** The strict touch target floor of `2.75rem` (44px) for checkboxes and the language toggle is not fully enforced on mobile views.

## 15. PRD Requirement Violations
- **15-Module Curriculum:** 12 modules are entirely missing from the database.
- **Dual Employee-Invite Mechanism:** The 6-digit join code and Brevo-powered email invite flow are not fully implemented.
- **Adaptive Recommendations:** The rule-based recommendation engine by business type is mocked/stubbed rather than fully functional.

## 16. Security/Role Violations
- **Role Enforcement:** While `is_business_owner_of` RLS policies exist, the UI does not strictly limit data fetching. We need to verify that an Employee cannot access the Business Owner's team roster endpoints.

## 17. Accessibility Violations
- **Focus Rings:** The mandatory WCAG 2.1 AA double focus ring on interactive elements is missing on several inputs and buttons.
- **Form Validation:** Floating disappearing toasts might still exist instead of the mandated inline error messages beneath fields.

## 18. Stitch / PRD / DESIGN.md Conflicts
> [!CAUTION]
> The following conflicts between authoritative sources were discovered:
1. **Border Radius:** `DESIGN.md` in the repo specifies `rounded-xl: 1.5rem` (24px) for Cards. The Stitch output specifies `12px` for Cards and `8px` for Controls. (Recommendation: Follow Stitch for 12px/8px).
2. **"How It Works" Screen:** Stitch lists a dedicated "How It Works" screen, while the PRD implies this content lives on the Landing Page. (Recommendation: Follow Stitch and create the dedicated route).

## 19. Exact Recommended Correction Phases

- **Phase 1: Foundation & Polish**
  Fix the critical typography issues (Merriweather font loading), correct the global border radii (to 8px/12px), fix the hydration error in `layout.tsx`, and adjust all spacing to match the Stitch design exactly.
  
- **Phase 2: Assets & Imagery**
  Generate and integrate the missing Stitch-specific images (hero background, professional Nigerian business owner headshots) without using generic stock photography.
  
- **Phase 3: Structural Layouts**
  Rebuild the Dashboard and Onboarding layouts to strictly follow the Stitch 12-column grid and component architecture.
  
- **Phase 4: Missing Navigational Features**
  Implement the Profile, Settings, and Logout functionality.
  
- **Phase 5: Content & Quizzes (The 15 Modules)**
  Implement the remaining 12 modules in the database and build the full quiz self-assessment engine.

## 20. Critical Issues Ranked

1. **CRITICAL:** Font not loading (Merriweather).
2. **CRITICAL:** Missing high-quality design images/assets.
3. **CRITICAL:** 12 of 15 Modules missing from the curriculum.
4. **CRITICAL:** Hydration mismatch error blocking correct SSR rendering.
5. **HIGH:** Dashboard layout incorrect and mismatched.
6. **HIGH:** Border radii too large globally.
7. **HIGH:** Missing Profile, Settings, and Logout features.
8. **MEDIUM:** Quiz system only has one question per module.
9. **MEDIUM:** Missing dedicated "How It Works" page.
10. **LOW:** Icon mismatches.
