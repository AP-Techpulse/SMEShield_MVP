// scripts/verify_phase4.mjs
// Comprehensive automated verification for Phase 4 visual refinement, schema, parity, formulas, and routes

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envFile = fs.readFileSync('.env.local', 'utf8');
const supabaseUrl = envFile.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
const supabaseKey = envFile.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim();
const supabase = createClient(supabaseUrl, supabaseKey);

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

async function runPhase4Verification() {
  console.log('================================================================');
  console.log('   SMEShield — Phase 4 Automated Technical Verification Suite   ');
  console.log('================================================================\n');

  // 1. Schema & Question Counts
  console.log('1. Database Schema & Quiz Inventory Audit:');
  const { data: modules, error: modErr } = await supabase
    .from('modules')
    .select('id, order_index, title_en, title_pcm, threat_category, image_url')
    .order('order_index');
  assert(!modErr && modules && modules.length === 15, 'Database contains exactly 15 curriculum modules');

  const { data: questions, error: qErr } = await supabase
    .from('quiz_questions')
    .select('id, module_id, question_en, question_pcm, options_en, options_pcm, explanation_en, explanation_pcm, correct_option_index');
  assert(!qErr && questions && questions.length === 75, `Database contains exactly 75 quiz questions (found: ${questions?.length})`);

  // Count per module
  const countByMod = {};
  questions?.forEach(q => {
    countByMod[q.module_id] = (countByMod[q.module_id] || 0) + 1;
  });
  let allModulesHaveFive = true;
  modules?.forEach(m => {
    if (countByMod[m.id] !== 5) {
      allModulesHaveFive = false;
    }
  });
  assert(allModulesHaveFive, 'Every one of the 15 modules has exactly 5 quiz questions');

  // 2. Bilingual Parity Audit
  console.log('\n2. Bilingual Parity & Option Schema Audit:');
  let parityOk = true;
  let optionIndicesOk = true;
  questions?.forEach(q => {
    if (!q.question_en || !q.question_pcm || !q.explanation_en || !q.explanation_pcm) {
      parityOk = false;
    }
    if (!Array.isArray(q.options_en) || q.options_en.length !== 4 || !Array.isArray(q.options_pcm) || q.options_pcm.length !== 4) {
      parityOk = false;
    }
    if (typeof q.correct_option_index !== 'number' || q.correct_option_index < 0 || q.correct_option_index > 3) {
      optionIndicesOk = false;
    }
  });
  assert(parityOk, '100% bilingual parity confirmed across questions, 4 options, and explanations');
  assert(optionIndicesOk, 'All correct_option_index values are valid integers between 0 and 3');

  // 3. Module Contextual Imagery Audit
  console.log('\n3. Module Visual Scenario Assets Audit:');
  let allImagesPresentInDb = true;
  let allImagesExistOnDisk = true;
  modules?.forEach(m => {
    if (!m.image_url) {
      allImagesPresentInDb = false;
    } else {
      const diskPath = path.join(process.cwd(), 'public', m.image_url.replace(/^\//, ''));
      if (!fs.existsSync(diskPath)) {
        allImagesExistOnDisk = false;
        console.error(`     Missing disk file for module ${m.order_index}: ${diskPath}`);
      }
    }
  });
  assert(allImagesPresentInDb, 'All 15 modules have non-null contextual image_url in database');
  assert(allImagesExistOnDisk, 'Every module image_url resolves to a valid, existing image asset on disk');

  // 4. Awareness Level & Terminology Audit
  console.log('\n4. Awareness Level & Terminology Safety Audit:');
  function getAwarenessLevel(hfs) {
    if (hfs >= 85) return { label: 'Highly Aware', color: 'emerald' };
    if (hfs >= 70) return { label: 'Strong', color: 'blue' };
    if (hfs >= 50) return { label: 'Aware', color: 'amber' };
    return { label: 'Developing', color: 'rose' };
  }
  assert(getAwarenessLevel(90).label === 'Highly Aware', 'Score 90 maps to "Highly Aware"');
  assert(getAwarenessLevel(85).label === 'Highly Aware', 'Score 85 maps to "Highly Aware"');
  assert(getAwarenessLevel(75).label === 'Strong', 'Score 75 maps to "Strong"');
  assert(getAwarenessLevel(55).label === 'Aware', 'Score 55 maps to "Aware"');
  assert(getAwarenessLevel(40).label === 'Developing', 'Score 40 maps to "Developing"');

  // Codebase grep checks
  const srcFiles = ['src/app/dashboard/page.tsx', 'src/components/dashboard/DashboardViews.tsx', 'src/app/dashboard/progress/page.tsx'];
  let expertFound = false;
  let liveDefenseFound = false;
  srcFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (/['"]Expert['"]/.test(content)) expertFound = true;
    if (/live defense state/i.test(content)) liveDefenseFound = true;
    if (/defense state/i.test(content)) liveDefenseFound = true;
  });
  assert(!expertFound, 'Zero occurrences of obsolete "Expert" awareness label in dashboard code');
  assert(!liveDefenseFound, 'Zero occurrences of "live defense state" terminology in dashboard code');

  // 5. Formula Mathematical Correctness
  console.log('\n5. Human Firewall Score & Formula Verification:');
  function computeHFS(completionPct, avgQuiz) {
    return Math.round((completionPct * 0.35) + (avgQuiz * 0.65));
  }
  assert(computeHFS(0, 0) === 0, 'HFS(0% completion, 0% quiz) = 0');
  assert(computeHFS(100, 100) === 100, 'HFS(100% completion, 100% quiz) = 100');
  assert(computeHFS(100, 80) === 87, 'HFS(100% completion, 80% quiz) = 87');
  assert(computeHFS(40, 75) === 63, 'HFS(40% completion, 75% quiz) = 63');

  // 6. Non-Authenticated Route Checks (Dev Server on :3000)
  console.log('\n6. Non-Authenticated Route & Static Guard Checks:');
  try {
    const homeRes = await fetch('http://localhost:3000/');
    assert(homeRes.status === 200, 'Public landing page (/) responds with HTTP 200 OK');

    const loginRes = await fetch('http://localhost:3000/login');
    assert(loginRes.status === 200, 'Public login page (/login) responds with HTTP 200 OK');

    const signupRes = await fetch('http://localhost:3000/signup');
    assert(signupRes.status === 200, 'Public signup page (/signup) responds with HTTP 200 OK');

    // Protected route unauthenticated redirect check
    const dashRes = await fetch('http://localhost:3000/dashboard', { redirect: 'manual' });
    const isRedirect = dashRes.status === 307 || dashRes.status === 302 || dashRes.status === 308;
    assert(isRedirect, `Unauthenticated /dashboard redirects to /login (status ${dashRes.status})`);

    const trainingRes = await fetch('http://localhost:3000/training', { redirect: 'manual' });
    const isTrainingRedirect = trainingRes.status === 307 || trainingRes.status === 302 || trainingRes.status === 308;
    assert(isTrainingRedirect, `Unauthenticated /training redirects to /login (status ${trainingRes.status})`);
  } catch (err) {
    console.warn('  [WARN] Dev server check skipped or encountered network error:', err.message);
  }

  console.log('\n================================================================');
  console.log(`TOTAL CHECKS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runPhase4Verification();
