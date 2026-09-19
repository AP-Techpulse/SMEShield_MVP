# SMEShield — Authoritative Academic Screenshot Evidence & Capture Guide

**Document Purpose:** Complete, step-by-step visual evidence catalog and automated screenshot verification manual for the candidate (Aruah Paul Ajirioghene) documenting authentic, production-grade visual evidence from the live SMEShield platform for the **B.Sc. Final-Year Undergraduate Computer Science Project (Chapters 3 & 4)**, the **Oral Defence Presentation Slides**, and the **Interactive How It Works Product Tour**.

> [!IMPORTANT]
> **Source of Truth Directive:** Under no circumstances should Google Stitch UI mockups or outdated Phase 1/2 wireframes be included in the project report or presentation. Every screenshot is captured directly from the live, fully functional SMEShield application using the verified test accounts. Visual review can be conducted via the interactive contact sheet at `docs/report_figures/screenshot_contact_sheet.html`.

---

## 1. Capture Environment Setup & Redaction Protocol

### 1.1 Recommended Browser & Viewport Settings
- **Primary Desktop Viewport:** `1440 × 900 px` (or `1920 × 1080 px` scaled to 100% DPI). Use Google Chrome or Microsoft Edge with clean developer mode or standard browser window.
- **Mobile Responsive Viewport:** `390 × 844 px` (Apple iPhone 14/15/16 standard mobile viewport in Chrome DevTools Device Mode).
- **Zoom Level:** Exactly `100%`.
- **Browser Profile:** Use an Incognito/Private window or a dedicated clean profile to avoid third-party extension icons, bookmarks bars, or search history dropdowns.
- **Image Format:** PNG (lossless, 24-bit RGB) for maximum typographic sharpness.

### 1.2 Test Account Credentials & Roles
Use the verified academic test accounts configured in the live Supabase environment:

| User Role | Account Full Name | Registered Email | Assigned Business | Active Join Code | Role Context |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Business Owner** | Paul Aruah | `aruahpaul2022@gmail.com` | DELSU | `252429` | Enterprise administration, team readiness, roster oversight. |
| **Employee (Primary)** | EMPLOYEE 1 | `paularuah2024@gmail.com` | DELSU | `252429` | Linked workplace learner, baseline diagnostic, module completion. |
| **Employee (Secondary)** | EMPLOYEE 2 | `aptechpulse2025@gmail.com` | DELSU | `252429` | Linked workplace learner, newly onboarded team member. |
| **Sole Entrepreneur** | Benny Jane | `paularuah087@gmail.com` | *(None / Autonomous)* | N/A | Autonomous single-operator commercial merchant. |

### 1.3 Privacy & Personal Data Redaction Rules
- **Passwords & Tokens:** Never enter or display actual production passwords or authorization tokens in captured screenshots. (The password toggle eye icon should remain in masked mode `••••••••` where applicable).
- **Email Addresses:** The academic test account emails (`aruahpaul2022@gmail.com`, etc.) are approved demo handles. If any other personal emails appear, obscure them with a neutral blur or solid box before report insertion.
- **Phone Numbers / Banking Details:** SMEShield does not collect banking details; ensure no personal Nigerian bank account numbers or phone numbers appear in scenario form inputs during capture.

### 1.4 Non-Destructive First-Time Onboarding & Diagnostic Capture Protocol
> [!IMPORTANT]
> **Zero Database Reset Guarantee:** Do NOT reset the live Supabase database or delete your three primary academic test accounts (`aruahpaul2022@gmail.com`, `paularuah2024@gmail.com`, `paularuah087@gmail.com`). 
> 
> To safely capture screens that can only be viewed once during first-time onboarding (Role Selection, Business Workspace Setup, and Baseline Diagnostic):
> 1. Launch a **clean Incognito/Private browser window**.
> 2. Navigate to `http://localhost:3000/signup`.
> 3. Register a temporary disposable test account with any valid format (e.g. `temp.capture.owner@gmail.com` or `temp.demo.learner@gmail.com`) and an 8+ character password.
> 4. Upon registration, you are immediately routed to `/onboarding`.
> 5. Capture `[SHOT-ONB-01]` (Role Archetype Selection).
> 6. Select "Business Owner" to view the business workspace setup. Capture `[SHOT-ONB-02]`.
> 7. Proceed to the baseline diagnostic `/assessment` (or onboarding Step 4). Capture `[SHOT-ONB-04]`.
> 8. Close the Incognito window. The primary accounts and existing benchmark data in Supabase remain 100% intact and unaffected.

