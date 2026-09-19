import puppeteer from 'puppeteer-core';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// 1. Read environment variables
const envContent = fs.readFileSync('.env.local', 'utf8');
const env = Object.fromEntries(
  envContent.split('\n')
    .filter(l => l.includes('='))
    .map(l => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()])
);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
const sbAdmin = createClient(supabaseUrl, serviceKey);

const BASE_URL = 'http://localhost:3000';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const TOUR_DIR = path.resolve('public/assets/smeshield/tour');
const REPORT_DIR = path.resolve('docs/report_figures');

fs.mkdirSync(TOUR_DIR, { recursive: true });
fs.mkdirSync(REPORT_DIR, { recursive: true });

const manifest = [];

async function waitVisuals(page, delay = 800) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const images = Array.from(document.querySelectorAll('img'));
    await Promise.all(images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      });
    }));
  });
  await new Promise(r => setTimeout(r, delay));
}

async function saveScreenshot(page, filename, targetDirs, metadata) {
  const isMobile = metadata.viewport === 'mobile';
  const width = isMobile ? 390 : 1440;
  const height = isMobile ? 844 : 900;

  const allExist = targetDirs.every(dir => fs.existsSync(path.join(dir, filename)));
  if (!allExist || process.env.FORCE_ALL) {
    for (const dir of targetDirs) {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      const filePath = path.join(dir, filename);
      await page.screenshot({ path: filePath, type: 'png' });
      const stats = fs.statSync(filePath);
      console.log(`[SAVED] ${filename} -> ${dir} (${stats.size} bytes)`);
    }
  } else {
    console.log(`[EXISTS - CACHED] ${filename} already present in targets`);
  }

  manifest.push({
    id: metadata.id,
    filename,
    route: metadata.route,
    role: metadata.role,
    viewport: `${width}x${height}`,
    caption: metadata.caption,
    description: metadata.description,
    tourStep: metadata.tourStep || null,
    targetDirs: targetDirs.map(d => path.relative('.', d))
  });
}

async function loginUser(page, email, password) {
  console.log(`\nLogging in as ${email}...`);
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const emailInput = document.querySelector('#email');
    const passInput = document.querySelector('#password');
    if (emailInput) emailInput.value = '';
    if (passInput) passInput.value = '';
  });
  await page.type('#email', email);
  await page.type('#password', password);
  
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 30000 }),
    page.click('button[type="submit"]')
  ]);
  await waitVisuals(page, 1000);
  console.log(`Logged in. Current URL: ${page.url()}`);
}

async function logoutUser(page) {
  console.log('Logging out...');
  // Clear cookies for clean session
  const client = await page.target().createCDPSession();
  await client.send('Network.clearBrowserCookies');
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 400);
}

