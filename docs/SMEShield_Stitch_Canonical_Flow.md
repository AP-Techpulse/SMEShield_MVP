# SMEShield — Stitch Canonical Flow

Based on the audit of the actual Google Stitch screens, the following represents the coherent, logically connected product flow.

## PUBLIC & AUTHENTICATION FLOW
```text
PUBLIC
├── Landing Page (Desktop: 7ca9687b... / Mobile: 3f67ede9...)
│   └── CTA: "Get Started" / "Log In"
├── How It Works (Desktop: f7d394f1... / Mobile: 4a7cf00b...)
│   └── Explains the SME framework and grants.
├── Login (Desktop: 27375b16...)
│   └── Leads to Dashboard
└── Sign Up (Desktop: 89fec5f7...)
    └── Leads to Onboarding
```

## ONBOARDING FLOW
```text
ONBOARDING
└── Role & Business Type (Mobile: 7f316dfd...)
    ├── Path A: Business Owner
    ├── Path B: Employee
    └── Path C: Sole Entrepreneur
```

## AUTHENTICATED FLOW (BUSINESS OWNER)
```text
BUSINESS OWNER DASHBOARD (Desktop: b4506d36...)
├── Overview (Shield Score, Quick Modules)
├── Team & Employees (Org Roster, Invite Staff CTA)
├── Training Library (15 Modules)
│   └── Module: Fake Payment & Flash Funds (Desktop: e2ef86f4...)
├── Baseline Assessment
│   └── Assessment Question (Mobile: 0626880a...)
└── Progress & Stats
```

## AUTHENTICATED FLOW (EMPLOYEE / SOLE ENTREPRENEUR)
```text
EMPLOYEE LEARNER DASHBOARD (Mobile: 10290932...)
├── Overview (Personal Shield Score)
├── Training Library (15 Modules)
│   └── Module: Fake Payment & Flash Funds (Desktop: e2ef86f4...)
├── Baseline Assessment
│   └── Assessment Question (Mobile: 0626880a...)
└── Progress & Stats
```

## IDENTIFIED ORPHAN SCREENS / DEAD ENDS
- **Profile / Settings / Logout:** There are no screens designed for user profile management or logging out in the Stitch project. The user profile icon exists in the header, but no dropdown or settings page is provided.
- **Module Results / Quiz Feedback:** The flow goes from Training Module to a presumed Quiz, but there are no "Quiz Results" or "Module Completed" screens.
- **Team & Employees View:** The Business Owner dashboard has a sidebar link to "Team & Employees", but there is no dedicated screen showing the full employee management table in Stitch.
