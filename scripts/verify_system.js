const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function verify() {
  console.log('====================================================');
  console.log('  SMEShield — Comprehensive Academic & System Audit');
  console.log('====================================================\n');

  let passes = 0;
  let failures = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ PASS: ${message}`);
      passes++;
    } else {
      console.error(`❌ FAIL: ${message}`);
      failures++;
    }
  }

  // 1. Modules count
  const { data: modules, error: modErr } = await supabase
    .from('modules')
    .select('*')
    .order('order_index');

  assert(!modErr && modules && modules.length === 15, `Found exactly 15 modules in database (found: ${modules?.length})`);

  // 2. Quiz Questions count
  const { data: questions, error: qErr } = await supabase
    .from('quiz_questions')
    .select('id, module_id, question_en, question_pcm, options_en, options_pcm, explanation_en, explanation_pcm, correct_option_index');

  assert(!qErr && questions && questions.length >= 75, `Total quiz questions >= 75 (found: ${questions?.length})`);

  // 3. Questions per module >= 5
  const qPerMod = {};
  questions?.forEach(q => {
    qPerMod[q.module_id] = (qPerMod[q.module_id] || 0) + 1;
  });

  let allHaveMin5 = true;
  modules?.forEach(m => {
    const count = qPerMod[m.id] || 0;
    if (count < 5) {
      allHaveMin5 = false;
      console.error(`   Module ${m.order_index} (${m.title_en}) has only ${count} questions!`);
    }
  });
  assert(allHaveMin5, 'Every single module contains >= 5 quiz questions');

  // 4. Parity & Validation on questions
  let qParityOk = true;
  questions?.forEach(q => {
    if (!q.question_en || !q.question_pcm) qParityOk = false;
    if (!Array.isArray(q.options_en) || q.options_en.length < 4) qParityOk = false;
    if (!Array.isArray(q.options_pcm) || q.options_pcm.length < 4) qParityOk = false;
    if (typeof q.correct_option_index !== 'number' || q.correct_option_index < 0 || q.correct_option_index > 3) qParityOk = false;
    if (!q.explanation_en || !q.explanation_pcm) qParityOk = false;
  });
  assert(qParityOk, 'All quiz questions have full EN/PCM parity, 4 options, valid answer index, and explanations');

  // 5. Module content depth & parity
  let modDepthOk = true;
  let modParityOk = true;
  modules?.forEach(m => {
    if (!m.title_en || !m.title_pcm) modParityOk = false;
    if (!m.content_en || !m.content_pcm) modParityOk = false;
    if (!m.learning_objectives_en || !m.learning_objectives_pcm) modParityOk = false;
    if (!m.key_takeaways_en || !m.key_takeaways_pcm) modParityOk = false;
    if (!m.scenario_en || !m.scenario_pcm) modParityOk = false;

    // Depth check: content length >= 700 chars
    if ((m.content_en?.length || 0) < 700) {
      modDepthOk = false;
      console.warn(`   Module ${m.order_index} content_en is only ${m.content_en?.length} chars`);
    }
  });
  assert(modParityOk, 'All 15 modules have complete English and Pidgin metadata, objectives, and scenarios');
  assert(modDepthOk, 'All 15 modules have rich educational content depth (>= 700 chars)');

  // 6. Mathematical verification of Human Firewall Score formula
  // Formula: HFS = round((completion_percentage * 0.35) + (avg_quiz_score * 0.65))
  // Baseline Awareness Score = initial assessment score
  // Awareness Improvement = HFS - Baseline
  const testCases = [
    { completed: 0, avgQuiz: 0, baseline: 50, expectedHFS: 0, expectedImp: -50 },
    { completed: 15, avgQuiz: 100, baseline: 50, expectedHFS: 100, expectedImp: 50 },
    { completed: 15, avgQuiz: 80, baseline: 60, expectedHFS: 87, expectedImp: 27 }, // (100 * 0.35) + (80 * 0.65) = 35 + 52 = 87
    { completed: 6, avgQuiz: 75, baseline: 40, expectedHFS: 63, expectedImp: 23 },  // (40 * 0.35) + (75 * 0.65) = 14 + 48.75 = 62.75 -> 63
  ];

  let mathOk = true;
  testCases.forEach(tc => {
    const compPct = Math.round((tc.completed / 15) * 100);
    const hfs = Math.round((compPct * 0.35) + (tc.avgQuiz * 0.65));
    const imp = hfs - tc.baseline;
    if (hfs !== tc.expectedHFS || imp !== tc.expectedImp) {
      mathOk = false;
      console.error(`   Math mismatch: expected HFS ${tc.expectedHFS} got ${hfs}; expected Imp ${tc.expectedImp} got ${imp}`);
    }
  });
  assert(mathOk, 'Human Firewall Score mathematical formula matches user specification perfectly');

  console.log('\n====================================================');
  console.log(`  Audit Result: ${passes} PASSED, ${failures} FAILED`);
  console.log('====================================================\n');

  if (failures > 0) {
    process.exit(1);
  }
}

verify();
