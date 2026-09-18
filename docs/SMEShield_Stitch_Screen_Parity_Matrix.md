# SMEShield — Stitch Screen Parity Matrix

## Authoritative Sources
1. **SMEShield PRD** (Functional Requirements)
2. **DESIGN.md** (Canonical Design System)
3. **Google Stitch Project** (Actual Screen Designs)
4. **Current Implementation** (Audited Codebase)

---

## 1. Landing Page (Desktop)
1. **Screen Number:** 1
2. **Exact Stitch Screen Name:** SMEShield — Landing Page
3. **Stitch Screen ID:** `7ca9687b722a464bbc990fbe4772ff57`
4. **User Role:** Unauthenticated / Visitor
5. **Route Intended by Product:** `/`
6. **Desktop/Mobile:** Desktop
7. **Corresponding Current Route:** `src/app/(public)/page.tsx`
8. **Exists?:** YES
9. **Structural Fidelity:** MEDIUM
10. **Typography Fidelity:** LOW (Merriweather failing to load)
11. **Colour Fidelity:** MEDIUM (Primary `#1A2B48` used, but some tertiary accents missing)
12. **Spacing Fidelity:** MEDIUM (Gutter margins inconsistent)
13. **Component Fidelity:** LOW (Header navigation and CTA styling deviate from Stitch)
14. **Image Fidelity:** NONE (Stitch Hero image missing, placeholder/generic styling used)
15. **Content Fidelity:** HIGH (Pidgin translations mostly present)
16. **Responsive Fidelity:** LOW (Mobile components spill over without proper breakpoints)
17. **Functional Fidelity:** HIGH (Language toggle exists)
18. **Accessibility Fidelity:** LOW (Focus rings missing on CTAs)
19. **Exact Missing Elements:** Stitch background image, proper Merriweather font loading, exact spacing variables.
20. **Exact Correction Required:** Import Merriweather from `next/font`, apply exact grid layout to hero section, replace background with Stitch image.

---

## 2. Landing Page (Mobile)
1. **Screen Number:** 2
2. **Exact Stitch Screen Name:** SMEShield — Landing Page (Mobile)
3. **Stitch Screen ID:** `3f67ede970fa40b4888bc1e0c7ed01ac`
4. **User Role:** Unauthenticated / Visitor
5. **Route Intended by Product:** `/` (Mobile View)
6. **Desktop/Mobile:** Mobile
7. **Corresponding Current Route:** `src/app/(public)/page.tsx`
8. **Exists?:** YES
9. **Structural Fidelity:** LOW
10. **Typography Fidelity:** LOW (Missing mobile scaling for display headings)
11. **Colour Fidelity:** MEDIUM
12. **Spacing Fidelity:** LOW (16px outer gutters not strictly enforced)
13. **Component Fidelity:** LOW (Mobile menu / hamburger navigation missing or broken)
14. **Image Fidelity:** NONE (Missing hero image optimization for mobile)
15. **Content Fidelity:** MEDIUM
16. **Responsive Fidelity:** LOW (Desktop layout merely squished instead of stacked)
17. **Functional Fidelity:** MEDIUM
18. **Accessibility Fidelity:** LOW (Touch targets < 44px)
19. **Exact Missing Elements:** Dedicated mobile menu, properly sized tap targets, optimized hero image.
20. **Exact Correction Required:** Implement mobile hamburger menu, increase touch targets to `2.75rem`, adjust hero typography to `display-lg-mobile`.

---

## 3. Login (Desktop)
1. **Screen Number:** 3
2. **Exact Stitch Screen Name:** SMEShield — Login (Desktop)
3. **Stitch Screen ID:** `27375b164bd94e09a46ee286aa7b50f7`
4. **User Role:** Unauthenticated
5. **Route Intended by Product:** `/login`
6. **Desktop/Mobile:** Desktop
7. **Corresponding Current Route:** `src/app/(auth)/login/page.tsx`
8. **Exists?:** YES
9. **Structural Fidelity:** MEDIUM
10. **Typography Fidelity:** LOW (Merriweather failing)
11. **Colour Fidelity:** HIGH
12. **Spacing Fidelity:** MEDIUM
13. **Component Fidelity:** MEDIUM (Inputs have 8px border-radius, but focus rings missing)
14. **Image Fidelity:** NONE (Side panel background image missing)
15. **Content Fidelity:** HIGH
16. **Responsive Fidelity:** MEDIUM
17. **Functional Fidelity:** HIGH
18. **Accessibility Fidelity:** MEDIUM
19. **Exact Missing Elements:** Side panel imagery, focus rings on inputs, inline error styling (currently using generic styling).
20. **Exact Correction Required:** Add Stitch background image to split layout, fix focus rings.

