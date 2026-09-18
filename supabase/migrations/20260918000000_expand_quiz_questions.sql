-- ============================================================
-- SMEShield Phase 1: Quiz Question Expansion
-- Migration: 20260918000000_expand_quiz_questions.sql
-- Purpose: Add 2 bilingual scenario-based questions per module
--          bringing each module from 3 to 5 questions (45 → 75 total)
-- Quality Criteria:
--   - Nigerian SME relevance (Lagos, Kano, Port Harcourt contexts)
--   - Decision-based, not trivial memorisation
--   - 4 plausible options with non-trivial distractors
--   - EN + PCM semantic parity (not literal translation)
--   - Explanations reinforce the Human Firewall concept
-- Preservation: Existing 45 questions are NOT modified or deleted
-- ============================================================

-- ─────────────────────────────────────────────
-- MODULE 1: Phishing & Fake Alerts
-- ─────────────────────────────────────────────
INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'You receive an email from your bank saying your account will be blocked unless you click a link and verify your BVN within 24 hours. What should you do first?',
  'You receive email from your bank say dem go block your account unless you click link verify your BVN within 24 hours. Wetin you go do first?',
  '["Call your bank directly using the official number on the back of your debit card or their verified website","Click the link to check if the warning is genuine before it is too late","Reply to the email with your BVN details to prevent suspension","Ask a friend or colleague to click the link on your behalf"]'::jsonb,
  '["Call your bank direct with official number wey dey back of your ATM card or their real website","Click the link first make you check whether the warning na true before time run out","Reply the email with your BVN details so dem no go block the account","Ask your friend or colleague make dem click the link for you"]'::jsonb,
  0,
  'Legitimate banks never request sensitive details through email links. Always verify bank communications by calling the official number you already have — not a number from the suspicious message.',
  'Real bank no dey ever ask you to give sensitive details through email link. Always verify bank message by calling official number wey you already get, not number wey dem give inside the suspicious message.'
FROM public.modules WHERE order_index = 1;

INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'A staff member at your business receives an SMS with a link claiming to be from a courier company about an unexpected package delivery. They did not order anything. What is the safest course of action?',
  'Your worker receive SMS with link wey say na courier company dey deliver unexpected package. Dem no order anything. Wetin be the safest thing to do?',
  '["Do not click the link; contact the courier company directly using their official number found on their verified website","Click the link to find out what the package is about","Forward the link to the business owner to decide","Share the link on the company WhatsApp group so others can investigate"]'::jsonb,
  '["No click the link; reach the courier company directly using official number from their real website","Click the link make you see wetin the package be about","Send the link give the business owner to decide","Share the link for company WhatsApp group so others can check am"]'::jsonb,
  0,
  'Unexpected delivery SMS messages with links are a classic phishing technique. Do not click unsolicited links. Contact the courier directly through their verified official website or a trusted phone number.',
  'Unexpected delivery SMS with link na classic phishing method. No click any unsolicited link. Contact the courier directly through their real official website or trusted phone number.'
FROM public.modules WHERE order_index = 1;

-- ─────────────────────────────────────────────
-- MODULE 2: Fake Payment / "Flash Funds" Scams
-- ─────────────────────────────────────────────
INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'A customer purchases goods worth ₦200,000 and shows you a bank transfer receipt on their phone as proof of payment. They are demanding you release the goods immediately. What is the safest step?',
  'Customer buy goods worth ₦200,000 and show you bank transfer receipt on their phone say dem don pay. Dem dey rush you to release the goods immediately. Wetin be the safest step?',
  '["Log into your own banking app or visit your bank to confirm the credit has arrived before releasing goods","Accept the screenshot receipt as sufficient proof and release the goods","Call the customer''s bank to verify the transaction on their behalf","Release the goods first and call your bank to verify while the customer is still present"]'::jsonb,
  '["Login your own banking app or go your bank to confirm say the credit don enter your account before you release anything","Accept the screenshot receipt as enough proof and release the goods","Call the customer own bank to verify the transaction for dem","Release the goods first and call your bank to verify while the customer still dey present"]'::jsonb,
  0,
  'Screenshots can be easily edited. The only safe way to confirm payment is by checking your own bank account directly. Always verify the credit has actually arrived in your account before releasing any goods.',
  'Screenshots fit be edited. The only safe way to confirm payment na to check your own bank account directly. Always verify say the credit don actually enter your account before you release any goods.'
FROM public.modules WHERE order_index = 2;

INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'Why is releasing goods based on a payment screenshot particularly dangerous for a Nigerian small business owner?',
  'Why e dey very dangerous to release goods based on payment screenshot for Nigerian small business owner?',
  '["Screenshots can be digitally edited to show false payment details that appear completely genuine","The bank may automatically reverse the payment after 48 hours as a standard policy","Screenshot receipts expire after a short period and become invalid as proof of payment","Customers who use screenshots are typically attempting to avoid paying tax on the transaction"]'::jsonb,
  '["Screenshots fit be edited to show fake payment details wey go look real proper-proper","The bank fit automatically reverse the payment after 48 hours as standard policy","Screenshot receipts dey expire after small time and no fit remain valid as proof of payment","Customers wey dey use screenshots usually dey try to avoid paying tax on the transaction"]'::jsonb,
  0,
  'Digital receipts and bank alert screenshots are trivially easy to fake using simple photo editing tools. A fraudster who has edited a payment screenshot knows this and counts on the merchant not verifying the actual account credit.',
  'Digital receipts and bank alert screenshots dey very easy to fake using simple photo editing tool. Fraudster wey don edit payment screenshot know this and dem dey count on the merchant not to verify the actual account credit.'
