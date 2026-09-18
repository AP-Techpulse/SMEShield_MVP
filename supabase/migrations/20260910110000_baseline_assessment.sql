-- Baseline assessment questions table
create table if not exists public.baseline_questions (
    id uuid primary key default uuid_generate_v4(),
    order_index integer not null,
    category text not null,
    question_en text not null,
    question_pcm text not null,
    options_en jsonb not null,
    options_pcm jsonb not null,
    correct_option_index integer not null,
    explanation_en text,
    explanation_pcm text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Baseline assessment results table
create table if not exists public.baseline_results (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete cascade not null,
    score_percentage integer not null check (score_percentage >= 0 and score_percentage <= 100),
    total_correct integer not null,
    total_questions integer not null,
    weak_areas jsonb not null default '[]'::jsonb,
    answers jsonb not null default '[]'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.baseline_questions enable row level security;
alter table public.baseline_results enable row level security;

-- Anyone authenticated can read baseline questions
drop policy if exists "Authenticated users can read baseline questions" on public.baseline_questions;
create policy "Authenticated users can read baseline questions" on public.baseline_questions
    for select using (auth.role() = 'authenticated');

-- Users can read their own baseline results
drop policy if exists "Users can read own baseline results" on public.baseline_results;
create policy "Users can read own baseline results" on public.baseline_results
    for select using (auth.uid() = user_id);

-- Users can insert their own baseline results
drop policy if exists "Users can insert own baseline results" on public.baseline_results;
create policy "Users can insert own baseline results" on public.baseline_results
    for insert with check (auth.uid() = user_id);

-- Business owners can read employee baseline results
drop policy if exists "Business owners can read employee baseline results" on public.baseline_results;
create policy "Business owners can read employee baseline results" on public.baseline_results
    for select using (
        user_id in (
            select id from public.users
            where business_id in (
                select business_id from public.users where id = auth.uid() and role = 'business_owner'
            )
        )
    );

-- Seed 5 baseline assessment questions covering key Nigerian SME threats
delete from public.baseline_questions;
insert into public.baseline_questions (order_index, category, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm) values

(1, 'phishing',
 'A customer walks into your shop and shows you an SMS "credit alert" from their bank on their phone. The alert says ₦50,000 has been sent to your account, but your own bank app shows no new deposit. What should you do?',
 'One customer enter your shop show you SMS "credit alert" from their bank for their phone. The alert talk say dem don send ₦50,000 to your account, but your own bank app no show any new money. Wetin you suppose do?',
 '["Release the goods immediately — the SMS is proof of payment", "Ask them to wait while you independently verify via your own banking app or call your bank directly", "Take a picture of the customer''s ID card and release the goods", "Dial the phone number written at the top of their SMS alert"]'::jsonb,
 '["Release the goods sharp sharp — the SMS na proof of payment", "Tell them make dem wait while you check your own banking app or call your bank directly", "Take picture of the customer ID card and release the goods", "Call the phone number wey dey for top of their SMS alert"]'::jsonb,
 1,
 'Always verify payments through your own banking channel. Fake SMS alerts are extremely common in Nigeria — scammers can forge bank alert messages. Never rely on a customer''s phone screen as proof of payment.',
 'Always check payment through your own bank channel. Fake SMS alert dey very common for Nigeria — scammers fit forge bank alert message. Never use customer phone screen as proof of payment.'),

(2, 'passwords',
 'You manage your business email, POS terminal login, and WhatsApp Business account. Which password practice is most secure?',
 'You dey manage your business email, POS terminal login, and WhatsApp Business account. Which password practice dey most secure?',
 '["Use the same strong password for everything so you don''t forget", "Write all passwords on a sticky note attached to your POS terminal", "Use a different password for each service and store them in a password manager", "Use your phone number as the password — it''s easy to remember"]'::jsonb,
 '["Use the same strong password for everything so you no go forget", "Write all password for sticky note wey you paste for your POS terminal", "Use different password for each service and keep dem inside password manager", "Use your phone number as password — e easy to remember"]'::jsonb,
 2,
 'Each account should have a unique password stored in a password manager. Reusing passwords means that if one account is breached, all your accounts are compromised.',
 'Each account suppose get different password wey you keep inside password manager. If you use the same password everywhere, once one account enter trouble, all your accounts don enter trouble.'),

(3, 'wifi_security',
 'You are at a busy Lagos coffee shop and need to check your business bank balance. The shop offers free Wi-Fi with no password required. What is the safest approach?',
 'You dey for one busy Lagos coffee shop and you wan check your business bank balance. The shop get free Wi-Fi wey no need password. Wetin be the safest thing to do?',
 '["Connect to the free Wi-Fi and open your banking app normally", "Use your mobile data (4G/5G) instead of the public Wi-Fi for banking", "Ask the barista for the Wi-Fi password — that makes it safe", "Connect to the Wi-Fi but use incognito/private browsing mode"]'::jsonb,
 '["Connect to the free Wi-Fi and open your banking app like normal", "Use your mobile data (4G/5G) instead of the public Wi-Fi to do banking", "Ask the barista for the Wi-Fi password — that one go make am safe", "Connect to the Wi-Fi but use incognito/private browsing mode"]'::jsonb,
 1,
 'Public Wi-Fi without authentication can be easily intercepted by attackers using man-in-the-middle techniques. Always use your own mobile data for sensitive transactions like banking.',
 'Public Wi-Fi wey no get password, hackers fit easily intercept am with man-in-the-middle attack. Always use your own mobile data for important things like banking.'),

(4, 'social_engineering',
 'You receive a WhatsApp message from someone claiming to be your bank''s "Customer Care Officer." They say your BVN needs urgent re-verification and ask you to click a link and enter your details. What should you do?',
 'You receive WhatsApp message from somebody wey talk say dem be your bank "Customer Care Officer." Dem say your BVN need urgent re-verification and say make you click one link enter your details. Wetin you suppose do?',
 '["Click the link quickly — BVN issues are serious and time-sensitive", "Reply to the message asking for their staff ID number to verify", "Ignore the message and call your bank directly using the number on the back of your ATM card", "Forward the message to your employees so they can also verify their BVN"]'::jsonb,
 '["Click the link sharp sharp — BVN matter dey serious and urgent", "Reply the message ask dem for their staff ID number to verify", "Ignore the message and call your bank directly with the number wey dey for back of your ATM card", "Forward the message give your workers so dem go fit verify their BVN too"]'::jsonb,
 2,
 'Banks will never ask for sensitive information via WhatsApp. Always verify by calling your bank directly using official channels — the number on the back of your ATM card or the bank''s verified website.',
 'Bank no go ever ask for your sensitive information through WhatsApp. Always verify by calling your bank directly through official channel — the number wey dey for back of your ATM card or the bank official website.'),

(5, 'device_security',
 'One of your employees'' phones — which has access to the company WhatsApp Business, mobile banking app, and customer contacts — gets stolen at a bus stop. What is the most critical first step?',
 'One of your worker phone — wey get access to company WhatsApp Business, mobile banking app, and customer contacts — dem thief am for bus stop. Wetin be the most important first thing to do?',
 '["Wait and hope the thief doesn''t access anything", "Post on social media asking people to help find the phone", "Immediately contact your bank to freeze the account and change all passwords linked to that device", "Buy a new phone and set up the same apps"]'::jsonb,
 '["Wait and hope say the thief no go access anything", "Post for social media ask people to help find the phone", "Immediately contact your bank to freeze the account and change all passwords wey connect to that device", "Buy new phone and set up the same apps"]'::jsonb,
 2,
 'When a device with business access is stolen, the first priority is damage control: freeze bank accounts, change passwords, and revoke access. Every minute of delay increases the risk of financial loss.',
 'When dem thief device wey get business access, the first thing na to control the damage: freeze bank account, change password, and remove access. Every minute wey you waste, the risk of losing money dey increase.');