---

## 4. Sign Up (Desktop)
1. **Screen Number:** 4
2. **Exact Stitch Screen Name:** SMEShield — Sign Up (Desktop)
3. **Stitch Screen ID:** `89fec5f7225f48d494685ed7b25392e5`
4. **User Role:** Unauthenticated
5. **Route Intended by Product:** `/register`
6. **Desktop/Mobile:** Desktop
7. **Corresponding Current Route:** `src/app/(auth)/register/page.tsx`
8. **Exists?:** YES
9. **Structural Fidelity:** MEDIUM
10. **Typography Fidelity:** LOW
11. **Colour Fidelity:** HIGH
12. **Spacing Fidelity:** MEDIUM
13. **Component Fidelity:** MEDIUM
14. **Image Fidelity:** NONE
15. **Content Fidelity:** HIGH
16. **Responsive Fidelity:** MEDIUM
17. **Functional Fidelity:** MEDIUM (Dual invite mechanism missing)
18. **Accessibility Fidelity:** MEDIUM
19. **Exact Missing Elements:** Employee 6-digit join code input toggle, Google OAuth styling exact match, image panel.
20. **Exact Correction Required:** Implement UI toggle for "Join with Code", add Stitch image to side panel, apply exact OAuth button styles.

---

## 5. How It Works (Desktop)
1. **Screen Number:** 5
2. **Exact Stitch Screen Name:** SMEShield — How It Works (Desktop)
3. **Stitch Screen ID:** `f7d394f17e9640519469245aab2dfae9`
4. **User Role:** Unauthenticated
5. **Route Intended by Product:** `/how-it-works`
6. **Desktop/Mobile:** Desktop
7. **Corresponding Current Route:** N/A
8. **Exists?:** NO
9. **Structural Fidelity:** NONE
10. **Typography Fidelity:** NONE
11. **Colour Fidelity:** NONE
12. **Spacing Fidelity:** NONE
13. **Component Fidelity:** NONE
14. **Image Fidelity:** NONE
15. **Content Fidelity:** NONE
16. **Responsive Fidelity:** NONE
17. **Functional Fidelity:** NONE
18. **Accessibility Fidelity:** NONE
19. **Exact Missing Elements:** The entire screen and route.
20. **Exact Correction Required:** Create `src/app/(public)/how-it-works/page.tsx` and implement the 12-column layout.

---

## 6. How It Works (Mobile)
1. **Screen Number:** 6
2. **Exact Stitch Screen Name:** SMEShield — How It Works (Mobile)
3. **Stitch Screen ID:** `4a7cf00b1d2c410cbd0d7d662cf668c6`
4. **User Role:** Unauthenticated
5. **Route Intended by Product:** `/how-it-works` (Mobile View)
6. **Desktop/Mobile:** Mobile
7. **Corresponding Current Route:** N/A
8. **Exists?:** NO
9. **Structural Fidelity:** NONE
10. **Typography Fidelity:** NONE
11. **Colour Fidelity:** NONE
12. **Spacing Fidelity:** NONE
13. **Component Fidelity:** NONE
14. **Image Fidelity:** NONE
15. **Content Fidelity:** NONE
16. **Responsive Fidelity:** NONE
17. **Functional Fidelity:** NONE
18. **Accessibility Fidelity:** NONE
19. **Exact Missing Elements:** The entire screen.
20. **Exact Correction Required:** Implement responsive mobile layout inside `/how-it-works/page.tsx`.

---

## 7. Onboarding: Role & Business Type (Mobile)
1. **Screen Number:** 7
2. **Exact Stitch Screen Name:** Onboarding: Role & Business Type (Mobile)
3. **Stitch Screen ID:** `7f316dfd9f914fc9bfa6f287ad104fdb`
4. **User Role:** Authenticated (New User)
5. **Route Intended by Product:** `/onboarding`
6. **Desktop/Mobile:** Mobile (and responsive Desktop)
7. **Corresponding Current Route:** `src/app/onboarding/page.tsx`
8. **Exists?:** YES
9. **Structural Fidelity:** HIGH
10. **Typography Fidelity:** LOW (Font mismatch)
11. **Colour Fidelity:** HIGH
12. **Spacing Fidelity:** MEDIUM
13. **Component Fidelity:** HIGH (Card selection component used)
14. **Image Fidelity:** N/A
15. **Content Fidelity:** HIGH
16. **Responsive Fidelity:** HIGH
17. **Functional Fidelity:** HIGH
18. **Accessibility Fidelity:** HIGH
19. **Exact Missing Elements:** Typography scale is slightly off, specific Stitch icons may mismatch Material Symbols.
20. **Exact Correction Required:** Update font families and weight, verify icons match `DESIGN.md`.

