SMEShield — Product Requirements Document (v2.0)
SMEShield
A Bilingual, Adaptive Cybersecurity Awareness Training and Self-Assessment
Platform for Nigerian SMEs
Product Requirements Document (PRD)
Version 2.0 — Revised
Prepared by: Aruah Paul Ajirioghene (FOS/22/23/287477)
Department of Computer Science, Delta State University, Abraka
Academic Supervisor: Dr. Mrs. Chika Lillian Onyagu
Version 2.0 — August 2026
This revision supersedes v1.0. Changes: NDPA correction, expanded 15-module curriculum, dual invite
mechanism, revised authentication approach, UI/UX and security standards, brand identity direction, and an
adapted solo-development workflow.
Page 1

SMEShield — Product Requirements Document (v2.0)
1. Document Control
Field Detail
Project title Design and Implementation of a Web-Based Bilingual and Adaptive
Cybersecurity Awareness Training and Self-Assessment Platform for SMEs
in Nigeria
Product name SMEShield
Author / Developer Aruah Paul Ajirioghene
Supervisor Dr. Mrs. Chika Lillian Onyagu
Document status v2.0 — active development reference
Superseded v1.0 (referenced NDPR instead of NDPA; single-module-set scope; phone
OTP auth; no admin tooling)
2. Purpose and Background
SMEShield is the practical system component of a final-year Computer Science capstone
project, extending the seminar paper "The Human Firewall: Rethinking Network Security
Principles Beyond Technology." This document is the working reference for scope,
architecture, design standards, and priorities across the build, kept current as decisions are made
rather than fixed at project start.
3. Problem Statement and Goals
Nigerian SMEs, including informal and sole-proprietorship businesses such as POS agents,
market traders, and small service providers, face a growing and broadening range of human-
targeted cyber threats but lack affordable, localised, language-accessible training to counter
them. Existing platforms are enterprise-oriented, English-only, and generic.
3.1 Product Goals
• Reduce SME staff susceptibility to the major categories of human-targeted cyber threat
active in the Nigerian market, from phishing to SIM swap fraud to fake e-commerce
storefronts.
• Deliver training in a language the user is comfortable with.
• Give business owners visibility into where their organisation's security awareness is
weak.
• Keep the system inexpensive to run and maintain as a solo-developer project on free or
near-free infrastructure.
4. Objectives and Defence Demo Traceability
# Objective (as approved) Primary feature(s)
1 Web-based cybersecurity awareness training Core Next.js application; 15-module
platform library
2 Bilingual content system (English / Nigerian Parallel-content model; language toggle;
Pidgin) translator/auditor review workflow
3 Adaptive learning mechanism by business type Rule-based recommendation engine
Page 2

SMEShield — Product Requirements Document (v2.0)
# Objective (as approved) Primary feature(s)
4 Self-assessment system Quiz engine with scoring and weak-area
detection
5 User management with multiple roles Supabase Auth (Email + Google) + role
field (Business Owner, Employee, Sole
Entrepreneur)
6 Progress-tracking dashboard Per-user progress charts and completion
history
7 Monitoring interface for business owners Employee roster scoped to the owner's
own business
4.1 Rehearsed Demo Sequence (~12–15 minutes)
Step On-screen action Objective(s)
1 Landing page; toggle English ↔ Pidgin on homepage copy 2
2 Register as Business Owner; select business type 5
3 Complete baseline self-assessment 4
4 Dashboard shows business-type-specific recommended modules 3
5 Complete a module with language toggle; take the quiz; see instant score 1, 2
6 Progress dashboard: completed modules, score history over time 6
7 Invite a pre-seeded employee via 6-digit code; switch accounts; complete a 5
module
8 Return to Business Owner view; roster shows updated completion % 7
Seed at least one employee account before the defence so step 7 does not depend on live email
delivery.
5. User Roles
Role Description Key permissions
Business Owner Registers a business; manages employees Invite/remove own employees; view own
under that business only business's employee progress and risk
indicators; complete own training
Employee Joins a business via 6-digit join code or Complete assigned/recommended modules;
emailed invite link take self-assessments; view own progress
only
Sole Entrepreneur Independent user, no organisation attached Same training/self-assessment features as
Employee, scoped to themselves
There is no platform-wide administrator role or in-app content dashboard for these three roles.
Content is authored through the codebase. A separate internal console exists outside this role
model — see Section 17.
6. Scope
6.1 In Scope
Page 3

