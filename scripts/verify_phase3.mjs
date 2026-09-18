// Phase 3 Dashboard Refinement Verification Suite
import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import * as fs from 'fs';

const envContent = fs.readFileSync('.env.local', 'utf8');
const env = Object.fromEntries(
  envContent.split('\n')
    .filter(l => l.includes('='))
    .map(l => {
      const idx = l.indexOf('=');
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const BASE_URL = 'http://localhost:3000';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

function cleanHtml(html) {
  return html.replace(/<!-- -->/g, '').replace(/&amp;/g, '&');
}

async function getAuthCookies(email, password) {
  const cookiesSet = [];
  const client = createServerClient(supabaseUrl, anonKey, {
    cookies: {
      getAll() { return []; },
      setAll(cookies) { cookiesSet.push(...cookies); }
    }
  });
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error || !data.session) {
    throw new Error(`Failed to sign in as ${email}: ${error?.message}`);
  }
  return cookiesSet.map(c => `${c.name}=${c.value}`).join('; ');
}

async function run() {
  console.log('====================================================');
  console.log('PHASE 3 — DASHBOARD REFINEMENT VERIFICATION SUITE');
  console.log('====================================================\n');

  // ─────────────────────────────────────────────────────────────
  // 1. BUSINESS OWNER JOURNEY (3.1 & 3.2)
  // ─────────────────────────────────────────────────────────────
  console.log('--- 1. BUSINESS OWNER (aruahpaul2022@gmail.com) ---');
  const ownerCookies = await getAuthCookies('aruahpaul2022@gmail.com', 'Password123!');

  // Owner /dashboard
  const ownerDashRes = await fetch(`${BASE_URL}/dashboard`, {
    headers: { Cookie: ownerCookies }
  });
  assert(ownerDashRes.status === 200, 'Owner /dashboard returns 200 OK');
  const ownerDashHtml = cleanHtml(await ownerDashRes.text());
  
  // 3.1 Personal track and HFS
  assert(ownerDashHtml.includes('Owner Defense Track'), 'Owner dashboard displays "Owner Defense Track" badge');
  assert(ownerDashHtml.includes('Your Personal Cybersecurity Awareness'), 'Owner dashboard displays personal cybersecurity section');
  assert(ownerDashHtml.includes('Your Personal HFS'), 'Owner dashboard renders Personal HFS title');
  assert(
    ownerDashHtml.includes('Highly Aware') || ownerDashHtml.includes('Strong') || ownerDashHtml.includes('Aware') || ownerDashHtml.includes('Developing'),
    'Owner personal HFS dial renders awareness level label (Highly Aware/Strong/Aware/Developing)'
  );
  assert(ownerDashHtml.includes('Strongest Area'), 'Owner dashboard displays Strongest Area card');
  assert(ownerDashHtml.includes('Priority Focus'), 'Owner dashboard displays Priority Focus card');

  // Owner /dashboard/progress (3.2 Module Completion Checklist & Owner Personal Checklist)
  const ownerProgRes = await fetch(`${BASE_URL}/dashboard/progress`, {
    headers: { Cookie: ownerCookies }
  });
  assert(ownerProgRes.status === 200, 'Owner /dashboard/progress returns 200 OK');
  const ownerProgHtml = cleanHtml(await ownerProgRes.text());
  assert(ownerProgHtml.includes('Team Training & Readiness'), 'Owner progress displays Team Training & Readiness header');
  assert(ownerProgHtml.includes('Your Personal Training Checklist'), 'Owner progress displays personal 15-module curriculum checklist section');
  assert(ownerProgHtml.includes('Your HFS:'), 'Owner personal checklist displays Owner HFS score pill');
  assert(
    ownerProgHtml.includes('Highly Aware') || ownerProgHtml.includes('Strong') || ownerProgHtml.includes('Aware') || ownerProgHtml.includes('Developing'),
    'Owner personal checklist displays awareness level badge'
  );
  assert(ownerProgHtml.includes('Module 01'), 'Owner personal checklist displays Module 01');
  assert(ownerProgHtml.includes('Module 15'), 'Owner personal checklist displays Module 15');
  assert(
    ownerProgHtml.includes('Review Lesson') || ownerProgHtml.includes('Start Module') || ownerProgHtml.includes('Continue'),
    'Owner personal checklist renders actionable training links'
  );

  // ─────────────────────────────────────────────────────────────
  // 2. EMPLOYEE JOURNEY (3.1 & 3.2)
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- 2. EMPLOYEE (paularuah2024@gmail.com) ---');
  const empCookies = await getAuthCookies('paularuah2024@gmail.com', 'Password123!');

  // Employee /dashboard
  const empDashRes = await fetch(`${BASE_URL}/dashboard`, {
    headers: { Cookie: empCookies }
  });
  assert(empDashRes.status === 200, 'Employee /dashboard returns 200 OK');
  const empDashHtml = cleanHtml(await empDashRes.text());
  assert(empDashHtml.includes('Human Firewall Score'), 'Employee dashboard displays Human Firewall Score');
  assert(
    empDashHtml.includes('Highly Aware') || empDashHtml.includes('Strong') || empDashHtml.includes('Aware') || empDashHtml.includes('Developing'),
    'Employee dashboard dial displays awareness level label'
  );
  assert(empDashHtml.includes('Strongest Area'), 'Employee dashboard displays Strongest Area');
  assert(empDashHtml.includes('Priority Focus'), 'Employee dashboard displays Priority Focus');

  // Employee /dashboard/progress
  const empProgRes = await fetch(`${BASE_URL}/dashboard/progress`, {
    headers: { Cookie: empCookies }
  });
  assert(empProgRes.status === 200, 'Employee /dashboard/progress returns 200 OK');
  const empProgHtml = cleanHtml(await empProgRes.text());
  assert(empProgHtml.includes('Personal Training Progress'), 'Employee progress page displays Personal Training Progress');
  assert(
    empProgHtml.includes('Highly Aware') || empProgHtml.includes('Strong') || empProgHtml.includes('Aware') || empProgHtml.includes('Developing'),
    'Employee progress page HFS card displays awareness level badge'
  );
  assert(empProgHtml.includes('Curriculum Modules (15)'), 'Employee progress page displays 15 curriculum modules title');
  assert(empProgHtml.includes('Module 01'), 'Employee checklist displays Module 01');
  assert(empProgHtml.includes('Module 15'), 'Employee checklist displays Module 15');
  assert(
    empProgHtml.includes('Review Lesson') || empProgHtml.includes('Start Module') || empProgHtml.includes('Continue'),
    'Employee checklist renders appropriate action links'
  );

  // ─────────────────────────────────────────────────────────────
  // 3. SOLE ENTREPRENEUR JOURNEY (3.1 & 3.2)
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- 3. SOLE ENTREPRENEUR (paularuah087@gmail.com) ---');
  const soleCookies = await getAuthCookies('paularuah087@gmail.com', 'Password123!');

  // Sole Entrepreneur /dashboard
  const soleDashRes = await fetch(`${BASE_URL}/dashboard`, {
    headers: { Cookie: soleCookies }
  });
  assert(soleDashRes.status === 200, 'Sole Entrepreneur /dashboard returns 200 OK');
  const soleDashHtml = cleanHtml(await soleDashRes.text());
  assert(soleDashHtml.includes('Human Firewall Score'), 'Sole Entrepreneur dashboard displays Human Firewall Score');
  assert(
    soleDashHtml.includes('Highly Aware') || soleDashHtml.includes('Strong') || soleDashHtml.includes('Aware') || soleDashHtml.includes('Developing'),
    'Sole Entrepreneur dashboard dial displays awareness level label'
  );
  assert(soleDashHtml.includes('Strongest Area'), 'Sole Entrepreneur dashboard displays Strongest Area card');
  assert(soleDashHtml.includes('Priority Focus'), 'Sole Entrepreneur dashboard displays Priority Focus card');

  // Sole Entrepreneur /dashboard/progress
  const soleProgRes = await fetch(`${BASE_URL}/dashboard/progress`, {
    headers: { Cookie: soleCookies }
  });
  assert(soleProgRes.status === 200, 'Sole Entrepreneur /dashboard/progress returns 200 OK');
  const soleProgHtml = cleanHtml(await soleProgRes.text());
  assert(soleProgHtml.includes('Merchant Cybersecurity Progress'), 'Sole Entrepreneur progress page displays Merchant Cybersecurity Progress');
  assert(
    soleProgHtml.includes('Highly Aware') || soleProgHtml.includes('Strong') || soleProgHtml.includes('Aware') || soleProgHtml.includes('Developing'),
    'Sole Entrepreneur progress page HFS card displays awareness level badge'
  );
  assert(soleProgHtml.includes('Curriculum Modules (15)'), 'Sole Entrepreneur progress displays Curriculum Modules (15)');
  assert(soleProgHtml.includes('Module 01'), 'Sole Entrepreneur checklist displays Module 01');
  assert(soleProgHtml.includes('Module 15'), 'Sole Entrepreneur checklist displays Module 15');

  console.log('\n====================================================');
  console.log(`PHASE 3 RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

run().catch(err => {
  console.error('Fatal error in Phase 3 verification:', err);
  process.exit(1);
});