---

## 8. Business Owner Dashboard
1. **Screen Number:** 8
2. **Exact Stitch Screen Name:** Business Owner Dashboard
3. **Stitch Screen ID:** `b4506d3620524fe1ba4ce22040988037`
4. **User Role:** Business Owner
5. **Route Intended by Product:** `/dashboard`
6. **Desktop/Mobile:** Desktop
7. **Corresponding Current Route:** `src/app/dashboard/page.tsx`
8. **Exists?:** YES
9. **Structural Fidelity:** MEDIUM (Missing 8-column/4-column sidebar split)
10. **Typography Fidelity:** LOW
11. **Colour Fidelity:** MEDIUM (Incorrect use of semantic green on non-safe states)
12. **Spacing Fidelity:** MEDIUM
13. **Component Fidelity:** LOW (Radius too large, shadow levels incorrect)
14. **Image Fidelity:** NONE (Missing headshot image)
15. **Content Fidelity:** MEDIUM (Missing empty state for employee roster)
16. **Responsive Fidelity:** MEDIUM
17. **Functional Fidelity:** LOW (Roster doesn't work, progress hardcoded)
18. **Accessibility Fidelity:** MEDIUM
19. **Exact Missing Elements:** Portrait headshot image, empty state prompt for roster, specific Stitch data visualization components, 12px card border-radius.
20. **Exact Correction Required:** Refactor layout to 8-col/4-col split, add empty state CTA for roster, insert correct image assets.

---

## 9. Employee Learner Dashboard (Mobile)
1. **Screen Number:** 9
2. **Exact Stitch Screen Name:** Employee Learner Dashboard (Mobile)
3. **Stitch Screen ID:** `1029093208604407b271a041baecaeda`
4. **User Role:** Employee / Sole Entrepreneur
5. **Route Intended by Product:** `/dashboard` (Mobile View)
6. **Desktop/Mobile:** Mobile
7. **Corresponding Current Route:** `src/app/dashboard/page.tsx`
8. **Exists?:** YES (partially via shared route)
9. **Structural Fidelity:** MEDIUM
10. **Typography Fidelity:** LOW
11. **Colour Fidelity:** HIGH
12. **Spacing Fidelity:** MEDIUM
13. **Component Fidelity:** LOW (Card layout on mobile scales improperly)
14. **Image Fidelity:** NONE
15. **Content Fidelity:** HIGH
16. **Responsive Fidelity:** MEDIUM
17. **Functional Fidelity:** LOW (Progress is mocked)
18. **Accessibility Fidelity:** MEDIUM
19. **Exact Missing Elements:** Missing specialized mobile layout cards.
20. **Exact Correction Required:** Adjust mobile breakpoints, reduce card padding on mobile to match Stitch.

---

## 10. Baseline Assessment Question (Mobile)
1. **Screen Number:** 10
2. **Exact Stitch Screen Name:** Baseline Assessment Question (Mobile)
3. **Stitch Screen ID:** `0626880a79cd49ed9d9706b1b00d964c`
4. **User Role:** Authenticated (New User)
5. **Route Intended by Product:** `/assessment`
6. **Desktop/Mobile:** Mobile
7. **Corresponding Current Route:** `src/app/assessment/page.tsx`
8. **Exists?:** YES (Partially)
9. **Structural Fidelity:** MEDIUM
10. **Typography Fidelity:** LOW
11. **Colour Fidelity:** HIGH
12. **Spacing Fidelity:** MEDIUM
13. **Component Fidelity:** HIGH (Radio selection tiles match PRD somewhat)
14. **Image Fidelity:** N/A
15. **Content Fidelity:** LOW (Only one question implemented instead of full assessment)
16. **Responsive Fidelity:** HIGH
17. **Functional Fidelity:** LOW (Immediate scoring incomplete)
18. **Accessibility Fidelity:** MEDIUM
19. **Exact Missing Elements:** Full question set, exact quiz UI states (Correct/Incorrect borders).
20. **Exact Correction Required:** Implement quiz logic to support multiple questions, apply correct semantic colors (`#10B981` / `#EF4444`) to answer states.

---

## 11. Training Module: Fake Payment & Flash Funds
1. **Screen Number:** 11
2. **Exact Stitch Screen Name:** Training Module: Fake Payment & Flash Funds
3. **Stitch Screen ID:** `e2ef86f49fd840c6a50f601ebe33cb27`
4. **User Role:** Authenticated
5. **Route Intended by Product:** `/training/[id]`
6. **Desktop/Mobile:** Desktop
7. **Corresponding Current Route:** `src/app/training/[id]/page.tsx`
8. **Exists?:** YES (For limited modules)
9. **Structural Fidelity:** MEDIUM
10. **Typography Fidelity:** LOW
11. **Colour Fidelity:** MEDIUM
12. **Spacing Fidelity:** MEDIUM
13. **Component Fidelity:** LOW
14. **Image Fidelity:** N/A
15. **Content Fidelity:** LOW (Content is sparse, dummy text used)
16. **Responsive Fidelity:** MEDIUM
17. **Functional Fidelity:** LOW (Quiz logic at end of module is incomplete)
18. **Accessibility Fidelity:** MEDIUM
19. **Exact Missing Elements:** Full narrative content, specific module header styling, interactive simulation elements.
20. **Exact Correction Required:** Flesh out content from DB, refactor header to use `Merriweather`, build the quiz attachment at the end.

---

## 12. Warm, professional portrait headshot...
1. **Screen Number:** 12
2. **Exact Stitch Screen Name:** Warm, professional portrait headshot of a friendly Nigerian business owner in Lagos...
3. **Stitch Screen ID:** `2962322b2017444083ffe3a49585e219`
4. **User Role:** Generic (Used across screens)
5. **Route Intended by Product:** N/A (Image Asset)
6. **Desktop/Mobile:** N/A
7. **Corresponding Current Route:** N/A
8. **Exists?:** NO
9. **Structural Fidelity:** NONE
10. **Typography Fidelity:** N/A
11. **Colour Fidelity:** N/A
12. **Spacing Fidelity:** N/A
13. **Component Fidelity:** N/A
14. **Image Fidelity:** NONE
15. **Content Fidelity:** N/A
16. **Responsive Fidelity:** N/A
17. **Functional Fidelity:** N/A
18. **Accessibility Fidelity:** N/A
19. **Exact Missing Elements:** The image asset `2962322b2017444083ffe3a49585e219` is missing.
20. **Exact Correction Required:** Extract/generate and apply this image to the Dashboard.

---

## 13. SMEShield Brand Logo
1. **Screen Number:** 13
2. **Exact Stitch Screen Name:** SMEShield Brand Logo
3. **Stitch Screen ID:** `ac29dda9847f4a1182b3537fa95fb3a6`
4. **User Role:** Generic
5. **Route Intended by Product:** N/A (SVG Asset)
6. **Desktop/Mobile:** N/A
7. **Corresponding Current Route:** Currently implemented as an inline SVG.
8. **Exists?:** YES
9. **Structural Fidelity:** HIGH
10. **Typography Fidelity:** N/A
11. **Colour Fidelity:** HIGH
12. **Spacing Fidelity:** HIGH
13. **Component Fidelity:** HIGH
14. **Image Fidelity:** HIGH
15. **Content Fidelity:** HIGH
16. **Responsive Fidelity:** HIGH
17. **Functional Fidelity:** HIGH
18. **Accessibility Fidelity:** HIGH
19. **Exact Missing Elements:** None.
20. **Exact Correction Required:** None, inline SVG is sufficient.

---

## IMAGE TRACKING

| Stitch Asset/Reference | Component Using It | Current Implementation Asset | Matches Exactly? | Retrievable? |
| --- | --- | --- | --- | --- |
| Landing Page Hero Background | Landing Page Hero | `hero_pos_owner_*.jpg` (Generic) | NO | YES (via URL/Generation) |
| Login / Sign Up Side Panel | Auth Layout | None | NO | YES |
| Nigerian Business Owner Portrait | Business Owner Dashboard | None | NO | YES (Stitch ID `2962322b2017444083ffe3a49585e219`) |

---

## FONT TRACKING

| Expected Font | Actual Rendered Font | Expected Weight | Actual Rendered Weight |
| --- | --- | --- | --- |
| Merriweather (Display/Headings) | System Sans-serif / UI Serif | 700 (Bold) | Variable / Normal |
| Inter (Body/Interface) | Inter (Google Font) | 400 / 600 / 700 | 400 / 600 / 700 (Matches) |

---

## CONTENT TRACKING

- **Headings:** Pidgin versions exist, but typography scale is broken.
- **Labels:** `label-sm` (12px) and `label-md` (14px) sizes are inconsistently applied.
- **Buttons:** Semantic colors generally applied, but missing focus rings. Green used incorrectly in some places.
- **Role Names:** "Business Owner", "Employee", "Sole Entrepreneur" are used correctly in DB and UI.
- **Module Names:** 12 of 15 modules are completely missing.
- **Score Terminology:** Mostly mocked.
- **Status Terminology:** "Protected", "Warning", "Critical" missing exact semantic badge styling.

---