SMEShield — Product Requirements Document (v2.0)
• 15+ bilingual training modules across the major categories of human-targeted cyber
threat relevant to Nigerian SMEs (full list in Section 13)
• Rule-based adaptive module recommendation by declared business type
• Self-assessment quizzes with immediate scoring and feedback
• Role-based accounts: Business Owner, Employee, Sole Entrepreneur
• Authentication via email/password and Google OAuth
• Dual employee-invite mechanism: business join code and targeted email invite
• Progress-tracking dashboards, per-user and per-business
6.2 Out of Scope
• Real-time threat detection or active defence mechanisms
• Phishing simulation campaigns
• AI-generated or ML-driven personalisation (recommendation logic is explicitly rule-
based)
• Phone/SMS OTP authentication — dropped due to SMS gateway cost; email and Google
OAuth cover this need without recurring cost
• Platform-wide administrator role or in-app content dashboard within the three assessed
user roles
• Full linguistic coverage of all Nigerian Pidgin variants — translations are authored
centrally and reviewed, not crowd-sourced
7. Functional Requirements
7.1 Onboarding and Account Management
• Register/sign in via email + password or Google OAuth
• Register as Business Owner, Employee (via join code or email invite), or Sole
Entrepreneur
• Select preferred language and business type at signup
• Complete a baseline self-assessment immediately after onboarding
7.2 Employee Invitations
• Each business is issued one persistent, regenerable 6-digit join code; an employee enters
it during their own signup to self-link to that business
• A Business Owner can also enter an employee's email directly; this sends a Brevo-
powered invite email containing a tokenised signup link tied to that specific invite record
• Both paths converge on the same employee_invites → business_id linkage
7.3 Training Modules
• Each module has parallel English and Pidgin content, toggled without leaving the page
• Modules are tagged by business type and threat category for the recommendation engine
• Module completion updates the user's progress record
7.4 Self-Assessment
• Each module ends with a short quiz, scored immediately
Page 4

SMEShield — Product Requirements Document (v2.0)
• Topics scoring below a defined threshold are flagged and resurfaced in future
recommendations
7.5 Dashboards
• Employee/Sole Entrepreneur: recommended modules, completion status, quiz history
• Business Owner: adds an employee roster with per-employee completion % and an
aggregate organisation risk indicator; empty state prompts inviting the first employee
rather than showing a blank table
7.6 Notifications
• Invitation emails, welcome emails, and completion confirmations sent via Brevo
8. Non-Functional Requirements
Category Requirement
Performance Core pages load under 3 seconds on typical Nigerian mobile 3G/4G; skeleton loaders
shown for any data fetch, not blank screens or spinners alone
Usability Mobile-first responsive design; minimum 16px body text; tap targets ≥44×44px;
uncluttered, card-based layouts with one primary action per screen
Accessibility WCAG 2.1 AA target: 4.5:1 minimum contrast, full keyboard navigation, visible
focus states, no reliance on colour alone for pass/fail or risk-level feedback
Security Session handled via httpOnly secure cookies (not client-readable localStorage); Row
Level Security enforced at the database layer for every role boundary; role checks
never trusted client-side alone; login attempts rate-limited; generic error messages on
failed login to prevent user enumeration
Password policy Minimum 8 characters with mixed character types, enforced server-side; live strength
indicator shown client-side
Privacy Data handling has regard to the Nigeria Data Protection Act 2023 (NDPA) — see
Section 16
Availability Hosted on managed infrastructure (Vercel + Supabase) requiring no manual server
maintenance
Maintainability Solo developer must be able to edit bilingual content directly in seed files without a
separate CMS
Connectivity resilience Current lesson content cached client-side so a dropped connection mid-module does
not lose progress
9. System Architecture and Technology Stack
9.1 High-Level Architecture
SMEShield follows a client-server web architecture. A Next.js frontend (React, TypeScript,
Tailwind CSS) is deployed on Vercel and communicates with Supabase for authentication, data,
and storage, with Row Level Security enforcing the role-based access model. Server-side logic
— sending email, applying adaptive recommendation rules, and all admin-console queries —
runs in Next.js API routes or Supabase Edge Functions, never in client-side code.
9.2 Stack Summary
Page 5