FROM public.modules WHERE order_index = 2;

-- ─────────────────────────────────────────────
-- MODULE 3: Ransomware
-- ─────────────────────────────────────────────
INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'Which combination of behaviours most effectively reduces the risk of ransomware permanently destroying your business records?',
  'Which combination of behaviours most effectively reduce the risk of ransomware permanently destroying your business records?',
  '["Keeping regular tested backups in a separate location and installing software updates promptly when available","Using a strong email password and changing it every month without exception","Turning off Wi-Fi at night and unplugging all devices when not in use","Only opening email attachments from senders you recognise by their display name"]'::jsonb,
  '["Dey keep regular tested backup for separate location and dey install software update sharp-sharp when e dey available","Dey use strong email password and dey change am every month without exception","Dey turn off Wi-Fi at night and unplug all devices when you no dey use them","Only dey open email attachment from sender wey you recognise by their display name"]'::jsonb,
  0,
  'The two most effective ransomware defences are: (1) tested backups in a separate location so you can restore without paying, and (2) patching software promptly to close known vulnerabilities before attackers exploit them.',
  'The two most effective ransomware defence na: (1) tested backup for separate location so you fit restore without paying, and (2) patching software quickly to close known vulnerability before attackers exploit them.'
FROM public.modules WHERE order_index = 3;

INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'Ransomware has locked all your business files and a message demands cryptocurrency payment before a countdown timer expires. What is the correct response?',
  'Ransomware lock all your business files and message dey demand cryptocurrency payment before countdown timer expire. Wetin be the correct response?',
  '["Disconnect the device from all networks immediately, do not pay the ransom, and restore your data from a clean backup","Pay the ransom as quickly as possible before the countdown expires to recover your files","Restart the computer multiple times to attempt to unlock the files without paying","Delete all files from the infected device to prevent the ransomware from spreading to others"]'::jsonb,
  '["Disconnect the device from all networks immediately, no pay the ransom, and restore your data from clean backup","Pay the ransom as fast as possible before the countdown expire to recover your files","Restart the computer many times to try to unlock the files without paying","Delete all files from the infected device to prevent the ransomware from spreading to others"]'::jsonb,
  0,
  'Paying ransomware attackers does not guarantee file recovery and directly funds future attacks on other businesses. Isolate the device, do not pay, and restore from a tested backup. This is why regular backups are your most important defence.',
  'Paying ransomware attackers no guarantee say you go recover your files and your money dey fund future attacks on other businesses. Isolate the device, no pay, and restore from tested backup. This na why regular backup na your most important defence.'
FROM public.modules WHERE order_index = 3;

-- ─────────────────────────────────────────────
-- MODULE 4: Social Media & WhatsApp Account Takeover
-- ─────────────────────────────────────────────
INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'Your business WhatsApp account suddenly stops working and you receive a message from an unknown number saying your account has been moved to a new device. What most likely happened?',
  'Your business WhatsApp suddenly stop working and you receive message from unknown number say dem don move your account to new device. Wetin most likely happen?',
  '["Someone obtained your six-digit WhatsApp verification OTP and registered your number on their own device","WhatsApp automatically updated and migrated your account as part of a routine process","Your SIM card has expired and your network provider has deactivated your number","Your phone storage is full and WhatsApp has temporarily suspended the account"]'::jsonb,
  '["Someone get your six-digit WhatsApp verification OTP and register your number for their own device","WhatsApp automatically update and migrate your account as part of routine process","Your SIM card don expire and your network provider don deactivate your number","Your phone storage don full and WhatsApp don temporarily suspend the account"]'::jsonb,
  0,
  'WhatsApp account takeover typically happens when a fraudster tricks you into sharing the six-digit registration OTP. They register your number on their phone and lock you out. Never share OTP codes with anyone — not even someone claiming to be from WhatsApp.',
  'WhatsApp account takeover dey usually happen when fraudster trick you to share the six-digit registration OTP. Dem register your number for their own phone and lock you out. Never share OTP code with anybody — not even somebody wey claim say dem be from WhatsApp.'
FROM public.modules WHERE order_index = 4;

INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'Which single setting provides the strongest protection against WhatsApp business account takeover?',
  'Which single setting dey provide the strongest protection against WhatsApp business account takeover?',
  '["Enabling Two-Step Verification in WhatsApp settings with a strong personal PIN that you have not shared with anyone","Changing your profile photo and display name regularly to confuse potential attackers","Setting your Last Seen and Online status to visible only to your contacts","Archiving sensitive business conversations to keep them hidden from the main inbox"]'::jsonb,
  '["Enable Two-Step Verification inside WhatsApp settings with strong personal PIN wey you never share with anybody","Dey change your profile photo and display name regularly to confuse potential attackers","Set your Last Seen and Online status to visible only to your contacts","Archive sensitive business conversation to hide them from the main inbox"]'::jsonb,
  0,
  'Two-Step Verification adds a personal PIN required when registering your number on any new device. Even if an attacker obtains your OTP, they cannot complete the account takeover without your separate PIN.',
  'Two-Step Verification dey add personal PIN wey dem must enter when dem dey register your number for any new device. Even if attacker get your OTP, dem no fit complete the account takeover without your separate PIN.'
FROM public.modules WHERE order_index = 4;

-- ─────────────────────────────────────────────
-- MODULE 5: USB Malware & Keyloggers
-- ─────────────────────────────────────────────
INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'A customer enters your shop and asks to use your business computer to print a file from their USB drive. What is the safest response?',
  'Customer enter your shop and ask make dem use your business computer to print file from their USB drive. Wetin be the safest response?',
  '["Politely decline and explain that your computer is reserved for business use only","Accept the request briefly since printing is a low-risk activity","Ask the customer to wait while you run an antivirus scan on their USB before using it","Ask a colleague to handle it while you observe to ensure nothing harmful happens"]'::jsonb,
  '["Politely decline and explain say your computer na for business use only","Accept the request small time since printing no be dangerous activity","Ask the customer to wait make you run antivirus scan on their USB before you use am","Ask colleague to handle am while you watch make sure nothing harmful happen"]'::jsonb,
  0,
  'Any unknown USB drive inserted into your business computer can automatically install malware or a keylogger before you can react. Printing is not inherently safe — the harm happens the moment the drive is connected. The safest policy is no external USB drives on business devices.',
  'Any unknown USB drive wey dem insert into your business computer fit automatically install malware or keylogger before you fit do anything. Printing no dey inherently safe — the harm dey happen the moment dem connect the drive. The safest policy na no external USB drive on business device.'
FROM public.modules WHERE order_index = 5;

INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'What is a keylogger and why is it especially dangerous for a business that handles customer payments on a shared computer?',
  'Wetin be keylogger and why e dey especially dangerous for business wey dey handle customer payment on shared computer?',
  '["Software or hardware that secretly records every keystroke, capturing passwords, card numbers, and banking credentials without detection","A device that automatically locks your keyboard after three incorrect password attempts to prevent unauthorised access","A program that deliberately slows internet speed on a network to make hacking more difficult","Malware that deletes files when it detects a USB drive being connected to the infected computer"]'::jsonb,
  '["Software or hardware wey dey secretly record every key wey dem press, dey capture password, card number, and banking credential without detection","Device wey dey automatically lock your keyboard after three wrong password attempt to prevent unauthorised access","Program wey dey deliberately slow internet speed on network to make hacking more difficult","Malware wey dey delete files when e detect USB drive being connected to the infected computer"]'::jsonb,
  0,
  'A keylogger silently records everything typed, including banking passwords and card numbers. On a shared business computer used for payments, one infected machine can expose every transaction and customer detail to an attacker.',
  'Keylogger dey silently record everything wey dem type, including banking password and card number. For shared business computer wey dem dey use for payment, one infected machine fit expose every transaction and customer detail to an attacker.'
FROM public.modules WHERE order_index = 5;

-- ─────────────────────────────────────────────
-- MODULE 6: SIM Swap Fraud
-- ─────────────────────────────────────────────
INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'Your phone suddenly loses all network signal — no calls, no SMS, no mobile data — despite being in an area with good coverage. You did not change any device settings. What could this indicate?',
  'Your phone suddenly lose all network signal — no call, no SMS, no mobile data — even though you dey area with good coverage. You no change any device settings. Wetin this fit indicate?',
  '["A SIM swap attack where a fraudster has ported your number to a SIM card they control","A temporary network outage that should resolve automatically within a few hours","Your SIM card has physically failed and needs replacement at a network provider store","Your phone''s battery is critically low and is shutting down non-essential connectivity"]'::jsonb,
  '["SIM swap attack where fraudster don port your number to SIM card wey dem control","Temporary network outage wey go automatically resolve within few hours","Your SIM card don physically fail and needs replacement for network provider store","Your phone battery don critically low and e dey shut down non-essential connectivity"]'::jsonb,
  0,
  'Sudden complete loss of signal on a functioning phone in a good coverage area is a key warning sign of SIM swap fraud. If this happens, call your network provider immediately from another phone to report the issue and block any transfers.',
  'Sudden complete loss of signal for functioning phone for area with good coverage na key warning sign of SIM swap fraud. If this happen, call your network provider immediately from another phone to report the issue and block any transfer.'
FROM public.modules WHERE order_index = 6;

INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'Which combination of protective measures best defends a Nigerian business owner against SIM swap fraud?',
  'Which combination of protective measures best go defend Nigerian business owner against SIM swap fraud?',
  '["Using an authenticator app instead of SMS OTPs for banking and calling your network provider immediately if your phone loses signal unexpectedly","Using a phone with two SIM slots so one remains active if the other is swapped","Changing your phone number every six months to make yourself a harder target","Switching off your mobile data when you are not actively using banking apps"]'::jsonb,
  '["Using authenticator app instead of SMS OTP for banking and calling your network provider immediately if your phone lose signal without reason","Using phone with two SIM slots so one go still dey active if dem swap the other","Changing your phone number every six months to make yourself harder target","Switch off your mobile data when you no dey actively using banking apps"]'::jsonb,
  0,
  'Authenticator apps generate codes locally on your device and are not linked to your phone number, so a SIM swap does not compromise them. Acting immediately when you lose signal can prevent the fraudster from intercepting your OTPs.',
  'Authenticator apps dey generate codes locally on your device and no dey linked to your phone number, so SIM swap no fit compromise them. Acting immediately when you lose signal fit prevent the fraudster from intercepting your OTPs.'
FROM public.modules WHERE order_index = 6;

-- ─────────────────────────────────────────────
-- MODULE 7: POS/Agent Banking Fraud
-- ─────────────────────────────────────────────
INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'A customer insists you swipe their card multiple times because "the first two attempts failed" yet your POS terminal consistently shows Declined. What should you do?',
  'Customer dey insist say you swipe their card many times because "the first two attempts fail" but your POS terminal dey consistently show Declined. Wetin you go do?',
  '["Stop swiping, call your POS provider to verify the transaction status, and ask the customer to contact their own bank","Attempt one final swipe and if it fails again, accept cash as an alternative","Switch from swipe to chip insertion mode to see if the transaction goes through","Trust the customer''s explanation and release the goods since the card is visibly genuine"]'::jsonb,
  '["Stop swiping, call your POS provider to verify the transaction status, and ask the customer to call their own bank","Try one final swipe and if e still fail, accept cash as alternative","Switch from swipe to chip insertion mode to see if the transaction go pass","Trust the customer explanation and release the goods since the card dey look genuine"]'::jsonb,
  0,
  'Multiple Declined swipes can be a manipulation tactic used by fraudsters with blocked accounts. Always verify transaction status through your POS provider before releasing any goods, and never let customer pressure override your verification process.',
  'Multiple Declined swipes fit be manipulation tactic wey fraudsters with blocked accounts dey use. Always verify transaction status through your POS provider before you release any goods, and never let customer pressure override your verification process.'
FROM public.modules WHERE order_index = 7;

INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'What is card skimming and how can a POS merchant most effectively guard against it?',
  'Wetin be card skimming and how POS merchant fit most effectively guard against am?',
  '["A physical device secretly attached to a POS terminal to copy card data; inspect your terminal every day for unusual additions or loose components","A method where merchants accidentally overcharge small amounts; prevented by printing and reviewing transaction receipts","A technique where customers steal printed receipts from the POS printer to extract card data; prevented by immediately removing printed receipts","A software virus infecting POS systems remotely; prevented by restarting the terminal each morning"]'::jsonb,
  '["Physical device wey dem secretly attach to POS terminal to copy card data; inspect your terminal every day for unusual addition or loose part","Method where merchants accidentally overcharge small amount; prevented by printing and reviewing transaction receipts","Technique where customers dey steal printed receipts from the POS printer to get card data; prevented by immediately removing printed receipts","Software virus wey dey infect POS systems remotely; prevented by restarting the terminal every morning"]'::jsonb,
  0,
  'Skimming devices are physical overlays placed over your card reader that silently copy card information during every transaction. Daily physical inspection of your terminal for anything unfamiliar is one of the simplest and most effective defences.',
  'Skimming devices na physical overlay wey dem place over your card reader wey dey silently copy card information during every transaction. Daily physical inspection of your terminal for anything unfamiliar na one of the simplest and most effective defence.'
FROM public.modules WHERE order_index = 7;

-- ─────────────────────────────────────────────
-- MODULE 8: Weak Passwords & Credential Reuse
-- ─────────────────────────────────────────────
INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'You use the same password for your business email, mobile banking app, and social media. A data breach at an unrelated company exposes that password. What is the most likely consequence?',
  'You dey use same password for your business email, mobile banking app, and social media. Data breach for different company expose that password. Wetin most likely go be the consequence?',
  '["All your accounts become vulnerable immediately as attackers test the stolen credentials across multiple services","Only the breached company is affected; your other accounts use different security infrastructure","Your bank will detect the suspicious login and automatically lock your account before any damage occurs","The stolen password is useless unless the attacker also knows your exact username or email address"]'::jsonb,
  '["All your accounts go become vulnerable immediately as attackers test the stolen credentials across multiple services","Only the breached company dey affected; your other accounts dey use different security infrastructure","Your bank go detect the suspicious login and automatically lock your account before any damage occur","The stolen password dey useless unless the attacker also know your exact username or email address"]'::jsonb,
  0,
  'Credential stuffing tools automatically test stolen username-password pairs across hundreds of services. Reusing the same password means a single breach compromises every account where you used it — including business banking and email.',
  'Credential stuffing tools dey automatically test stolen username-password pairs across hundreds of services. Reusing same password mean say single breach dey compromise every account where you use am — including business banking and email.'