---

## 2. Master Screenshot Capture Catalog

---

### SECTION A: PUBLIC MARKETING & GATEWAY VIEWS

#### [SHOT-PUB-01] Landing Page Editorial Hero
- **Proposed Filename:** `public_landing_hero.png`
- **Application Route:** `/` (Unauthenticated)
- **Required Role:** Unauthenticated guest
- **Account State:** Logged out
- **Exact Viewport:** Desktop (`1440 × 900 px`), viewport top
- **Element to Capture:** Full header navigation bar, Newsreader editorial headline (*"Empowering Nigerian SMEs with Bilingual Cybersecurity Awareness"*), trust badge (*"Aligned with NDPA 2023 Principles"*), Primary CTA (*"Start Free Assessment"*), and right-hand security dial visual.
- **Intended Usage:** Report (Chapter 4, Section 4.2.1); Defence Presentation (Slide: System Public Interface); Landing documentation.
- **Suggested Academic Caption:** *Figure 4.1: SMEShield Public Landing Surface displaying bilingual value proposition and NDPA 2023 alignment.*
- **Redaction Required:** No.

#### [SHOT-PUB-02] How It Works Neutral Blueprint Overview
- **Proposed Filename:** `public_how_it_works_page.png`
- **Application Route:** `/how-it-works`
- **Required Role:** Unauthenticated guest
- **Account State:** Logged out
- **Exact Viewport:** Desktop (`1440 × 900 px`)
- **Element to Capture:** 8-step workflow container showing the neutral illustrated blueprint frames, role badges, and step-by-step onboarding-to-HFS guidance.
- **Intended Usage:** Report (Chapter 4, Section 4.2.2); Defence Presentation.
- **Suggested Academic Caption:** *Figure 4.2: Structured Eight-Step Workflow on the SMEShield Interactive Product Tour.*
- **Redaction Required:** No.

#### [SHOT-PUB-03] Authentication Portal (Login Gateway)
- **Proposed Filename:** `auth_login_gateway.png`
- **Application Route:** `/login`
- **Required Role:** Unauthenticated guest
- **Account State:** Logged out
- **Exact Viewport:** Desktop (`1440 × 900 px`)
- **Element to Capture:** Split-screen layout featuring authentic Nigerian SME contextual photography on the left and clean login form with email/password, show/hide password toggle, and Google OAuth on the right.
- **Intended Usage:** Report (Chapter 4, Section 4.2.3); Defence Presentation.
- **Suggested Academic Caption:** *Figure 4.3: Secure Authentication Gateway with split editorial layout and Google OAuth integration.*
- **Redaction Required:** No.

#### [SHOT-PUB-04] Registration Portal with Mandatory Terms Checkbox
- **Proposed Filename:** `auth_signup_terms_checkbox.png`
- **Application Route:** `/signup`
- **Required Role:** Unauthenticated guest
- **Account State:** Logged out
- **Exact Viewport:** Desktop (`1440 × 900 px`)
- **Element to Capture:** Signup form showing Name, Email, Password strength meter, Preferred Language selector, and the **mandatory unticked Terms of Use and Privacy Policy checkbox** (`terms_acknowledgement`) with live links.
- **Intended Usage:** Report (Chapter 4, Section 4.2.4); Defence Presentation (Slide: Legal & Statutory Compliance).
- **Suggested Academic Caption:** *Figure 4.4: User Account Creation interface showing bilingual selection and mandatory NDPA consent acknowledgement.*
- **Redaction Required:** No.

---

### SECTION B: MULTI-ROLE ONBOARDING & BASELINE DIAGNOSTIC

#### [SHOT-ONB-01] Role Archetype Selection
- **Proposed Filename:** `onboarding_role_selection.png`
- **Application Route:** `/onboarding` (Step 1)
- **Required Role:** Fresh signup / on boarding user
- **Account State:** Logged in before profile completion
- **Exact Viewport:** Desktop (`1440 × 900 px`)
- **Element to Capture:** The three selectable role cards: *Business Owner* (Lead team defense, track employee readiness), *Employee* (Join your company using a 6-digit code), and *Sole Entrepreneur* (Independent cybersecurity benchmark).
- **Intended Usage:** Report (Chapter 4, Section 4.3.1); Defence Presentation (Slide: Multi-Role Architecture).
- **Suggested Academic Caption:** *Figure 4.5: Multi-Role Archetype Selection during initial onboarding.*
- **Redaction Required:** No.