SMEShield — Product Requirements Document (v2.0)
Layer Choice Notes
Frontend framework Next.js (React, TypeScript) File-based routing, SSR, straightforward
i18n routing
Styling Tailwind CSS Rapid, consistent, mobile-first UI
development
Backend / database Supabase (PostgreSQL) Managed Postgres with Auth, Row Level
Security, and Storage
Authentication Supabase Auth — Email/Password + Phone OTP intentionally excluded (SMS
Google OAuth only gateway cost)
Session handling @supabase/ssr with httpOnly secure Replaces default localStorage session
cookies storage to prevent XSS-based session theft
Transactional email Brevo Employee invites, welcome messages,
notifications
Hosting (frontend) Vercel Auto-deploy on push to main
Hosting (backend) Supabase Cloud Managed Postgres, Auth, Storage
Version control Git + GitHub (private repository) See Section 19 for the adapted solo-
developer workflow
9.3 Adaptive Recommendation Logic
Deliberately rule-based, not machine-learning-based. Business type sets an initial weighted
module list at registration; self-assessment results re-weight topics scoring below threshold
upward in the next recommendation set. Transparent and defensible at oral examination.
10. Data Model (Preliminary)
Draft entity outline for planning; to be formalised into a normalised schema, ER diagram, and
data dictionary in Chapter Three.
Entity Key fields
users id, role, business_id (nullable), business_type, preferred_language, auth_provider,
created_at
businesses id, owner_id, name, business_type, join_code (6-digit, regenerable)
modules id, title_en, title_pcm, content_en, content_pcm, translation_status,
business_type_tags, threat_category
quiz_questions id, module_id, question_en, question_pcm, translation_status, options,
correct_answer
user_progress user_id, module_id, status, score, completed_at
assessment_results id, user_id, attempt_date, score, weak_areas
employee_invites id, business_id, method (code | email), email (nullable), token (nullable), status,
invited_at
11. UI/UX Design System
11.1 Brand Identity
Page 6

SMEShield — Product Requirements Document (v2.0)
Primary colour: deep trust-blue, carrying the brand across the interface. Secondary colour: a
distinct green, reserved specifically for genuine positive/protected states (module completion,
correct answers) so it is never diluted into ordinary button chrome. Semantic feedback colours
(success, warning, danger) are kept visually separate from both brand colours so risk indicators
and quiz feedback are never confused with branding.
A draft logo concept (shield + upward arrow, in the primary/secondary palette) has been
produced but currently mis-renders the wordmark as "SMESHEILD." This must be corrected
— either regenerated or reset as vector text — before it appears in the report, defence slides,
or the live site.
11.2 Hero Section
A cinematic hero video has been produced depicting a Nigerian shop owner at her POS counter,
with a shield materialising around her as a threat is visualised, resolving into the platform's
English/Pidgin toggle. Implementation requirements: compress to under ~1.5MB, provide a
WebM/MP4 pair, autoplay muted and looped only on larger screens or unmetered connections,
serve a static poster frame on mobile/slow connections, and respect the prefers-reduced-motion
setting by freezing on the poster frame.
11.3 Landing Page Flow (Header → Footer)
• Header — logo, language toggle, Login / Sign Up
• Hero — one-line value proposition, primary CTA ("Start Free Training"), hero
video/poster
• The problem — grounded Nigerian SME cyber-risk statistics
• How it works — 3-step visual: sign up → recommended training → track progress
• Who it's for — Business Owner / Employee / Sole Entrepreneur cards
• Feature highlights — bilingual delivery, adaptive learning, self-assessment
• Final CTA — repeat sign-up prompt
• Footer — quick links, language toggle, contact, academic project credit line
11.4 Interaction and Layout Standards
• Skeleton loaders (not spinners or blank screens) on any client-side data fetch
• One primary action per screen; card-based module browsing; tables reserved for the
employee roster
• Inline, plain-language field-level form errors — never a toast that can vanish before it's
read
• Meaningful empty states that prompt action (e.g. a new Business Owner is invited to add
their first employee, not shown a blank table)
• No dark mode in v1 — deprioritised in favour of core functionality and QA time
12. Bilingual Content and Translation Workflow
Every module and quiz question is authored in parallel English and Pidgin fields (content_en /
content_pcm) directly in seed data, each carrying a translation_status of draft, reviewed, or
approved. Draft translations are produced first; the developer audits and corrects them post-
build through direct Supabase table edits or guided SQL updates, with the least confident
translations flagged in advance for priority review. This division of labour — centralised
authored drafts, developer-led audit and correction — is documented here as the intended
pipeline rather than left implicit.
Page 7