FROM public.modules WHERE order_index = 8;

INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'Which of the following is the strongest password for a business account?',
  'Which of these na the strongest password for business account?',
  '["A long passphrase combining unrelated words with numbers and symbols, for example: Market#Yaba9Bridge!","Your business name followed by the year your business was registered","A six-digit PIN chosen because it is easy to memorise and type quickly","A password your IT support person created and shared with the team via a group chat"]'::jsonb,
  '["Long passphrase wey combine unrelated words with numbers and symbols, for example: Market#Yaba9Bridge!","Your business name follow by the year wey you register your business","Six-digit PIN wey you choose because e easy to remember and type quickly","Password wey your IT support create and share with the team via group chat"]'::jsonb,
  0,
  'Long passphrases combining random words, numbers, and special characters are both strong and memorable. They are significantly harder to crack than short passwords, business names, or shared credentials created by other people.',
  'Long passphrase wey combine random words, numbers, and special character dey both strong and memorable. Dem dey significantly harder to crack than short password, business name, or shared credential wey another person create.'
FROM public.modules WHERE order_index = 8;

-- ─────────────────────────────────────────────
-- MODULE 9: Unpatched Apps & Outdated Devices
-- ─────────────────────────────────────────────
INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'Your accounting software displays a critical security update notification. You dismiss it daily for two weeks because business is busy. What is the primary risk you are accepting?',
  'Your accounting software dey display critical security update notification. You dey dismiss am every day for two weeks because business dey busy. Wetin be the primary risk wey you dey accept?',
  '["A known security vulnerability remains open in your software, giving attackers an active window to access your financial data","The software licence may expire automatically if you delay the update for too long","The update will eventually install without your permission and disrupt your business operations","Older software versions are slower but do not create meaningful security vulnerabilities"]'::jsonb,
  '["Known security vulnerability dey remain open for your software, giving attackers active window to access your financial data","The software licence fit automatically expire if you delay the update for too long","The update go eventually install without your permission and disrupt your business operations","Older software versions dey slower but dem no dey create meaningful security vulnerability"]'::jsonb,
  0,
  'When a critical update is released, the vulnerability it patches is already known to attackers. Every day you delay is an additional day of exposure. Attackers actively scan for and exploit unpatched software.',
  'When critical update release, the vulnerability wey e dey patch don already known to attackers. Every day wey you delay na additional day of exposure. Attackers dey actively scan for and exploit unpatched software.'
FROM public.modules WHERE order_index = 9;

INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'Which device situation poses the highest cybersecurity risk when used to access a business mobile banking application?',
  'Which device situation dey pose the highest cybersecurity risk when dem dey use am to access business mobile banking application?',
  '["An Android phone running a version that no longer receives security updates, used daily for banking transactions","A brand-new laptop that has not yet been configured or personalised by the user","A USB-only printer with no internet connectivity connected to a secure business network","A wireless router installed by a certified provider within the past three months"]'::jsonb,
  '["Android phone wey dey run version wey no longer dey receive security update, dem dey use am every day for banking transaction","Brand-new laptop wey nobody don yet configure or personalise","USB-only printer wey no get internet connectivity connected to secure business network","Wireless router wey certified provider install within the past three months"]'::jsonb,
  0,
  'A phone running an unsupported Android version no longer receives security patches. Known vulnerabilities in that OS version are permanently exposed, making it a high-risk device for any financial application.',
  'Phone wey dey run unsupported Android version no longer dey receive security patch. Known vulnerability for that OS version dey permanently exposed, making am high-risk device for any financial application.'
FROM public.modules WHERE order_index = 9;

-- ─────────────────────────────────────────────
-- MODULE 10: Public/Unsecured Wi-Fi Risks
-- ─────────────────────────────────────────────
INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'You are at a Lagos airport and need to process an urgent customer payment remotely. You connect to a free Wi-Fi network labelled "FreeAirportWifi." What is the primary risk?',
  'You dey Lagos airport and you need to process urgent customer payment remotely. You connect to free Wi-Fi network wey name na "FreeAirportWifi." Wetin be the primary risk?',
  '["The network could be a rogue hotspot created by an attacker to intercept your banking credentials and payment data","The payment may take significantly longer to process due to shared bandwidth at a busy airport","Your phone battery will drain faster when connected to public Wi-Fi compared to using mobile data","The airport authority will monitor and log your internet activity for regulatory compliance"]'::jsonb,
  '["The network fit be fake hotspot wey attacker create to intercept your banking credential and payment data","The payment fit take significantly longer to process because many people dey share the bandwidth for busy airport","Your phone battery go drain faster when you dey connected to public Wi-Fi compared to using mobile data","The airport authority go monitor and log your internet activity for regulatory compliance"]'::jsonb,
  0,
  'Attackers frequently create fake Wi-Fi hotspots with credible names in public places. When you connect, they can intercept unencrypted traffic and capture banking credentials, passwords, and payment details.',
  'Attackers dey frequently create fake Wi-Fi hotspot with credible names for public places. When you connect, dem fit intercept unencrypted traffic and capture banking credential, password, and payment details.'
