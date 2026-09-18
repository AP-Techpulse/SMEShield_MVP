# SMEShield Stitch Asset Manifest (PHASE 0B)

This document maps all original image assets recovered from the Google Stitch project screens. 
All recovered assets are stored locally in `public/assets/smeshield/`.

## Recovered Asset Inventory

| Screen | Component | Stitch Asset Reference | Expected Asset | Local File | Desktop/Mobile | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Landing Page | Brand Logo | `ac29dda9847f4a1182b3537fa95fb3a6` | SMEShield Brand Logo (SVG) | `public/assets/smeshield/icons/logo.svg` | Both | PASS |
| Landing Page | Hero Background | `AB6AXuBSoQqZJAOT57...` | Portrait of Nigerian business owner | `public/assets/smeshield/avatars/portrait.jpg` | Both | PASS |
| Login / Sign Up | Auth Side Panel | `AB6AXuB3OgbJt3n92b...` | Nigerian retail merchant at POS | `public/assets/smeshield/auth/side-panel.jpg` | Desktop | PASS |
| Dashboard | User Avatar Profile | `2962322b2017444083ffe3a49585e219` | Nigerian business owner portrait | `public/assets/smeshield/avatars/portrait.jpg` | Desktop | PASS |
| How It Works | Feature Hero | `AB6AXuB_PQcgh05R4W...` | Female boutique and POS shop owner | `public/assets/smeshield/hero/female-boutique-owner.jpg` | Both | PASS |
| How It Works | Scenario Context | `AB6AXuCvu8gHTZqENu...` | Grocery supermarket provision counter | `public/assets/smeshield/scenarios/grocery-pos.jpg` | Mobile | PASS |
| How It Works | Scenario Context | `AB6AXuAC_lZtp-2-9S...` | Logistics delivery rider outdoors | `public/assets/smeshield/scenarios/logistics-rider.jpg` | Mobile | PASS |
| Training Module | Fake Payment Hero | `AB6AXuB_rqhJZ5SJKF...` | Anxious cashier looking at a mobile phone | `public/assets/smeshield/modules/fake-payment-hero.jpg` | Both | PASS |
| Training Module | Logistics Scenario | `AB6AXuAwkQKIxH9sQ8...` | Logistics officer inspecting receipt | `public/assets/smeshield/scenarios/logistics-receipt.jpg` | Both | PASS |
| Training Module | POS Terminal Focus | `AB6AXuBcfcpyBIgpDy...` | Authentic payment POS terminal device | `public/assets/smeshield/scenarios/pos-terminal.jpg` | Both | PASS |
| Training Module | Fake SMS Simulation | `AB6AXuAzAqnJBDNufx...` | Smartphone displaying deceptive SMS | `public/assets/smeshield/scenarios/fake-sms.jpg` | Both | PASS |

---

## Exactness & Render Test Verification

**Status Definition:**
- **PASS:** The exact original asset was successfully retrieved directly from the Google Stitch interface and saved to the local directory without substitution.
- **BLOCKED:** The asset could not be retrieved. (Note: No assets were blocked; 100% of the required raster and vector assets were successfully recovered via `aida-public` paths and the screen HTML).

**Image Render Test Validation:**
Because this phase explicitly dictates `DO NOT MODIFY CODE` and `DO NOT MODIFY UI`, no Next.js `<Image />` or standard `<img>` tags in the existing codebase were altered. 
- A scan of the current implementation (e.g. `src/app/onboarding/page.tsx`) shows that the UI relies on incorrect local fallback images (e.g. `/onboarding_hero.jpg`) or entirely lacks image components on critical screens like Auth and Dashboard.
- All recovered images are successfully staged in `public/assets/smeshield/*`. 
- **Conclusion:** The assets **do not visibly render in the browser yet**, because updating the code imports and `src` paths is strictly prohibited in Phase 0B. They are prepared for immediate mapping during the implementation phase.
