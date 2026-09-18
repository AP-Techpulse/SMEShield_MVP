# SMEShield — Stitch Duplicate & Variant Screens Report

This report outlines cases where the same logical page appears multiple times in the Google Stitch design, either as responsive variants or role-based structures.

## 1. Landing Page
- **Screen A:** SMEShield — Landing Page (Desktop)
- **Screen B:** SMEShield — Landing Page (Mobile)
- **Differences:** Screen A uses a multi-column horizontal grid. Screen B stacks elements into a single column.
- **Recommended Canonical Version:** Both are required. They form the canonical responsive pair for the public landing page.

## 2. How It Works
- **Screen A:** SMEShield — How It Works (Desktop)
- **Screen B:** SMEShield — How It Works (Mobile)
- **Differences:** Similar to the landing page, content is identical but reflowed for mobile viewports.
- **Recommended Canonical Version:** Both are required for responsive parity.

## 3. Dashboards
- **Screen A:** Business Owner Dashboard (Desktop)
- **Screen B:** Employee Learner Dashboard (Mobile)
- **Differences:** Screen A is a complex desktop UI featuring a left-hand side-nav, global metrics, and a "Team & Employees" section. Screen B is a simplified mobile UI focused entirely on individual progress (Personal Shield Score) without the team management features.
- **Recommended Canonical Version:** Both are canonical, but they expose a **critical architectural gap** in the Stitch design.
- **Reason / Action:** There is no "Business Owner Dashboard (Mobile)" nor an "Employee Learner Dashboard (Desktop)". The engineering implementation MUST infer and build these missing responsive states using the existing desktop/mobile design logic.

## 4. Incomplete Variants
The Stitch project heavily relies on single-viewport designs for several screens:
- **Login / Sign Up:** Desktop only. (Mobile variant missing).
- **Onboarding:** Mobile only. (Desktop variant missing).
- **Baseline Assessment:** Mobile only. (Desktop variant missing).
- **Training Module:** Desktop only. (Mobile variant missing).

**Conclusion:**
There are no redundant "duplicate" screens that conflict with each other. All repeated screens are responsive variants. However, the design architecture is incomplete, forcing the engineering team to extrapolate mobile-to-desktop and desktop-to-mobile layouts for 50% of the product.
