# SMEShield — Privacy, Terms, and Statutory Public Claims Audit

**Document Purpose:** Comprehensive statutory compliance audit reviewing the platform's public claims, legal documentation, personal data architecture, and regulatory alignment under the **Nigeria Data Protection Act (NDPA) 2023** and directives of the **Nigeria Data Protection Commission (NDPC)**.

---

## 1. Statutory Grounding & Ethical Compliance Statement

### 1.1 Academic and Regulatory Premise
SMEShield was engineered as a Master of Science research prototype at Delta State University, Abraka, to serve Nigerian Small and Medium Enterprises. As an educational cybersecurity platform handling user identifiers and training records, its implementation must embody the highest standards of digital ethics and statutory alignment.

### 1.2 Core Claim Standardization: "Privacy-Conscious by Design"
To maintain strict academic and legal honesty, SMEShield standardizes its public regulatory statement across all landing surfaces, headers, footers, and documentation:

> **Approved Standard Claim:**  
> *"Privacy-conscious by design, incorporating statutory data protection principles mandated by the Nigeria Data Protection Act (NDPA) 2023."*

> [!CAUTION]
> **Prohibited Unverified Claims:**  
> The platform does **not** claim to be *"NDPC Certified"*, *"Officially Licensed by the NDPC"*, or *"Accredited by the Federal Government of Nigeria"*. Such certifications require formal institutional registration and third-party Data Protection Compliance Organization (DPCO) filing, which are external to the scope of this postgraduate research project.

---

## 2. Personal Data Processing Inventory

In compliance with Section 24 of the NDPA 2023 (Principles of Personal Data Processing), SMEShield strictly implements **data minimization**. The platform records only data elements technically necessary to fulfill its educational mandate.

### Table 2.1: Data Elements, Storage Locations, and Legal Grounds

| Data Element | Storage Location | Processing Purpose | Statutory Legal Basis (NDPA 2023 §25) | Encryption & Protection |
| :--- | :--- | :--- | :--- | :--- |
| **User Full Name** | `public.users.full_name` | Learner identification on dashboards, certificates, and team rosters. | **Performance of Contract / Educational Service** | TLS 1.3 in transit; PostgreSQL RLS tenant-isolated. |
| **Email Address** | `auth.users.email`, `public.employee_invites` | Authentication identifier, password reset delivery, and organization invitations. | **Performance of Contract / Explicit Consent** | Hashed in Supabase Auth; RLS-restricted from unauthorized users. |
| **Password Hash** | `auth.users.encrypted_password` | Account credential verification. | **Security / Authentication Necessity** | Argon2 / bcrypt cryptographic hashing managed by Supabase. |
| **Enterprise Tenancy** | `public.businesses`, `public.users.business_id` | Associating employees with their SME organization. | **Explicit Consent / Join Code Execution** | Foreign key constraints; PostgreSQL RLS isolation. |
| **Language Preference** | `public.users.preferred_language`, Browser `localStorage` | Rendering UI and curriculum in English or Nigerian Pidgin. | **Legitimate Interest / User Preference** | Local browser storage & profile column. |
| **Diagnostic Baseline** | `public.baseline_results` | Identifying initial pre-training vulnerability areas. | **Educational Profiling / Explicit Consent** | Linked to user UUID; RLS allows only learner & verified employer. |
| **Quiz Attempts & Scores** | `public.assessment_results` | Calculating passing mastery ($\ge 80\%$) and module completion. | **Performance Evaluation** | RLS allows only learner & verified employer. |
| **Curriculum Progress** | `public.user_progress` | Tracking module status (`not_started`, `in_progress`, `completed`). | **Educational Tracking** | RLS isolated. |
| **Profile Photograph** | Supabase Storage (`avatars` bucket) | Personalized learner avatar display (optional). | **Consent** | Folder-level UUID RLS policy: `(storage.foldername(name))[1] = auth.uid()::text`. |

### Table 2.2: Data Elements Explicitly Excluded (Data Minimization)
The platform purposefully **refuses to collect**:
- Bank Verification Numbers (BVN) or National Identification Numbers (NIN).
- Credit/Debit Card Numbers, CVVs, or bank account PINs.
- Real-time GPS location tracking coordinates.
- Employee biometric data (fingerprint or facial geometry scans).

---

## 3. Audit of Legal Pages & Consent Implementation

### 3.1 Signup Consent Acknowledgement (`/signup`)
- **Implementation Reality:** In `src/app/(auth)/signup/page.tsx`, an accessible, unticked, required HTML checkbox (`terms_acknowledgement`) is enforced before account submission:
  ```html
  <input id="terms_acknowledgement" name="terms_acknowledgement" required type="checkbox" />
  <label for="terms_acknowledgement">
    I agree to the Terms of Use and acknowledge that I have read the Privacy Policy.
  </label>
  ```