SMEShield — Product Requirements Document (v2.0)
13. Training Content Curriculum (MVP: 15 Modules)
Expanded beyond the five threats covered in the seminar paper to give broader coverage of the
threat landscape actually facing Nigerian SMEs, down to market traders using only a
smartphone and a POS device. All lesson content and quiz questions are authored originally,
synthesising current reporting rather than reproducing any source directly.
# Module Focus
1 Phishing & Fake Alerts Impersonation of banks/agencies via SMS/email
2 Fake Payment / "Flash Funds" Scams Forged transaction alerts, unverified screenshots
3 Ransomware Malicious attachments, data lockout
4 Social Media & WhatsApp Account Takeover Fake platform-support messages
5 USB Malware & Keyloggers Shared/cybercafé device risks
6 SIM Swap Fraud OTP/identity hijack via telecom fraud
7 POS/Agent Banking Fraud Chargeback and reversal scams targeting agents
8 Weak Passwords & Credential Reuse Account compromise fundamentals
9 Unpatched Apps & Outdated Devices Exploitable software gaps
10 Public/Unsecured Wi-Fi Risks Shared market/cybercafé networks
11 Business Email Compromise & Fake Invoices Supplier/payment impersonation
12 Fake/Cloned Online Store Scams Counterfeit storefronts and checkout pages
13 Voice Phishing & AI Voice-Clone Scams Emerging deepfake-audio fraud
14 QR Code Scams ("Quishing") Malicious QR redirection
15 Device Theft/Loss & Lack of Backups Data continuity risk
An optional 16th module — Insider Threats & Shared-Device Data Misuse — may be added if
time permits, relevant to family-run shops and cybercafés where multiple people use one login.
14. Third-Party Integrations
Integration Purpose Notes
Supabase Auth, database, Row Level Security, file Central backend; RLS is the enforcement
storage point for all role boundaries, including the
admin console's isolation
Brevo Transactional email (invites, welcome, Called server-side only; API key never
notifications) exposed to the client
Vercel Frontend hosting and CI/CD Auto-deploy from GitHub on push to main
Google OAuth Sign-in provider Configured directly in Supabase Auth
GitHub Version control and reproducibility record Private repository; see Section 19 for
workflow
15. Testing and Evaluation Plan
Page 8

SMEShield — Product Requirements Document (v2.0)
Testing follows unit, integration, and user-acceptance levels, documented with a structured test-
case table (ID, input, expected output, actual output, pass/fail) per the project guide. User-
acceptance testing will be conducted informally with a small group of peers rather than actual
target-market SME staff; this limitation is stated honestly in Chapters Four and Five rather than
obscured.
• Unit testing: adaptive recommendation function, quiz scoring, password policy
validation
• Integration testing: Supabase Auth/RLS behaviour under each of the three roles, and
isolation of the admin console from them
• User-acceptance testing: informal walkthroughs of registration-to-assessment flow with
peer testers
16. Security and Privacy Considerations
• Data handling has regard to the Nigeria Data Protection Act 2023 (NDPA), which
superseded the earlier NDPR framework, and to baseline principles of lawful, fair,
transparent processing limited to a specific stated purpose
• Authentication and password handling fully delegated to Supabase Auth
• Sessions stored in httpOnly secure cookies via @supabase/ssr, not in client-accessible
localStorage — closes an XSS-based session-theft path that would be a notable
weakness for a platform that teaches cybersecurity
• Row Level Security enforces that Employees cannot read another employee's data,
Business Owners cannot read data outside their own business, and only the developer's
seeded admin account can reach admin-console data
• No role or permission check is trusted client-side alone; every boundary is re-enforced
server-side or at the database layer
• Login attempts are rate-limited; failed-login messages are generic to prevent user
enumeration
• All traffic served over HTTPS; secrets (Brevo key, Supabase service role key) never
committed to the repository or exposed client-side
17. Internal Tooling: Super Admin Console (Outside Academic
Scope)
A separate, developer-only console provides real-time visibility across all businesses,
employees, and sole entrepreneurs on the platform — new signups, module completions, quiz
attempts, and translation review, surfaced live via Supabase Realtime subscriptions on the
relevant tables. This tool is deliberately outside the three-role model assessed in the project
report and is not presented as a platform feature during evaluation.
17.1 Architectural Isolation
• Built as a physically separate lightweight Next.js application on its own subdomain,
sharing only the Supabase backend — not a hidden route inside the main SMEShield
codebase
• A single seeded admin account, checked against a specific Supabase Auth user ID rather
than a discoverable 'role' field
• All admin queries run server-side using the Supabase service role key, never exposed to
any browser
Page 9