async function run() {
  console.log('====================================================');
  console.log('SMEShield — Automated Academic Screenshot Capture');
  console.log('====================================================\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  // ---------------------------------------------------------------
  // SEQUENCE 1: PUBLIC & AUTHENTICATION SCREENS
  // ---------------------------------------------------------------
  console.log('\n--- SEQUENCE 1: Public & Auth Screens ---');
  
  // 1. Landing Page Hero
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 1200);
  await saveScreenshot(page, 'public_landing_hero.png', [REPORT_DIR], {
    id: 'SHOT-PUB-01',
    route: '/',
    role: 'Public Visitor',
    caption: 'Figure 4.1: SMEShield Responsive Landing Page featuring 4-Pillar Human Firewall Storytelling Hero.',
    description: 'Hero section presenting Nigerian cyber threats, the educational void, bilingual training, and measurable Human Firewall protection.'
  });

  // 2. How It Works Page
  await page.goto(`${BASE_URL}/how-it-works`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 1000);
  await saveScreenshot(page, 'public_how_it_works_page.png', [REPORT_DIR], {
    id: 'SHOT-PUB-02',
    route: '/how-it-works',
    role: 'Public Visitor',
    caption: 'Figure 4.2: SMEShield Interactive Product Tour detailing 8-step cybersecurity journey.',
    description: 'Public How It Works overview outlining registration, adaptive training, bilingual micro-learning, and team score aggregation.'
  });

  // 3. Login Gateway
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 1000);
  await saveScreenshot(page, 'auth_login_gateway.png', [REPORT_DIR], {
    id: 'SHOT-AUTH-01',
    route: '/login',
    role: 'Public / Returning User',
    caption: 'Figure 4.3: Secure Authentication Gateway with NDPA 2023 aligned privacy architecture.',
    description: 'Login interface with credential encryption, bilingual Pidgin toggle, and password masking.'
  });

  // 4. Signup Page (Tour 01 & Report)
  await page.goto(`${BASE_URL}/signup`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 1200);
  await saveScreenshot(page, 'tour-01.png', [TOUR_DIR], {
    id: 'TOUR-01',
    route: '/signup',
    role: 'New User',
    tourStep: 1,
    caption: 'Step 1: Account Registration & NDPA 2023 Consent.',
    description: 'Signup gateway with mandatory terms acknowledgement, NDPA data protection consent, and secure identity creation.'
  });
  await saveScreenshot(page, 'auth_signup_terms_checkbox.png', [REPORT_DIR], {
    id: 'SHOT-AUTH-02',
    route: '/signup',
    role: 'New User',
    caption: 'Figure 4.4: User Registration Gateway featuring mandatory NDPA 2023 compliance consent.',
    description: 'Signup interface enforcing explicit Terms of Service and Privacy Policy acknowledgement before account creation.'
  });

  // 5. Privacy Policy & Terms of Service
  await page.goto(`${BASE_URL}/privacy`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 800);
  await saveScreenshot(page, 'privacy_policy.png', [REPORT_DIR], {
    id: 'SHOT-LEGAL-01',
    route: '/privacy',
    role: 'Public Visitor',
    caption: 'Figure 4.5: NDPA 2023 Privacy Policy articulating data sovereignty and minimal collection principles.',
    description: 'Privacy policy aligned with Nigerian data protection regulations.'
  });

  await page.goto(`${BASE_URL}/terms`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 800);
  await saveScreenshot(page, 'terms_of_use.png', [REPORT_DIR], {
    id: 'SHOT-LEGAL-02',
    route: '/terms',
    role: 'Public Visitor',
    caption: 'Figure 4.6: Terms of Service specifying academic and SME cyber readiness usage parameters.',
    description: 'Terms of service establishing acceptable usage and SME training boundaries.'
  });

  // Check if Sequence 2 screenshots already exist
  const seq2Files = [
    { filename: 'tour-02.png', targetDirs: [TOUR_DIR], meta: { id: 'TOUR-02', route: '/onboarding', role: 'New Learner', tourStep: 2, caption: 'Step 2: Role Selection & Adaptive Threat Profiling.', description: 'Learners select Business Owner, Employee, or Sole Entrepreneur to receive personalized training curricula.' } },
    { filename: 'onboarding_role_selection.png', targetDirs: [REPORT_DIR], meta: { id: 'SHOT-ONB-01', route: '/onboarding', role: 'New Learner', caption: 'Figure 4.7: Role Selection Wizard adapting platform workflows for Owners, Employees, and Sole Traders.', description: 'Three distinct operational modes tailored to the Nigerian commercial ecosystem.' } },
    { filename: 'tour-03.png', targetDirs: [TOUR_DIR], meta: { id: 'TOUR-03', route: '/onboarding (Step 2/3)', role: 'Business Owner', tourStep: 3, caption: 'Step 3: Sector Classification & Organization Setup.', description: 'Configures SME commercial sector to tailor simulations to relevant threats.' } },
    { filename: 'onboarding_business_owner_setup.png', targetDirs: [REPORT_DIR], meta: { id: 'SHOT-ONB-02', route: '/onboarding (Step 2/3)', role: 'Business Owner', caption: 'Figure 4.8: Business Classification interface configuring rule-based curriculum prioritization.', description: 'Deterministic sector tagging aligning simulations with daily operational risks.' } },
    { filename: 'onboarding_employee_join_code.png', targetDirs: [REPORT_DIR], meta: { id: 'SHOT-ONB-03', route: '/onboarding (Step 2 - Employee)', role: 'Employee', caption: 'Figure 4.9: Employee Workplace Association via Persistent 6-Digit Join Code.', description: 'Zero-overhead employee onboarding linking staff to the DELSU enterprise workspace.' } },
    { filename: 'tour-04.png', targetDirs: [TOUR_DIR], meta: { id: 'TOUR-04', route: '/assessment', role: 'Learner', tourStep: 4, caption: 'Step 4: Adaptive Baseline Diagnostic Assessment.', description: 'Diagnostic questionnaire measuring entry-level cybersecurity awareness across Nigerian threat categories.' } },
    { filename: 'onboarding_baseline_diagnostic.png', targetDirs: [REPORT_DIR], meta: { id: 'SHOT-ONB-04', route: '/assessment', role: 'Learner', caption: 'Figure 4.10: Baseline Cybersecurity Assessment questionnaire with real-time bilingual support.', description: 'Diagnostic assessment establishing pre-training Human Firewall benchmarks.' } }
  ];

  const seq2AllExist = seq2Files.every(item => item.targetDirs.every(d => fs.existsSync(path.join(d, item.filename))));

  if (seq2AllExist && !process.env.FORCE_ALL) {
    console.log('[CACHE HIT] All Sequence 2 onboarding screenshots exist. Skipping ephemeral user provisioning.');
    for (const item of seq2Files) {
      manifest.push({
        id: item.meta.id,
        filename: item.filename,
        route: item.meta.route,
        role: item.meta.role,
        viewport: '1440x900',
        caption: item.meta.caption,
        description: item.meta.description,
        tourStep: item.meta.tourStep || null,
        targetDirs: item.targetDirs.map(d => path.relative('.', d))
      });
    }
  } else {
    const tempEmail = `temp_capture_${Date.now()}@smeshield.test`;
    const tempPass = 'CapturePass123!';
    
    // Create pre-confirmed temporary account via Admin API
    const { data: tempAuth, error: tempErr } = await sbAdmin.auth.admin.createUser({
      email: tempEmail,
      password: tempPass,
      email_confirm: true
    });

    if (tempErr || !tempAuth?.user) {
      throw new Error('Failed to create ephemeral test account: ' + tempErr?.message);
    }
    const tempUserId = tempAuth.user.id;
    console.log(`Created ephemeral capture account: ${tempEmail} (${tempUserId})`);

    try {
    // Log into temporary account (lands on /onboarding)
    await loginUser(page, tempEmail, tempPass);
    await page.goto(`${BASE_URL}/onboarding`, { waitUntil: 'networkidle0' });
    await waitVisuals(page, 1000);

    // Step 1: Role Selection (Tour 02 & Report)
    await saveScreenshot(page, 'tour-02.png', [TOUR_DIR], {
      id: 'TOUR-02',
      route: '/onboarding',
      role: 'New Learner',
      tourStep: 2,
      caption: 'Step 2: Role Selection & Adaptive Threat Profiling.',
      description: 'Learners select Business Owner, Employee, or Sole Entrepreneur to receive personalized training curricula.'
    });
    await saveScreenshot(page, 'onboarding_role_selection.png', [REPORT_DIR], {
      id: 'SHOT-ONB-01',
      route: '/onboarding',
      role: 'New Learner',
      caption: 'Figure 4.7: Role Selection Wizard adapting platform workflows for Owners, Employees, and Sole Traders.',
      description: 'Three distinct operational modes tailored to the Nigerian commercial ecosystem.'
    });

    // Step 2 (Owner Setup): Click Business Owner card
    const buttons = await page.$$('button');
    // First card is business owner
    if (buttons.length > 0) {
      await buttons[1].click(); // click role button
      await waitVisuals(page, 1000);
    }

    // Now on Step 2 (Business Classification)
    // Select Education & Training (school)
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const btn = buttons.find(b => b.innerText && (b.innerText.includes('School') || b.innerText.includes('Academy') || b.innerText.includes('Education')));
      if (btn) btn.click();
    });
    await waitVisuals(page, 800);

    await saveScreenshot(page, 'tour-03.png', [TOUR_DIR], {
      id: 'TOUR-03',
      route: '/onboarding (Step 2)',
      role: 'Business Owner',
      tourStep: 3,
      caption: 'Step 3: Business Onboarding & Industry Threat Alignment.',
      description: 'Selecting operating sector to dynamically prioritize threat modules (e.g. POS fraud, fee diversion, WhatsApp hijack).'
    });
    await saveScreenshot(page, 'onboarding_business_owner_setup.png', [REPORT_DIR], {
      id: 'SHOT-ONB-02',
      route: '/onboarding (Step 2/3)',
      role: 'Business Owner',
      caption: 'Figure 4.8: Business Classification interface configuring rule-based curriculum prioritization.',
      description: 'Deterministic sector tagging aligning simulations with daily operational risks.'
    });

    // Go back to Step 1 to capture Employee Join Code Flow
    await page.goto(`${BASE_URL}/onboarding`, { waitUntil: 'networkidle0' });
    await waitVisuals(page, 1000);
    
    // Click Employee card (second card)
    await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('button'));
      const empCard = cards.find(b => b.innerText && (b.innerText.includes('Employee') || b.innerText.includes('Staff')));
      if (empCard) empCard.click();
    });
    await waitVisuals(page, 1000);

    // Type Full Name and Join Code (252429)
    await page.type('#full_name', 'EMPLOYEE 2');
    await page.type('#join_code', '252429');
    await waitVisuals(page, 600);

    await saveScreenshot(page, 'onboarding_employee_join_code.png', [REPORT_DIR], {
      id: 'SHOT-ONB-03',
      route: '/onboarding (Step 2 - Employee)',
      role: 'Employee',
      caption: 'Figure 4.9: Employee Workplace Association via Persistent 6-Digit Join Code.',
      description: 'Zero-overhead employee onboarding linking staff to the DELSU enterprise workspace.'
    });

    // Submit Join Code to transition into Baseline Diagnostic (/assessment)
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 30000 }),
      page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const joinBtn = buttons.find(b => b.innerText && (b.innerText.includes('Join Workspace') || b.innerText.includes('Join')));
        if (joinBtn) joinBtn.click();
      })
    ]);
    await waitVisuals(page, 1200);

    // Now on /assessment: Baseline Diagnostic Question (Tour 04 & Report)
    await saveScreenshot(page, 'tour-04.png', [TOUR_DIR], {
      id: 'TOUR-04',
      route: '/assessment',
      role: 'Learner',
      tourStep: 4,
      caption: 'Step 4: Adaptive Baseline Diagnostic Assessment.',
      description: 'Diagnostic questionnaire measuring entry-level cybersecurity awareness across Nigerian threat categories.'
    });
    await saveScreenshot(page, 'onboarding_baseline_diagnostic.png', [REPORT_DIR], {
      id: 'SHOT-ONB-04',
      route: '/assessment',
      role: 'Learner',
      caption: 'Figure 4.10: Baseline Cybersecurity Assessment questionnaire with real-time bilingual support.',
      description: 'Diagnostic assessment establishing pre-training Human Firewall benchmarks.'
    });

  } finally {
    // Clean up temporary user safely
    await logoutUser(page);
    await sbAdmin.from('users').delete().eq('id', tempUserId);
    await sbAdmin.auth.admin.deleteUser(tempUserId);
    console.log(`[CLEANUP] Ephemeral capture account ${tempEmail} successfully deleted.`);
  }
}

  // ---------------------------------------------------------------
  // SEQUENCE 3: BUSINESS OWNER OPERATIONS CENTER (REAL DELSU ACCOUNT)
  // ---------------------------------------------------------------
  console.log('\n--- SEQUENCE 3: Business Owner Operations Center (aruahpaul2022@gmail.com) ---');
  await loginUser(page, 'aruahpaul2022@gmail.com', 'Password123!');

  // 1. Business Owner Dashboard Overview (Tour 05 & Report)
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 1500);

  await saveScreenshot(page, 'tour-05.png', [TOUR_DIR], {
    id: 'TOUR-05',
    route: '/dashboard',
    role: 'Business Owner',
    tourStep: 5,
    caption: 'Step 5: Human Firewall Dashboard & Operational Command.',
    description: 'Executive overview displaying team readiness, enrolled staff count, average quiz mastery, and personal HFS dial.'
  });
  await saveScreenshot(page, 'dashboard_business_owner_overview.png', [REPORT_DIR], {
    id: 'SHOT-DASH-01',
    route: '/dashboard',
    role: 'Business Owner',
    caption: 'Figure 4.11: Business Owner Command Dashboard displaying Organization Readiness and Owner Defense Track.',
    description: 'Enterprise operations center with DELSU metrics, 6-digit join code badge, and actionable defense guidance.'
  });

  // Focused HFS Dial & Metrics
  await saveScreenshot(page, 'human_firewall_score_detail.png', [REPORT_DIR], {
    id: 'SHOT-HFS-01',
    route: '/dashboard',
    role: 'Business Owner',
    caption: 'Figure 4.12: Human Firewall Score (HFS) Gauge reflecting verified workforce readiness (0-100%).',
    description: 'Composite metric combining baseline diagnostics, module completion, and quiz mastery.'
  });

  await saveScreenshot(page, 'human_firewall_priority_focus.png', [REPORT_DIR], {
    id: 'SHOT-HFS-02',
    route: '/dashboard',
    role: 'Business Owner',
    caption: 'Figure 4.13: Priority Threat Modules and Recommended Defensive Actions.',
    description: 'Rule-based recommendations highlighting high-risk threat categories requiring immediate training.'
  });

  // 2. Owner Team Roster Management (/dashboard/team)
  await page.goto(`${BASE_URL}/dashboard/team`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 1200);
  await saveScreenshot(page, 'team_roster_overview.png', [REPORT_DIR], {
    id: 'SHOT-BO-01',
    route: '/dashboard/team',
    role: 'Business Owner',
    caption: 'Figure 4.14: Workforce Compliance & Team Roster interface showing enrolled staff (EMPLOYEE 1 & 2).',
    description: 'Team administration showing join code 252429, individual completion rates, quiz averages, and CSV export action.'
  });

  // 3. Owner Employee Detailed Drill-Down (/dashboard/team/[id])
  await page.goto(`${BASE_URL}/dashboard/team/aaaef135-0340-473b-b668-a3d4b13683ef`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 1200);
  await saveScreenshot(page, 'team_employee_detail_view.png', [REPORT_DIR], {
    id: 'SHOT-BO-02',
    route: '/dashboard/team/[id]',
    role: 'Business Owner',
    caption: 'Figure 4.15: Individual Employee Security Drill-Down displaying granular module audit and quiz scores.',
    description: 'Deep audit view verifying staff mastery, weak areas, and individual risk factors.'
  });

  // 4. Owner Employee Invite Management (/dashboard/team/invite)
  await page.goto(`${BASE_URL}/dashboard/team/invite`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 1000);
  await saveScreenshot(page, 'team_invite_employee.png', [REPORT_DIR], {
    id: 'SHOT-BO-03',
    route: '/dashboard/team/invite',
    role: 'Business Owner',
    caption: 'Figure 4.16: Employee Invitation Provisioning and Join Code Dispatch Center.',
    description: 'Dual enrollment mechanism supporting instant 6-digit join codes and direct email invitations.'
  });

  // 5. Owner Profile Settings (/dashboard/profile)
  await page.goto(`${BASE_URL}/dashboard/profile`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 1000);
  await saveScreenshot(page, 'profile_overview.png', [REPORT_DIR], {
    id: 'SHOT-PROF-01',
    route: '/dashboard/profile',
    role: 'Business Owner',
    caption: 'Figure 4.17: User Profile and Organization Credentials Configuration.',
    description: 'Profile management showing linked enterprise, role permissions, and language preferences.'
  });

  // 6. Mobile Dashboard Responsive View (390 x 844)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 1200);
  await saveScreenshot(page, 'mobile_dashboard_responsive.png', [REPORT_DIR], {
    id: 'SHOT-MOB-01',
    route: '/dashboard',
    role: 'Business Owner',
    viewport: 'mobile',
    caption: 'Figure 4.18: Mobile Responsive Dashboard optimized for Nigerian SME operators on mobile devices.',
    description: 'Fully stacked touch-friendly interface delivering executive metrics without horizontal scroll.'
  });

  // Restore Desktop Viewport
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await logoutUser(page);

  // ---------------------------------------------------------------
  // SEQUENCE 4: EMPLOYEE LEARNER & CURRICULUM (paularuah2024@gmail.com)
  // ---------------------------------------------------------------
  console.log('\n--- SEQUENCE 4: Employee Learner & Curriculum (paularuah2024@gmail.com) ---');
  await loginUser(page, 'paularuah2024@gmail.com', 'Password123!');

  // 1. Employee Learner Dashboard
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 1200);
  await saveScreenshot(page, 'dashboard_employee_learner_view.png', [REPORT_DIR], {
    id: 'SHOT-DASH-02',
    route: '/dashboard',
    role: 'Employee',
    caption: 'Figure 4.19: Employee Learner Dashboard showing personalized Human Firewall Score and assigned training.',
    description: 'Frontline staff portal displaying workplace link to DELSU and direct module action cards.'
  });

  // 2. Training Curriculum Library (Tour 06 & Report)
  await page.goto(`${BASE_URL}/training`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 1500);
  await saveScreenshot(page, 'tour-06.png', [TOUR_DIR], {
    id: 'TOUR-06',
    route: '/training',
    role: 'Employee',
    tourStep: 6,
    caption: 'Step 6: Adaptive Cybersecurity Training Library.',
    description: '15 modular courses addressing specific Nigerian threats including Fake Alerts, POS fraud, and BEC scams.'
  });
  await saveScreenshot(page, 'training_curriculum_library.png', [REPORT_DIR], {
    id: 'SHOT-TRN-01',
    route: '/training',
    role: 'Employee',
    caption: 'Figure 4.20: Adaptive Curriculum Library displaying 15 Nigerian SME threat modules with priority badges.',
    description: 'Full modular cybersecurity curriculum dynamically tailored to business risk profile.'
  });

  // Module 1 UUID
  const mod1Id = '28e7b4ae-a4c4-4a0d-af3a-bc9d9e9535db';

  // 3. Training Module Detail Overview
  await page.goto(`${BASE_URL}/training/${mod1Id}`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 1200);
  await saveScreenshot(page, 'training_module_overview.png', [REPORT_DIR], {
    id: 'SHOT-TRN-02',
    route: `/training/${mod1Id}`,
    role: 'Employee',
    caption: 'Figure 4.21: Module Overview detailing threat scenario, learning objectives, and 80% mastery requirement.',
    description: 'Pre-lesson orientation showcasing high-resolution contextual Nigerian SME scenario.'
  });

  // 4. Interactive Lesson (English) (Tour 07 & Report)
  await page.goto(`${BASE_URL}/training/${mod1Id}/lesson`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 1200);
  await saveScreenshot(page, 'tour-07.png', [TOUR_DIR], {
    id: 'TOUR-07',
    route: `/training/${mod1Id}/lesson`,
    role: 'Employee',
    tourStep: 7,
    caption: 'Step 7: Bilingual Micro-Learning Lessons (English & Nigerian Pidgin).',
    description: 'Realistic micro-learning scenario with full bilingual parity to empower frontline commercial staff.'
  });
  await saveScreenshot(page, 'training_lesson_english.png', [REPORT_DIR], {
    id: 'SHOT-TRN-03',
    route: `/training/${mod1Id}/lesson`,
    role: 'Employee',
    caption: 'Figure 4.22: Interactive Lesson Viewer in English with contextual attack breakdown.',
    description: 'Educational micro-content explaining threat anatomy and practical defensive protocols.'
  });

  // 5. Interactive Lesson (Nigerian Pidgin Parity)
  await page.evaluate(() => {
    const radios = Array.from(document.querySelectorAll('button[role="radio"]'));
    const pcmBtn = radios.find(b => b.innerText && b.innerText.includes('Pidgin'));
    if (pcmBtn) pcmBtn.click();
  });
  await waitVisuals(page, 1000);
  await saveScreenshot(page, 'training_lesson_pidgin.png', [REPORT_DIR], {
    id: 'SHOT-TRN-04',
    route: `/training/${mod1Id}/lesson`,
    role: 'Employee',
    caption: 'Figure 4.23: Authentic Nigerian Pidgin Lesson Viewer ensuring comprehension across non-technical staff.',
    description: 'Culturally adapted threat guidance utilizing authentic vernacular terms.'
  });

  // Mobile Lesson View
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`${BASE_URL}/training/${mod1Id}/lesson`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 1000);
  await saveScreenshot(page, 'mobile_lesson_interactive.png', [REPORT_DIR], {
    id: 'SHOT-MOB-02',
    route: `/training/${mod1Id}/lesson`,
    role: 'Employee',
    viewport: 'mobile',
    caption: 'Figure 4.24: Mobile Lesson Interface delivering bite-sized training directly to employee smartphones.',
    description: 'Responsive mobile lesson experience requiring zero desktop infrastructure.'
  });

  // Switch back to English for Quiz
  await page.evaluate(() => {
    const radios = Array.from(document.querySelectorAll('button[role="radio"]'));
    const enBtn = radios.find(b => b.innerText && b.innerText.includes('English'));
    if (enBtn) enBtn.click();
  });
  await waitVisuals(page, 500);

  // 6. Interactive Quiz & Mastery Feedback (Tour 08 & Report)
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${BASE_URL}/training/${mod1Id}/quiz`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 1200);

  // Active quiz question before answer check
  await page.evaluate(() => {
    const opts = Array.from(document.querySelectorAll('.space-y-4 button'));
    if (opts.length > 0) opts[0].click();
  });
  await waitVisuals(page, 500);

  await saveScreenshot(page, 'training_quiz_question_active.png', [REPORT_DIR], {
    id: 'SHOT-QUIZ-01',
    route: `/training/${mod1Id}/quiz`,
    role: 'Employee',
    caption: 'Figure 4.25: Knowledge Check Quiz Question with active answer selection.',
    description: 'Formative evaluation testing learner ability to detect subtle threat indicators.'
  });

  // Mobile Quiz Question
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await waitVisuals(page, 500);
  await saveScreenshot(page, 'mobile_quiz_interactive.png', [REPORT_DIR], {
    id: 'SHOT-MOB-03',
    route: `/training/${mod1Id}/quiz`,
    role: 'Employee',
    viewport: 'mobile',
    caption: 'Figure 4.26: Mobile Knowledge Check interface optimized for one-handed completion.',
    description: 'Touch-friendly quiz assessment accessible on standard low-cost Android/iOS devices.'
  });

  // Restore Desktop, check answer for immediate feedback (Tour 08 & Report)
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${BASE_URL}/training/${mod1Id}/quiz`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 1000);

  // Click option and check answer
  await page.evaluate(() => {
    const opts = Array.from(document.querySelectorAll('.space-y-4 button'));
    if (opts.length > 0) opts[0].click();
  });
  await waitVisuals(page, 400);

  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const checkBtn = buttons.find(b => b.innerText && (b.innerText.includes('Check Answer') || b.innerText.includes('Check')));
    if (checkBtn) checkBtn.click();
  });
  await waitVisuals(page, 800);

  await saveScreenshot(page, 'tour-08.png', [TOUR_DIR], {
    id: 'TOUR-08',
    route: `/training/${mod1Id}/quiz`,
    role: 'Employee',
    tourStep: 8,
    caption: 'Step 8: 80% Mastery Assessment & Instant Remedial Feedback.',
    description: 'Instant feedback highlighting correct decisions, providing rationale, and enforcing the 80% passing standard.'
  });
  await saveScreenshot(page, 'training_quiz_result_passed.png', [REPORT_DIR], {
    id: 'SHOT-QUIZ-02',
    route: `/training/${mod1Id}/quiz`,
    role: 'Employee',
    caption: 'Figure 4.27: Interactive Quiz Evaluation displaying instant feedback and remedial guidance.',
    description: 'Immediate reinforcement confirming correct responses and cementing behavioral habits.'
  });

  // 7. Training Progress Overview (/dashboard/progress)
  await page.goto(`${BASE_URL}/dashboard/progress`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 1200);
  await saveScreenshot(page, 'training_progress_overview.png', [REPORT_DIR], {
    id: 'SHOT-TRN-05',
    route: '/dashboard/progress',
    role: 'Employee',
    caption: 'Figure 4.28: Learner Progress Ledger tracking completed modules, quiz mastery scores, and dates.',
    description: 'Auditable training history verifying employee compliance and curriculum completion.'
  });

  await logoutUser(page);

  // ---------------------------------------------------------------
  // SEQUENCE 5: SOLE ENTREPRENEUR (paularuah087@gmail.com)
  // ---------------------------------------------------------------
  console.log('\n--- SEQUENCE 5: Sole Entrepreneur Dashboard (paularuah087@gmail.com) ---');
  await loginUser(page, 'paularuah087@gmail.com', 'Password123!');

  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle0' });
  await waitVisuals(page, 1200);
  await saveScreenshot(page, 'dashboard_sole_entrepreneur_view.png', [REPORT_DIR], {
    id: 'SHOT-DASH-03',
    route: '/dashboard',
    role: 'Sole Entrepreneur',
    caption: 'Figure 4.29: Sole Entrepreneur Dashboard designed for autonomous market traders and POS operators.',
    description: 'Self-paced standalone dashboard focusing on personal financial protection and fraud avoidance.'
  });

  await logoutUser(page);
  await browser.close();

  // ---------------------------------------------------------------
  // SEQUENCE 6: MANIFEST & CONTACT SHEET GENERATION
  // ---------------------------------------------------------------
  console.log('\n--- Generating Evidence Manifest & Visual Contact Sheet ---');
  const manifestPath = path.resolve('docs/academic_screenshot_manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`[SAVED] Manifest written to ${manifestPath} (${manifest.length} screenshots recorded)`);

  // Generate HTML Contact Sheet for visual review
  const htmlRows = manifest.map(item => `
    <div class="card">
      <div class="meta">
        <span class="badge badge-id">${item.id}</span>
        ${item.tourStep ? `<span class="badge badge-tour">TOUR STEP ${item.tourStep}</span>` : ''}
        <span class="badge badge-role">${item.role}</span>
        <span class="badge badge-viewport">${item.viewport}</span>
        <span class="route">${item.route}</span>
      </div>
      <h4>${item.caption}</h4>
      <p class="desc">${item.description}</p>
      <div class="img-container">
        <img src="${item.tourStep ? '../../public/assets/smeshield/tour/' + item.filename : './' + item.filename}" alt="${item.filename}" loading="lazy" />
      </div>
      <div class="file-info">
        <code>${item.filename}</code>
      </div>
    </div>
  `).join('\n');

  const contactSheetHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SMEShield — Academic Screenshot Visual Contact Sheet</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0b1528; color: #e2e8f0; padding: 32px; }
    header { max-width: 1400px; margin: 0 auto 32px; padding-bottom: 20px; border-bottom: 1px solid #1e293b; }
    h1 { font-size: 28px; color: #38bdf8; margin-bottom: 8px; }
    p.subtitle { color: #94a3b8; font-size: 15px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(440px, 1fr)); gap: 24px; max-width: 1400px; margin: 0 auto; }
    .card { background: #131f37; border: 1px solid #1e293b; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
    .meta { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
    .badge { font-size: 11px; font-weight: 700; padding: 3px 8px; rounded: 4px; border-radius: 4px; text-transform: uppercase; }
    .badge-id { background: #0284c7; color: white; }
    .badge-tour { background: #d97706; color: white; }
    .badge-role { background: #334155; color: #cbd5e1; }
    .badge-viewport { background: #475569; color: #f1f5f9; }
    .route { font-size: 12px; color: #38bdf8; font-family: monospace; margin-left: auto; }
    h4 { font-size: 15px; color: #f8fafc; line-height: 1.4; }
    p.desc { font-size: 13px; color: #94a3b8; line-height: 1.5; }
    .img-container { background: #020617; border-radius: 8px; overflow: hidden; border: 1px solid #334155; aspect-ratio: 16/10; display: flex; align-items: center; justify-content: center; }
    .img-container img { width: 100%; height: 100%; object-fit: contain; }
    .file-info { display: flex; justify-content: space-between; font-size: 12px; color: #64748b; }
    code { background: #0f172a; padding: 2px 6px; border-radius: 4px; color: #38bdf8; }
  </style>
</head>
<body>
  <header>
    <h1>SMEShield — Academic Screenshot Visual Contact Sheet</h1>
    <p class="subtitle">Complete audit manifest of authentic, production-grade screenshots captured from the live application for B.Sc. Final-Year Undergraduate Project (DELSU), How It Works product tour, and oral defence evidence.</p>
  </header>
  <div class="grid">
    ${htmlRows}
  </div>
</body>
</html>`;

  const contactSheetPath = path.resolve('docs/report_figures/screenshot_contact_sheet.html');
  fs.writeFileSync(contactSheetPath, contactSheetHtml);
  console.log(`[SAVED] Visual contact sheet written to ${contactSheetPath}`);

  console.log('\n====================================================');
  console.log(`COMPLETE: ${manifest.length} screenshots successfully captured!`);
  console.log('====================================================\n');
}

run().catch(err => {
  console.error('\n[FATAL ERROR during capture]:', err);
  process.exit(1);
});
