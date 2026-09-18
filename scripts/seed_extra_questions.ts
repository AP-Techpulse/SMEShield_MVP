import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

// Read env variables manually
const envPath = path.resolve(process.cwd(), '.env.local')
const envContent = fs.readFileSync(envPath, 'utf-8')
const env: Record<string, string> = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) {
    env[match[1].trim()] = match[2].trim()
  }
})

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL']
const supabaseServiceKey = env['SUPABASE_SERVICE_ROLE_KEY']

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedExtraQuestions() {
  console.log('Seeding extra baseline assessment questions...')

  const newQuestions = [
    {
      order_index: 6,
      category: 'fake_payment',
      question_en: 'A customer buys goods worth ₦150,000. They show you a "successful transfer" screen on their banking app and are in a rush to leave. Your POS machine hasn\'t printed a receipt, and you haven\'t received a bank alert. What is the correct action?',
      question_pcm: 'Customer buy market of ₦150,000. Dem show you "successful transfer" screen for their bank app and dem dey rush to go. Your POS machine never print receipt, and you never see bank alert. Wetin be the correct thing to do?',
      options_en: JSON.stringify([
        "Let the customer go since their app shows successful — network is probably delaying the alert",
        "Take their phone number and address, then release the goods",
        "Politely ask the customer to wait until you confirm the credit in your own account or the POS prints an approved receipt",
        "Take a photo of the transfer screen as evidence and release the goods"
      ]),
      options_pcm: JSON.stringify([
        "Let the customer go since their app show successful — na network dey delay the alert",
        "Collect their phone number and address, then release the goods",
        "Politely tell the customer make dem wait until you confirm the money for your own account or POS print approved receipt",
        "Snap the transfer screen as evidence and release the goods"
      ]),
      correct_option_index: 2,
      explanation_en: 'Never rely on a customer\'s screen as proof of payment. Fake banking apps can generate convincing "successful transfer" screens. Always independently verify via your own channels before releasing high-value goods.',
      explanation_pcm: 'Never use customer screen as proof of payment. Fake bank apps fit generate correct "successful transfer" screen. Always verify with your own bank or POS before you release expensive goods.'
    },
    {
      order_index: 7,
      category: 'agent_banking',
      question_en: 'You are a POS Agent. A customer asks you to help them withdraw ₦50,000. They hand you their ATM card and verbally tell you their PIN to type in yourself. What should you do?',
      question_pcm: 'You be POS Agent. Customer tell you say make you help dem withdraw ₦50,000. Dem give you their ATM card and tell you their PIN make you type am yourself. Wetin you suppose do?',
      options_en: JSON.stringify([
        "Type the PIN for them since they trust you",
        "Refuse to type the PIN and hand the POS terminal to the customer so they can enter their PIN privately",
        "Write the PIN down on a paper so you don't forget it while processing the transaction",
        "Type the PIN, but ask them to look away for security"
      ]),
      options_pcm: JSON.stringify([
        "Type the PIN for dem since dem trust you",
        "Refuse to type the PIN and give the POS to the customer make dem enter their PIN secretly",
        "Write the PIN for paper so you no go forget am while you dey do the transaction",
        "Type the PIN, but tell dem make dem look away for security"
      ]),
      correct_option_index: 1,
      explanation_en: 'As a POS agent, you must never know or type a customer\'s PIN. If you do, you could be wrongly accused of unauthorized withdrawals later. Always hand the terminal to the customer and ensure they shield their PIN.',
      explanation_pcm: 'As POS agent, you no suppose ever know or type customer PIN. If you do am, dem fit accuse you of stealing their money later. Always give the terminal to the customer make dem cover their PIN.'
    }
  ]

  // Insert the new questions
  for (const q of newQuestions) {
    const { error } = await supabase
      .from('baseline_questions')
      .insert(q)
    
    if (error) {
      console.error(`Error inserting question for ${q.category}:`, error.message)
    } else {
      console.log(`Successfully seeded question for category: ${q.category}`)
    }
  }

  console.log('Seeding complete.')
}

seedExtraQuestions()