FROM public.modules WHERE order_index = 10;

INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'When you absolutely must use public Wi-Fi for an important business task, which measure provides the most meaningful protection?',
  'When you absolutely must use public Wi-Fi for important business task, which measure dey provide the most meaningful protection?',
  '["Using a VPN (Virtual Private Network) to encrypt all your internet traffic before it leaves your device","Enabling incognito or private browsing mode in your web browser before connecting","Turning off Bluetooth while connected to reduce exposure to proximity-based attacks","Completing your session within five minutes to minimise the window of exposure"]'::jsonb,
  '["Using VPN (Virtual Private Network) to encrypt all your internet traffic before e leave your device","Enable incognito or private browsing mode for your web browser before you connect","Turn off Bluetooth while you dey connected to reduce exposure to proximity-based attack","Complete your session within five minutes to minimise the window of exposure"]'::jsonb,
  0,
  'A VPN encrypts your traffic end-to-end, making it unreadable even if intercepted on an unsecured network. Incognito mode only hides local browsing history on your own device — it provides no protection against network-level interception by an attacker.',
  'VPN dey encrypt your traffic end-to-end, making am unreadable even if dem intercept am on unsecured network. Incognito mode only dey hide local browsing history on your own device — e no dey provide any protection against network-level interception by attacker.'
FROM public.modules WHERE order_index = 10;

-- ─────────────────────────────────────────────
-- MODULE 11: Business Email Compromise & Fake Invoices
-- ─────────────────────────────────────────────
INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'You receive an email from your regular supplier requesting that all future payments be redirected to a new bank account with immediate effect. What should you do first?',
  'You receive email from your regular supplier requesting say make you redirect all future payments to new bank account with immediate effect. Wetin you go do first?',
  '["Call your supplier directly using a phone number you already have saved in your own contacts to verbally confirm the change","Update your payment records immediately to avoid disrupting the business relationship and causing delays","Reply to the email requesting additional identity verification before making any changes","Forward the email to your accountant and ask them to handle the response on your behalf"]'::jsonb,
  '["Call your supplier directly using phone number wey you already get saved for your own contacts to verbally confirm the change","Update your payment records immediately to avoid disrupting the business relationship and causing delay","Reply the email requesting additional identity verification before you make any changes","Forward the email give your accountant and ask dem to handle the response for your behalf"]'::jsonb,
  0,
  'Business Email Compromise attacks frequently involve fraudulent account-change requests. Always verify any payment detail change by calling the supplier using a number from your existing contacts — never use contact information from the suspicious email.',
  'Business Email Compromise attack dey frequently involve fraudulent account-change request. Always verify any payment detail change by calling the supplier using number from your existing contacts — never use contact information from the suspicious email.'
FROM public.modules WHERE order_index = 11;

INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'Which of the following best describes a Business Email Compromise (BEC) attack targeting a Nigerian SME?',
  'Which of these best describe Business Email Compromise (BEC) attack wey dey target Nigerian SME?',
  '["Attackers impersonate a trusted supplier or executive via email to redirect invoice payments to a fraudulent bank account","Malware that automatically forwards copies of incoming emails to an external attacker without the account owner knowing","A phishing attack that exclusively targets employees by sending fake payroll or HR notifications","Ransomware that encrypts the email inbox and demands payment to the email service provider for restoration"]'::jsonb,
  '["Attackers dey impersonate trusted supplier or executive via email to redirect invoice payment to fraudulent bank account","Malware wey dey automatically forward copies of incoming emails to external attacker without the account owner knowing","Phishing attack wey exclusively dey target employees by sending fake payroll or HR notification","Ransomware wey dey encrypt the email inbox and dey demand payment to the email service provider for restoration"]'::jsonb,
  0,
  'BEC attacks are sophisticated social engineering operations where attackers study real business communication patterns before impersonating known parties. Nigerian SMEs that process regular supplier payments are common targets.',
  'BEC attack na sophisticated social engineering operation where attackers dey study real business communication pattern before dem impersonate known party. Nigerian SMEs wey dey process regular supplier payment na common target.'
FROM public.modules WHERE order_index = 11;

-- ─────────────────────────────────────────────
-- MODULE 12: Fake/Cloned Online Store Scams
-- ─────────────────────────────────────────────
INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'You are about to pay for goods on an online store you have not used before. Which detail is the most reliable warning sign of a fraudulent website?',
  'You wan pay for goods on online store wey you never use before. Which detail na the most reliable warning sign of fraudulent website?',
  '["The URL contains slight misspellings or extra characters, for example jumia-shop-ng.com instead of jumia.com.ng","The website displays a professional logo, high-quality product images, and customer reviews","The website is offering a free delivery promotion on orders above a certain amount","The website has a live chat support button visible in a corner of the page"]'::jsonb,
  '["The URL get small misspelling or extra characters, for example jumia-shop-ng.com instead of jumia.com.ng","The website dey display professional logo, high-quality product images, and customer reviews","The website dey offer free delivery promotion on orders above certain amount","The website get live chat support button wey dey visible for corner of the page"]'::jsonb,
  0,
  'Fraudulent websites frequently use domain names that closely mimic legitimate brands with subtle changes. Professional appearances, logos, and chat buttons can all be copied. Always inspect the exact URL before entering any payment or login details.',
  'Fraudulent websites dey frequently use domain name wey dey closely mimic legitimate brands with subtle change. Professional appearance, logo, and chat button fit all be copied. Always inspect the exact URL before you enter any payment or login details.'