- **Bilingual Implementation:** Dynamically toggles to Nigerian Pidgin:
  *"I agree to the Terms of Use and acknowledge say I don read the Privacy Policy."*
- **Live Linking:** Hyperlinks directly to `/terms` and `/privacy` in separate tabs without discarding form state.
- **OAuth Handling:** The Google OAuth sign-in container explicitly displays the legal agreement notice prior to button activation.

### 3.2 Privacy Policy Audit (`/privacy`)
- **Route:** `src/app/(public)/privacy/page.tsx`
- **Audit Finding:** Fully aligned with NDPA 2023 requirements. Accurately details:
  1. Statutory scope and definitions.
  2. The exact categories of data collected.
  3. Lawful bases under Section 25 of the NDPA 2023.
  4. User rights (Access, Rectification, Erasure, and Objection).
  5. Multi-tenant database security safeguards (PostgreSQL Row-Level Security).
  6. Functional contact channel (`privacy@smeshield.ng`).

### 3.3 Terms of Use Audit (`/terms`)
- **Route:** `src/app/(public)/terms/page.tsx`
- **Audit Finding:** Accurately states the educational boundary of the software:
  - Explicitly informs users that SMEShield is an **educational cybersecurity awareness and self-assessment tool**, not a real-time endpoint threat detection system or fraud insurer.
  - Clarifies that completion of curriculum modules and attainment of a Human Firewall Score does not guarantee absolute immunity against criminal social engineering attacks.
  - Establishes governing law as the Cybercrimes (Prohibition, Prevention, etc.) Act 2015 (as amended 2024) and the laws of the Federal Republic of Nigeria.

### 3.4 Cookie & Session Policy Audit (`/cookies`)
- **Route:** `src/app/(public)/cookies/page.tsx`
- **Audit Finding:**
  - **No Third-Party Ad Trackers:** Confirms that SMEShield does **not** deploy marketing pixels (Meta Pixel, Google AdSense, TikTok Ads) or cross-site tracking brokers.
  - **Essential Cookies Only:** Details the use of essential authentication cookies (`sb-*-auth-token`) set by `@supabase/ssr` to maintain encrypted session state, and local browser storage for language preferences (`smeshield_language`).
  - **Banner Policy:** Because the platform relies solely on strictly necessary session cookies and functional user preferences, it intentionally avoids intrusive and misleading "Accept All Marketing Cookies" popups, adhering to European and Nigerian Data Protection best practices.

---

## 4. Subprocessors and Cross-Border Data Transfers

Under Section 41–43 of the NDPA 2023 (Cross-Border Data Transfer), organizations must ensure that cloud infrastructure providers maintain adequate data protection safeguards.

| Third-Party Infrastructure Provider | Service Provided | Location / Jurisdiction | Safeguards & Security Posture |
| :--- | :--- | :--- | :--- |
| **Supabase Cloud (Supabase, Inc.)** | Managed PostgreSQL database, authentication, and encrypted object storage. | Cloud Infrastructure (AWS Frankfurt `eu-central-1` / Regional Nodes). | SOC 2 Type II certified; ISO 27001 compliant; AES-256 encryption at rest; TLS 1.3 in transit. |
| **Vercel, Inc.** | Serverless edge hosting and continuous application delivery. | Global Edge Network (Anycast Nodes). | SOC 2 Type II certified; automated HTTPS certificate provisioning; DDoS mitigation. |
| **Google LLC (Google Identity)** | OAuth 2.0 single sign-on (optional authentication). | Global Identity Infrastructure. | OpenID Connect standard; explicit user credential consent flow. |

---

## 5. Discrepancy Rectification & Language Directives

1. **Elimination of Overstated Badges:** Any legacy badge displaying "NDPC Accredited" or "NDPA Certified Platform" must be quarantined. The authorized wording is: **"NDPA 2023 Aligned Policy"** or **"Privacy-Conscious by Design"**.
2. **Clear Distinction Between Consent and Legal Necessity:** Account creation and educational metric storage are grounded in the *Performance of Contract* (delivering the service requested by the user), while business-employee linking relies on *Explicit Consent* via join code entry.
3. **Institutional Integrity:** Institutional references to Delta State University (DELSU) reflect academic supervision and research demonstration, rather than commercial commercialization or institutional endorsement by the university governing council.

---

## 6. Primary Legal Sources Consulted

1. **Federal Republic of Nigeria:** *Nigeria Data Protection Act (NDPA) 2023*, Official Gazette No. 119, Vol. 110, Act No. 9.
2. **Nigeria Data Protection Commission (NDPC):** *General Application and Implementation Directive (GAID)*, 2023/2024.
3. **National Information Technology Development Agency (NITDA):** *Nigeria Data Protection Regulation (NDPR) 2019* (Historical Foundation).
4. **National Cybersecurity Coordination Centre (NCCC) / ngCERT:** *National Cybersecurity Policy and Strategy (NCPS)*, Federal Republic of Nigeria.