#### [SHOT-ONB-02] Business Owner Enterprise Setup Flow
- **Proposed Filename:** `onboarding_business_owner_setup.png`
- **Application Route:** `/onboarding` (Step 2 - Business Owner)
- **Required Role:** Business Owner
- **Account State:** `aruahpaul2022@gmail.com` (during onboarding or simulated in staging)
- **Exact Viewport:** Desktop (`1440 × 900 px`)
- **Element to Capture:** Enterprise registration form with Business Name (*DELSU*), Industry Sector dropdown (*Education & Training*), Employee Headcount selector, and State selection.
- **Intended Usage:** Report (Chapter 4, Section 4.3.2); How It Works Step 3 (`TOUR-03`).
- **Suggested Academic Caption:** *Figure 4.6: Business Owner Enterprise Registration interface generating automated join credentials.*
- **Redaction Required:** No.

#### [SHOT-ONB-03] Employee 6-Digit Join Code Flow
- **Proposed Filename:** `onboarding_employee_join_code.png`
- **Application Route:** `/onboarding` (Step 2 - Employee)
- **Required Role:** Employee
- **Account State:** Enrolled employee or fresh test account (showing input of code `252429`)
- **Exact Viewport:** Desktop (`1440 × 900 px`)
- **Element to Capture:** 6-digit join code input field with real-time enterprise validation banner displaying *"Verified Business: DELSU"*.
- **Intended Usage:** Report (Chapter 4, Section 4.3.3); Defence Presentation.
- **Suggested Academic Caption:** *Figure 4.7: Employee Workplace Association via 6-Digit Alphanumeric Join Code.*
- **Redaction Required:** No.

#### [SHOT-ONB-04] Baseline Diagnostic Assessment Questionnaire
- **Proposed Filename:** `onboarding_baseline_diagnostic.png`
- **Application Route:** `/onboarding` (Step 4) or `/assessment`
- **Required Role:** Any test role
- **Account State:** In-progress diagnostic
- **Exact Viewport:** Desktop (`1440 × 900 px`)
- **Element to Capture:** Diagnostic questionnaire card presenting a scenario-based question (e.g., Question 1 on Phishing/Fake SMS alerts) with four options and bilingual language selector.
- **Intended Usage:** Report (Chapter 3, Section 3.4.2 & Chapter 4, Section 4.3.4); How It Works Step 4 (`TOUR-04`).
- **Suggested Academic Caption:** *Figure 4.8: Pre-Training Diagnostic Baseline Assessment Interface.*
- **Redaction Required:** No.

---

### SECTION C: ROLE-BASED DASHBOARDS & HUMAN FIREWALL SCORE

#### [SHOT-DASH-01] Business Owner Operations Center
- **Proposed Filename:** `dashboard_business_owner_overview.png`
- **Application Route:** `/dashboard`
- **Required Role:** Business Owner
- **Account State:** Logged in as `aruahpaul2022@gmail.com`
- **Exact Viewport:** Desktop (`1440 × 900 px`)
- **Element to Capture:** Organization-wide dashboard displaying:
  - Header with enterprise name (*DELSU*) and persistent join code badge (`252429`).
  - Top Metric Cards: *Team Readiness Dial*, *Enrolled Staff Count*, *Average Quiz Mastery*, and *Pending Invites*.
  - **Owner Defense Track Card:** Showing the Owner's personal Human Firewall Score dial, completion percentage, and personal training CTA.
- **Intended Usage:** Report (Chapter 4, Section 4.4.1); Defence Presentation (Slide: Enterprise Monitoring); How It Works Step 5 (`TOUR-05`).
- **Suggested Academic Caption:** *Figure 4.9: Business Owner Command Dashboard featuring Team Readiness Metrics and Personal Defense Track.*
- **Redaction Required:** No.