FROM public.modules WHERE order_index = 12;

INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'A customer contacts you claiming they were charged twice when ordering from what they believe is your online store, but you have no record of their order. What is the most likely explanation?',
  'Customer contact you say dem charge them twice when dem order from wetin dem believe na your online store, but you no get any record of their order. Wetin most likely be the explanation?',
  '["A fraudster has created a cloned version of your store to collect customer payments; report to your hosting provider and warn affected customers","Your payment gateway experienced a technical duplication error that charged without recording","The customer accidentally ordered from a different legitimate store with a similar name","An unstable internet connection caused the order to be submitted and charged twice"]'::jsonb,
  '["Fraudster don create cloned version of your store to collect customer payment; report to your hosting provider and warn affected customers","Your payment gateway experience technical duplication error wey charge without recording","The customer accidentally order from different legitimate store wey get similar name","Unstable internet connection cause the order to be submitted and charged twice"]'::jsonb,
  0,
  'Store cloning is an active threat to Nigerian online merchants. Fraudsters replicate a store\'s design and branding to intercept customer payments. Orders collected by the clone never appear in your records.',
  'Store cloning na active threat to Nigerian online merchant. Fraudsters dey replicate a store design and branding to intercept customer payment. Orders wey the clone collect never go appear for your records.'
FROM public.modules WHERE order_index = 12;

-- ─────────────────────────────────────────────
-- MODULE 13: Voice Phishing & AI Voice-Clone Scams
-- ─────────────────────────────────────────────
INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'You receive a voice message that sounds exactly like your business partner urgently requesting a ₦500,000 transfer before the end of the day. What should you do before taking any financial action?',
  'You receive voice message wey sound exactly like your business partner urgently requesting ₦500,000 transfer before end of day. Wetin you go do before you take any financial action?',
  '["Call your business partner back using their saved phone number to independently verify the request","Transfer the funds immediately to protect the business relationship and meet the urgent deadline","Send a WhatsApp message asking your partner to confirm before you proceed","Ask your accountant to process the transfer since the amount is within normal business range"]'::jsonb,
  '["Call your business partner back using their saved phone number to independently verify the request","Transfer the funds immediately to protect the business relationship and meet the urgent deadline","Send WhatsApp message asking your partner to confirm before you proceed","Ask your accountant to process the transfer since the amount dey within normal business range"]'::jsonb,
  0,
  'AI voice-cloning can replicate someone\'s voice from just a few seconds of recorded audio. Always independently verify any urgent financial request by calling back through a number you already trust — never act on a voice message alone.',
  'AI voice-cloning fit replicate somebody voice from just few seconds of recorded audio. Always independently verify any urgent financial request by calling back through number wey you already trust — never act on voice message alone.'
FROM public.modules WHERE order_index = 13;

INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'Which combination of signs most strongly suggests that a caller may be using AI voice-cloning to deceive you?',
  'Which combination of signs most strongly suggest say caller fit be using AI voice-cloning to deceive you?',
  '["The caller sounds like someone you know but insists on immediate irreversible action, declines to switch to a video call, and the request is unusual for that person","The caller''s voice has a slight echo due to the mobile network connection quality","The caller knows your name, business address, and specific details about recent transactions","The call connects almost immediately without the usual number of ringing tones"]'::jsonb,
  '["The caller sound like somebody you know but insist say you must do immediate irreversible action, dem decline to switch to video call, and the request dey unusual for that person","The caller voice get small echo because of mobile network connection quality","The caller know your name, business address, and specific details about recent transactions","The call connect almost immediately without the usual number of ringing tones"]'::jsonb,
  0,
  'The defining characteristics of AI voice-clone attacks are urgency for irreversible action, refusal to video-call, and an unusual request. Knowing your name and business details does not validate the call — such information is often available online.',
  'The defining characteristics of AI voice-clone attack na urgency for irreversible action, refusal to video-call, and unusual request. Knowing your name and business details no validate the call — such information dey often available online.'
FROM public.modules WHERE order_index = 13;

