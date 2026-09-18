# SMEShield — Stitch Navigation Audit

This document reviews the navigation structures found across the Stitch-generated screens.

## 1. Desktop Navigation (Authenticated)
Observed in: `Business Owner Dashboard`, `Training Module`
- **Global Header (Top Nav):**
  - Brand Logo (Home link implied)
  - Horizontal Links: `Dashboard`, `Training Library (15)`, `Baseline Assessment`, `Progress & Stats`, `Team & Employees (Org)`
  - Language Toggle (EN/Pidgin)
  - CTA: `Invite Staff`
  - Utility: `Notifications` (bell icon)
  - User Profile: Avatar + Name (e.g. Adebayo Ogunlesi) + Role Badge ("Owner"). **No dropdown menu, Profile link, Settings link, or Logout action is provided.**
- **Sidebar (Quick Modules):**
  - Shield Score progress widget
  - Links: `Overview`, `Threat Bulletins`, `Report Fraud`, `Certificates`
  - SME Helpline contact info.

## 2. Mobile Navigation (Authenticated)
Observed in: `Employee Learner Dashboard (Mobile)`
- **Header:**
  - Hamburger Menu Icon
  - Language Toggle
  - Notifications
  - User Avatar
- **Bottom Navigation (Appears in some contexts):**
  - Due to missing mobile dashboard for owners, the exact mobile navigation structure is inferred. 
  - Hamburger menu presumably contains the primary routing (Dashboard, Training, Progress), but it is a closed state in the Stitch screenshot.

## 3. Unauthenticated Navigation
Observed in: `Landing Page`, `How It Works`
- **Header:**
  - Links: `Features`, `How it Works`, `Testimonials`, `FAQ`
  - Language Toggle
  - Actions: `Log In` (Ghost), `Get Started` (Primary)

## 4. Identified Inconsistencies & Gaps
1. **Missing Account Management:** There is absolutely no way to access a "Settings" page, "Profile" page, or log out of the application in the Stitch designs.
2. **Dashboard Sidebar vs Top Nav:** The desktop authenticated header has a horizontal nav, BUT there is also a left sidebar with different links (`Threat Bulletins`, `Report Fraud`). This dual-navigation is complex and the mobile equivalent is completely undefined.
3. **Role Discrepancies:** The Business Owner Dashboard has "Team & Employees (Org)" in the top nav. The Employee Mobile Dashboard does not show the full nav, so we must assume it omits the Team section, but there is no explicit visual proof of the desktop employee navigation.
4. **Return Paths:** There are no "Back to Dashboard" buttons from within a Training Module. The only way back is clicking the top horizontal nav or logo.