#### [SHOT-DASH-02] Employee Learner Dashboard & Personal HFS Dial
- **Proposed Filename:** `dashboard_employee_learner_view.png`
- **Application Route:** `/dashboard`
- **Required Role:** Employee
- **Account State:** Logged in as `paularuah2024@gmail.com`
- **Exact Viewport:** Desktop (`1440 × 900 px`)
- **Element to Capture:** Employee dashboard displaying:
  - Personal **Human Firewall Score (HFS) radial gauge** with awareness label (*Strong* or *Aware*).
  - Mathematical breakdown banner: *(Coverage: 35%) + (Quiz Mastery: 65%)*.
  - Baseline comparison benchmark ($\Delta_{\text{Awareness}}$).
  - *Strongest Threat Topic* and *Priority Reinforcement Focus* cards.
- **Intended Usage:** Report (Chapter 4, Section 4.4.2); Defence Presentation (Slide: Human Firewall Scoring).
- **Suggested Academic Caption:** *Figure 4.10: Employee Learner Dashboard displaying the empirical Human Firewall Score formulation and diagnostic delta.*
- **Redaction Required:** No.

#### [SHOT-DASH-03] Sole Entrepreneur Autonomous Dashboard
- **Proposed Filename:** `dashboard_sole_entrepreneur_view.png`
- **Application Route:** `/dashboard`
- **Required Role:** Sole Entrepreneur
- **Account State:** Logged in as `paularuah087@gmail.com`
- **Exact Viewport:** Desktop (`1440 × 900 px`)
- **Element to Capture:** Sole entrepreneur dashboard emphasizing independent risk profiling, baseline comparison, and direct adaptive recommendations tailored to independent commercial operation.
- **Intended Usage:** Report (Chapter 4, Section 4.4.3); Defence Presentation.
- **Suggested Academic Caption:** *Figure 4.11: Sole Entrepreneur Autonomous Cybersecurity Benchmark Interface.*
- **Redaction Required:** No.

---

### SECTION D: TRAINING CURRICULUM, BILINGUAL LESSONS & QUIZZES

#### [SHOT-TRN-01] Training Curriculum Library & Adaptive Shelves
- **Proposed Filename:** `training_curriculum_library.png`
- **Application Route:** `/training`
- **Required Role:** Employee or Business Owner
- **Account State:** Logged in
- **Exact Viewport:** Desktop (`1440 × 900 px`)
- **Element to Capture:** 
  - Top shelf: **"Recommended For You"** displaying the top 4 dynamically prioritized modules with *"High Priority"* or *"Weak Area"* tags.
  - Bottom grid: All remaining modules with authentic photography thumbnails, progress status badges (*Completed*, *In Progress*, *Not Started*), and estimated duration.
- **Intended Usage:** Report (Chapter 4, Section 4.5.1); How It Works Step 6 (`TOUR-06`).
- **Suggested Academic Caption:** *Figure 4.12: Curriculum Training Library with dynamic rule-based priority recommendations.*
- **Redaction Required:** No.

#### [SHOT-TRN-02] Module Threat Syllabus Overview
- **Proposed Filename:** `training_module_overview.png`
- **Application Route:** `/training/[id]` (e.g., Module 1: Phishing or Module 2: Fake Payment Scams)
- **Required Role:** Any test role
- **Account State:** Logged in
- **Exact Viewport:** Desktop (`1440 × 900 px`)
- **Element to Capture:** Detailed syllabus header, threat category badge, estimated duration, list of 3 structured learning objectives, and *"Start Lesson"* CTA.
- **Intended Usage:** Report (Chapter 4, Section 4.5.2); Defence Presentation.
- **Suggested Academic Caption:** *Figure 4.13: Module Threat Overview and Structured Educational Objectives.*
- **Redaction Required:** No.

#### [SHOT-TRN-03] Interactive Lesson Viewer in Standard English
- **Proposed Filename:** `training_lesson_english.png`
- **Application Route:** `/training/[id]/lesson`
- **Required Role:** Any test role
- **Account State:** Logged in, Language set to English
- **Exact Viewport:** Desktop (`1440 × 900 px`)
- **Element to Capture:** Lesson reading interface displaying structured lesson protocols in formal English, the sticky language toggle bar set to *English*, authentic scenario image, and the Nigerian workplace scenario card (*Situation*, *Warning Signs*, *Risky Action*, *Safe Action*).
- **Intended Usage:** Report (Chapter 4, Section 4.5.3); How It Works Step 7 (`TOUR-07`).
- **Suggested Academic Caption:** *Figure 4.14: Structured Interactive Lesson delivered in Standard Nigerian English.*
- **Redaction Required:** No.