-- ─────────────────────────────────────────────
-- MODULE 14: QR Code Scams ("Quishing")
-- ─────────────────────────────────────────────
INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'A vendor at a busy Lagos market hands you a printed QR code for payment. Before completing the transaction, what is the most important verification step?',
  'Vendor for busy Lagos market give you printed QR code for payment. Before you complete the transaction, wetin be the most important verification step?',
  '["After scanning the code, confirm that the account name displayed matches the vendor before authorising the payment","Scan and pay as quickly as possible to avoid holding up other customers in the queue","Use a third-party QR scanner app rather than your banking app for added safety","Ask the vendor to verbally confirm the exact payment amount before you scan the code"]'::jsonb,
  '["After you scan the code, confirm say the account name wey show dey match the vendor before you authorise the payment","Scan and pay as quickly as possible to avoid holding up other customers for the queue","Use third-party QR scanner app instead of your banking app for added safety","Ask the vendor to verbally confirm the exact payment amount before you scan the code"]'::jsonb,
  0,
  'QR codes give no visual indication of where they route you. Always check the account name and details displayed after scanning before confirming payment. A tampered or swapped QR code will show a different account name.',
  'QR codes no dey give you visual indication of where dem go send you. Always check the account name and details wey show after you scan before you confirm payment. Tampered or swapped QR code go show different account name.'
FROM public.modules WHERE order_index = 14;

INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'How do attackers typically use QR codes to steal money from Nigerian merchants and customers?',
  'How attackers dey typically use QR codes to steal money from Nigerian merchants and customers?',
  '["They place sticker QR codes over legitimate payment QR codes, silently redirecting customer payments to their own account","They send QR codes via email that install malicious payment apps when scanned with a phone camera","They embed QR codes in CCTV footage that remotely charge cards captured near the camera","They use self-destructing QR codes that expire after a single scan to prevent the merchant from reusing them"]'::jsonb,
  '["Dem dey place sticker QR codes on top of legitimate payment QR codes, silently redirecting customer payment go their own account","Dem dey send QR codes via email wey dey install malicious payment apps when you scan am with phone camera","Dem dey embed QR codes for CCTV footage wey dey remotely charge cards wey dey near the camera","Dem dey use self-destructing QR codes wey expire after single scan to prevent the merchant from reusing them"]'::jsonb,
  0,
  'Physical QR code substitution is one of the most common quishing attacks in Nigerian markets. A fraudster places their QR sticker over a merchant\'s legitimate one. The merchant is unaware and every customer payment goes to the fraudster.',
  'Physical QR code substitution na one of the most common quishing attack for Nigerian market. Fraudster dey place their QR sticker on top of merchant legitimate one. The merchant no know and every customer payment dey go to the fraudster.'
FROM public.modules WHERE order_index = 14;

-- ─────────────────────────────────────────────
-- MODULE 15: Device Theft/Loss & Lack of Backups
-- ─────────────────────────────────────────────
INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'Your business smartphone containing your banking apps, business WhatsApp, and customer records is stolen. What is the most time-critical first action?',
  'Your business smartphone wey get your banking apps, business WhatsApp, and customer records don get stolen. Wetin be the most time-critical first action?',
  '["Remotely wipe the device via your Google or Apple account manager and immediately change passwords on all accounts that were accessible on the phone","File a police report first and await recovery of the device before taking further technical steps","Call your network provider to suspend the SIM card and monitor the situation from there","Purchase a replacement phone immediately so you can continue business operations without disruption"]'::jsonb,
  '["Remotely wipe the device via your Google or Apple account manager and immediately change password on all accounts wey dey accessible on the phone","File police report first and wait for recovery of the device before you take further technical steps","Call your network provider to suspend the SIM card and monitor the situation from there","Buy replacement phone immediately so you fit continue business operations without disruption"]'::jsonb,
  0,
  'Every minute a stolen phone remains accessible, attackers can log into banking apps, intercept OTPs, and harvest customer data. Remote wipe and immediate password changes are the highest-priority first steps — before a police report.',
  'Every minute stolen phone remain accessible, attackers fit login banking apps, intercept OTPs, and harvest customer data. Remote wipe and immediate password changes na the highest-priority first steps — before police report.'
FROM public.modules WHERE order_index = 15;

INSERT INTO public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
SELECT id,
  'Which backup practice best ensures a small Nigerian business can fully recover from device theft or accidental data loss?',
  'Which backup practice best ensure say small Nigerian business fit fully recover from device theft or accidental data loss?',
  '["Maintaining at least one copy of important data in a secure cloud service or a physically separate location, verified through regular test restores","Backing up files to a second folder on the same device for quick and convenient access","Taking monthly photographs of important paper documents using a secondary smartphone","Saving all business data to a USB drive stored in the same office as the primary computer"]'::jsonb,
  '["Maintain at least one copy of important data for secure cloud service or physically separate location, verified through regular test restores","Back up files to second folder on the same device for quick and convenient access","Dey take monthly photographs of important paper documents using secondary smartphone","Save all business data to USB drive wey you dey store for the same office as the primary computer"]'::jsonb,
  0,
  'A backup stored on the same device or in the same physical location is destroyed alongside the original in a theft, fire, or flood. The goal is at least one copy that survives the same event that destroys your primary data.',
  'Backup wey dey on the same device or same physical location go dey destroyed alongside the original if theft, fire, or flood happen. The goal na at least one copy wey go survive the same event wey destroy your primary data.'
FROM public.modules WHERE order_index = 15;
