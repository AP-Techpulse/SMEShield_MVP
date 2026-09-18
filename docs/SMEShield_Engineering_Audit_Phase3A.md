# SMEShield Engineering Audit Report (Phase 3A)

## A. App Router Structure Parity
**Status: Partial / Divergent**
- **Implemented:** `/(public)`, `/(auth)/*`, `/assessment`, `/certificate`, `/dashboard`, `/dashboard/*`, `/glossary`, `/onboarding`, `/training`, `/training/[id]`, `/training/[id]/quiz`.
- **Gaps:** The current routing structure fails to distinguish between the Business Owner Dashboard and the Employee Dashboard structurally (combining them into conditionally rendered blocks in a single `/dashboard` route). `Settings`, `Profile`, and `Notifications` routes are missing entirely. The explicit `/how-it-works` marketing page is absent.

## B. Supabase Data Model Parity
**Status: Compliant**
- **Implemented:** The baseline schema (`20260910000000_schema.sql`) implements `businesses`, `users` (extending auth with roles, preferred_language), `modules`, `quiz_questions`, `user_progress`, `assessment_results`, and `employee_invites`.
- **Gaps:** The schema aligns perfectly with the PRD requirements. No structural modifications are needed.

## C. RLS & Security Posture
**Status: Compliant**
- **Implemented:** Row Level Security (RLS) is enabled on all custom tables. Policies correctly segregate data: Users can read their own profiles/progress; Business Owners can read data for employees within their `business_id`; unauthenticated users are restricted from curriculum content.
- **Gaps:** None identified. The policy definitions correctly map to the PRD's data privacy mandate.

## D. Authentication & Role Architecture Parity
**Status: Functional but Visually Divergent**
- **Implemented:** `(auth)` routes exist for Signup, Login, Forgot Password, Reset Password. Supabase SSR integration is properly installed. Roles (`business_owner`, `employee`, `sole_entrepreneur`) are correctly defined in the database check constraints.
- **Gaps:** The UI for the Auth flow diverges from the canonical Stitch design (missing the side panel asset `public/assets/smeshield/auth/side-panel.jpg`).

## E. Onboarding Flow Logic Parity
**Status: Partial**
- **Implemented:** An `/onboarding` route exists and writes to `users.business_type` and `users.onboarding_complete`.
- **Gaps:** The onboarding component is monolithic rather than utilizing the multi-step/route separation defined in the PRD (Role Selection -> Business Details -> Join Code). 

## F. Dashboard Navigation Parity
**Status: Critically Divergent**
- **Implemented:** Single monolithic `/dashboard` page using a top-level horizontal navigation approach.
- **Gaps:** The Stitch canonical design relies on a vertical sidebar layout for the Business Owner dashboard, and a distinct layout for Learners. The current implementation completely lacks the sidebar and structural separation required by the PRD and Stitch designs.

## G. Curriculum Data Implementation Parity
**Status: Incomplete (Partial Seed)**
- **Implemented:** The `modules` table structure correctly supports bilingual content. `supabase/seed.sql` creates all 15 modules but with placeholder text ("Content coming soon.").
- **Gaps:** Migration `20260910200000_populate_module_content.sql` only populates real English and Pidgin content for Modules 1, 2, and 3. Modules 4-15 remain unpopulated.

## H. Adaptive Engine Implementation Parity
**Status: Implemented**
- **Implemented:** `src/lib/adaptive-engine.ts` implements a server-side scoring algorithm (+20 for weak areas derived from `baseline_results`, +10 for `business_type` relevance).
- **Gaps:** The algorithm matches the PRD logic. No major gaps, though it requires actual baseline results to function meaningfully.

## I. Training Module Logic Parity
**Status: Partial**
- **Implemented:** `quiz_questions` are fully populated in the database.
- **Gaps:** The UI for `/training/[id]` does not match the canonical Stitch layout for learning modules (missing the specific visual hierarchy and imagery mappings).

## J. Certificate Generation Readiness
**Status: Unknown/Incomplete**
- **Implemented:** A `/certificate` route exists.
- **Gaps:** No explicit PDF generation or canvas rendering library is installed in `package.json` to handle verifiable certificate downloads.

## K. Bilingual Architecture Parity
**Status: State-Sync Disconnect**
- **Implemented:** `LanguageContext` exists and successfully toggles translations locally via `localStorage`. The database contains dual-language columns (`title_en`, `title_pcm`, etc.).
- **Gaps:** `LanguageContext` does NOT sync with the `users.preferred_language` column in Supabase. This means the user's language preference is dropped across devices and cannot be reliably used by server components.

## L. Tailwind & Design Token Parity
**Status: Divergent**
- **Implemented:** Tailwind v4 is configured with base tokens in `globals.css`.
- **Gaps:** The border radii variables (`--radius-xl`) and structural utility classes diverge from the Stitch canonical source. The application uses excessive border rounding that contradicts the Stitch visual identity.

## M. Typography & Asset Parity
**Status: Broken**
- **Implemented:** Inter and Merriweather are loaded via `next/font/google`.
- **Gaps:** 
  1. **Typography:** Tailwind v4 `@theme` block maps `--font-serif` to `ui-serif`, but does not correctly ingest the CSS variable `--font-merriweather` injected by Next.js. Thus, Merriweather fails to render.
  2. **Assets:** Codebase references missing fallback images (e.g., `/hero_pos_owner.jpg`) instead of the recovered Stitch assets stored in `public/assets/smeshield/`.

## N. Hydration Strategy Review
**Status: Warning Present**
- **Implemented:** `suppressHydrationWarning` is added to the `<html>` and `<body>` tags in `layout.tsx`.
- **Gaps:** The `suppressHydrationWarning` tag is an acceptable mitigation for browser extension injection issues, but we must ensure no `Date.now()` or `Math.random()` inconsistencies exist in server-rendered components.

## O. Mock / Placeholder Audit
**Status: Mocks Found**
- `src/app/dashboard/page.tsx` contains hardcoded mock times: `const times = [5, 7, 6, 8, 5, 10]`.
- `src/app/api/reminders/route.ts` contains mocked integration responses for Twilio/SendGrid.
- `src/components/layout/Shell.tsx` contains a logo placeholder comment.

## P. Outstanding Tech Debt / Bugs
- **Database:** Modules 4-15 lack actual content (curriculum gap).
- **State Management:** `LanguageContext` must be upgraded to sync with Supabase `users` table.
- **Design System:** Merriweather font loading logic must be fixed in Tailwind v4 configuration. Image `src` paths across the app must be repointed to `public/assets/smeshield/*`.