#### [SHOT-TRN-04] Interactive Lesson Viewer in Nigerian Pidgin
- **Proposed Filename:** `training_lesson_pidgin.png`
- **Application Route:** `/training/[id]/lesson`
- **Required Role:** Any test role
- **Account State:** Logged in, Language toggled to Nigerian Pidgin
- **Exact Viewport:** Desktop (`1440 × 900 px`), scrolled to exact same section as [SHOT-TRN-03]
- **Element to Capture:** Identical lesson section showing the language toggle switched to *Nigerian Pidgin*, demonstrating full cultural translation of the defensive protocols and workplace scenario in authentic, accessible Pidgin.
- **Intended Usage:** Report (Chapter 4, Section 4.5.4); Defence Presentation (Slide: Bilingual Pedagogical Innovation).
- **Suggested Academic Caption:** *Figure 4.15: The Same Curriculum Lesson dynamically toggled to Nigerian Pidgin, illustrating linguistic accessibility.*
- **Redaction Required:** No.

#### [SHOT-TRN-05] Scenario-Based Assessment Quiz
- **Proposed Filename:** `training_quiz_question_active.png`
- **Application Route:** `/training/[id]/quiz`
- **Required Role:** Any test role
- **Account State:** In-progress quiz
- **Exact Viewport:** Desktop (`1440 × 900 px`)
- **Element to Capture:** Active quiz question (e.g., Question 3 of 5), showing the scenario question stem, four clear radio choices, progress bar (e.g., 60%), and bilingual switch.
- **Intended Usage:** Report (Chapter 4, Section 4.5.5); Defence Presentation.
- **Suggested Academic Caption:** *Figure 4.16: Interactive Scenario-Based Quiz Assessment Interface.*
- **Redaction Required:** No.

#### [SHOT-TRN-06] Assessment Result & Mastery Certification (Passed $\ge 80\%$)
- **Proposed Filename:** `training_quiz_result_passed.png`
- **Application Route:** `/training/[id]/quiz` (Post-submission result view)
- **Required Role:** Any test role
- **Account State:** Quiz submitted with score $\ge 80\%$ (4/5 or 5/5)
- **Exact Viewport:** Desktop (`1440 × 900 px`)
- **Element to Capture:** Result summary card displaying green passing badge (*Passed - 100%* or *80%*), detailed question-by-question review with educational rationales, and updated HFS contribution notice.
- **Intended Usage:** Report (Chapter 4, Section 4.5.6); How It Works Step 8 (`TOUR-08`).
- **Suggested Academic Caption:** *Figure 4.17: Quiz Mastery Certification Card enforcing the 80% passing threshold with detailed rationale feedback.*
- **Redaction Required:** No.

---

### SECTION E: BUSINESS OWNER TEAM OVERSIGHT & COMPLIANCE

#### [SHOT-BO-01] Team Roster & Join Code Management
- **Proposed Filename:** `team_roster_overview.png`
- **Application Route:** `/dashboard/team`
- **Required Role:** Business Owner
- **Account State:** Logged in as `aruahpaul2022@gmail.com`
- **Exact Viewport:** Desktop (`1440 × 900 px`)
- **Element to Capture:**
  - 6-digit persistent SME join code card (`252429`) with one-click copy button.
  - Dispatched email invitation management drawer.
  - Active staff table showing enrolled employees (e.g., *EMPLOYEE 1*, *EMPLOYEE 2*), role, completion percentage, quiz average, and calculated individual HFS.
  - **"Export CSV Roster"** compliance action button.
- **Intended Usage:** Report (Chapter 4, Section 4.6.1); Defence Presentation (Slide: SME Compliance & Oversight).
- **Suggested Academic Caption:** *Figure 4.18: Business Owner Workforce Security Administration and Compliance Roster interface.*
- **Redaction Required:** Ensure only demo employee records are displayed.

#### [SHOT-BO-02] Individual Employee Detailed Security Drill-Down
- **Proposed Filename:** `team_employee_detail_view.png`
- **Application Route:** `/dashboard/team/[id]` (e.g., clicking on *EMPLOYEE 1*)
- **Required Role:** Business Owner
- **Account State:** Logged in as `aruahpaul2022@gmail.com`
- **Exact Viewport:** Desktop (`1440 × 900 px`)
- **Element to Capture:** Employee profile header, individual Human Firewall Score dial with formula breakdown, module-by-module completion checklist, passing quiz scores, and baseline diagnostic comparison.
- **Intended Usage:** Report (Chapter 4, Section 4.6.2); Defence Presentation.
- **Suggested Academic Caption:** *Figure 4.19: Individual Employee Cyber Defense Profile and Assessment History Drill-Down.*
- **Redaction Required:** No.