SMEShield — Product Requirements Document (v2.0)
17.2 Scope Discipline
• v1 of the console is limited to a recent-activity feed, basic per-business filtering, and the
bilingual translation review screen
• Additional analytics are deliberately deferred — this tool is not graded and should not
compete with the assessed platform for development time
17.3 Reporting and Defence Framing
One low-key sentence will be included in the project report's scope or limitations section: that
a developer-facing operational console exists outside the three assessed user roles for content
administration and monitoring, and is outside the scope of this evaluation. This protects against
the appearance of concealment if the second subdomain is ever noticed, without inviting
extended discussion at defence.
18. Development Workflow (Adapted for Claude.ai Web, No Claude
Code)
Development takes place through the Claude.ai web chat interface's code sandbox rather than
a persistent local Claude Code environment. The sandbox filesystem resets between sessions,
so version-control continuity is preserved deliberately:
• A git repository is initialised inside the working sandbox from the first build session and
committed to incrementally within each session
• At the end of each session, the project folder — including its .git history — is packaged
as a downloadable archive
• At the start of the next session, the archive is re-uploaded so work (and its commit
history) continues from where it left off
• The developer periodically pushes the accumulated local history to a private GitHub
repository using their own authenticated git/GitHub credentials — Claude never holds or
requests account passwords or long-lived tokens
• Vercel is connected directly to the GitHub repository for automatic deployment on push
to main
• Secrets (.env values) are set only in Vercel's environment variable dashboard and
Supabase project settings, never committed to the repository
If the developer later gains access to Claude Code (terminal, IDE extension, or desktop app),
the same repository can be opened there directly for a fully persistent, locally-authenticated
workflow with no change to the underlying project structure.
19. Risks and Assumptions
Risk / Assumption Mitigation
Solo developer, fixed academic timeline, 15- Freeze the module list; build one module fully end-to-end
module curriculum is substantial as a template before replicating; adaptive logic stays rule-
based, not ML
No persistent local dev environment (free Session-based archive export/re-import preserves git
Claude.ai web tier) history; developer handles final GitHub pushes
Pidgin translation quality/coverage Draft/reviewed/approved status per module; developer
audit pass before any translation is marked approved
Page 10

SMEShield — Product Requirements Document (v2.0)
Risk / Assumption Mitigation
Testing not done with real SME staff Stated explicitly as a limitation in Chapter Five; proposed
as future work
Admin console scope creep v1 deliberately minimal; explicitly out of graded scope
20. Development Milestones
Phase Deliverable
1 Supabase project setup: schema, Auth (Email + Google), RLS policies, session cookie
handling
2 Core Next.js app shell, language toggle, role-based routing, brand palette applied
3 First module built end-to-end (content, quiz, translations) as the template; remaining 14
modules follow
4 Adaptive recommendation logic and progress tracking
5 Employee invite flow (join code + email) and Business Owner monitoring dashboard
6 Super admin console (internal tooling, separate app)
7 Testing (unit, integration, informal UAT) and Chapter Four write-up
8 Polish, deployment, defence demo rehearsal
21. Success Metrics
• All seven approved objectives are demonstrable in a live, rehearsed defence walkthrough
• A test user completes registration through to a scored module without developer
intervention
• Role-based access is verifiably enforced, including admin-console isolation
• All 15 modules render correctly in both English and Pidgin
• Both employee-invite methods (code and email) successfully link an account to a
business
Page 11