---

### SECTION F: MOBILE RESPONSIVENESS & TECHNICAL COMPLIANCE

#### [SHOT-MOB-01] Mobile Dashboard Viewport
- **Proposed Filename:** `mobile_dashboard_responsive.png`
- **Application Route:** `/dashboard`
- **Required Role:** Business Owner or Employee
- **Account State:** Logged in
- **Exact Viewport:** Mobile (`390 × 844 px`, iPhone 14/15/16)
- **Element to Capture:** Mobile dashboard demonstrating zero horizontal overflow, stacked metric cards, legible typography, and bottom-bar or mobile-drawer navigation.
- **Intended Usage:** Report (Chapter 4, Section 4.7.1); Defence Presentation (Slide: Mobile-First Architecture).
- **Suggested Academic Caption:** *Figure 4.20: Mobile-Responsive Dashboard Interface demonstrating layout adaptability on constrained viewports.*
- **Redaction Required:** No.

#### [SHOT-MOB-02] Mobile Bilingual Lesson & Quiz Interface
- **Proposed Filename:** `mobile_lesson_interactive.png`
- **Application Route:** `/training/[id]/lesson` or `/quiz`
- **Required Role:** Any test role
- **Account State:** Logged in
- **Exact Viewport:** Mobile (`390 × 844 px`)
- **Element to Capture:** Touch-optimized lesson viewer showing scenario cards and instant language toggle accessible via mobile thumb zone.
- **Intended Usage:** Report (Chapter 4, Section 4.7.2); Defence Presentation.
- **Suggested Academic Caption:** *Figure 4.21: Mobile Viewport Rendering of Interactive Bilingual Training Protocol.*
- **Redaction Required:** No.

---

## 3. Mandatory "How It Works" Asset Replacement Guide

The `/how-it-works` route currently displays high-craft illustrated blueprint frames awaiting real screenshot replacement. When the candidate captures the eight specific product tour screenshots, save them with the exact filenames below in:
`public/assets/smeshield/tour/`

| Tour Step | Standard Filename | Alternate Filename | Matching Capture ID | Interface Scene to Capture |
| :---: | :--- | :--- | :--- | :--- |
| **Step 1** | `tour-01.png` | `step-1-signup.png` | `[SHOT-PUB-04]` | Signup form with Terms & Privacy checkbox and language picker. |
| **Step 2** | `tour-02.png` | `step-2-role.png` | `[SHOT-ONB-01]` | Multi-role archetype selection cards (*Owner, Employee, Sole*). |
| **Step 3** | `tour-03.png` | `step-3-onboarding.png` | `[SHOT-ONB-02]` | Business setup (Owner) or 6-digit join code entry (Employee). |
| **Step 4** | `tour-04.png` | `step-4-diagnostic.png` | `[SHOT-ONB-04]` | 5-question baseline diagnostic assessment card. |
| **Step 5** | `tour-05.png` | `step-5-dashboard.png` | `[SHOT-DASH-01]` | Role command dashboard with readiness metrics & defense track. |
| **Step 6** | `tour-06.png` | `step-6-recommendations.png`| `[SHOT-TRN-01]` | Training library with dynamically prioritized recommendation shelf. |
| **Step 7** | `tour-07.png` | `step-7-lesson.png` | `[SHOT-TRN-03]` or `[04]` | Interactive lesson viewer showing bilingual toggle and scenario. |
| **Step 8** | `tour-08.png` | `step-8-quiz-hfs.png` | `[SHOT-TRN-06]` | Quiz mastery pass certification ($\ge 80\%$) and updated HFS dial. |

---

## 4. Post-Capture Verification Checklist

Before submitting the images for final compilation, the candidate should verify:
- [ ] All images are in PNG format and sharp at 100% display scaling.
- [ ] No browser extension icons, bookmarks bars, or inspection tools are visible.
- [ ] No actual user passwords or private authentication tokens are exposed.
- [ ] Exactly 8 images for the Product Tour are copied into `public/assets/smeshield/tour/`.
- [ ] Report screenshots are organized in a clean folder (e.g., `docs/report_figures/`) matching the catalog IDs.
