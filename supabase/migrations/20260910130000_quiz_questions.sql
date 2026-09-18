-- Add explanation columns to quiz_questions if not present
alter table public.quiz_questions add column if not exists explanation_en text;
alter table public.quiz_questions add column if not exists explanation_pcm text;

-- Clear any existing quiz questions to ensure a clean seed
truncate table public.quiz_questions cascade;

-- Insert 45 comprehensive quiz questions (3 per module) across all 15 modules
insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'What is the most common sign of a phishing email or SMS?', 
  'Wetin be the most common sign say email or SMS na scam (phishing)?',
  '["It creates false urgency and asks for sensitive credentials or passwords","It comes from your manager during normal office hours","It contains clear receipts with no suspicious links","It has a proper company logo with a verified email address"]'::jsonb,
  '["E dey rush you make you give password or secret code sharp-sharp","E come from your manager for normal working time","E get normal receipt wey no get suspicious link","E get clean company logo with verified email address"]'::jsonb,
  0,
  'Phishing messages almost always create panic or extreme urgency, demanding immediate action to prevent account suspension.',
  'Scam message dey always rush you say your account go close make you submit password quick-quick.'
from public.modules where order_index = 1;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'You receive an SMS alert saying ''Your BVN will be blocked today. Click here to update''. What should you do?', 
  'You receive text message say ''Dem go block your BVN today. Click here make you update am''. Wetin you go do?',
  '["Click the link immediately to prevent BVN suspension","Forward the message to your coworkers to warn them","Ignore the link and verify directly with your official bank branch or app","Reply to the SMS with your BVN details"]'::jsonb,
  '["Click the link sharp-sharp make dem no block your BVN","Forward the message give your colleagues make dem see am","Ignore the link, enter your bank branch or bank app go check by yourself","Reply the SMS with your BVN number"]'::jsonb,
  2,
  'Banks and CBN will never send SMS links asking you to update your BVN. Always verify through official banking channels.',
  'Bank or CBN no go ever send link say make you update BVN. Always check inside your official bank app.'
from public.modules where order_index = 1;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'How can you check if an email sender is genuinely from your bank?', 
  'How you fit take know say email truly come from your real bank?',
  '["Look at the sender display name only","Inspect the full email address domain after the @ symbol","Check if there is a bank logo attached in the footer","Trust it if the email addresses you by your first name"]'::jsonb,
  '["Look only the name wey show for top","Check the full email address domain after the @ symbol well-well","Check whether bank logo dey for under the email","Trust am if e call your correct name"]'::jsonb,
  1,
  'Scammers can fake the display name, but the exact domain after the @ symbol reveals the true sending server.',
  'Scammers fit put bank name as display name, but na the real domain after @ go show where the email truly come from.'
from public.modules where order_index = 1;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'A customer shows you a successful transfer SMS on their phone. What should you do before releasing goods?', 
  'Customer show you transfer SMS for their phone. Wetin you suppose do before you give dem market?',
  '["Inspect the SMS sender name carefully and hand over goods","Log into your own business bank app to confirm cleared funds","Call the customer''s phone number to verify","Take a photo of the customer''s phone screen and release the items"]'::jsonb,
  '["Check the SMS sender name well come release market","Open your own bank app confirm say the money don clear inside balance","Call the customer phone number verify","Snap the customer phone screen come give am goods"]'::jsonb,
  1,
  'SMS notifications can be spoofed using bulk SMS gateways. Never release goods until funds reflect in your available balance.',
  'Dem fit use bulk SMS fake alert. Never give market until you see the money inside your actual bank app balance.'
from public.modules where order_index = 2;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'What is a ''Flash Fund'' scam?', 
  'Wetin be ''Flash Fund'' scam?',
  '["A transaction that sends real money faster than usual","A temporary credit alert that disappears or bounces after a few hours","A special discount provided by Nigerian commercial banks","A mobile recharge promotion for retail merchants"]'::jsonb,
  '["Transfer wey dey fast pass normal one","Alert wey go show for balance small time but later disappear or bounce","Discount promo wey Nigerian bank dey do","Recharge card promo for traders"]'::jsonb,
  1,
  'Flash funds exploit clearing windows or fake ledger entries that appear temporarily and vanish before settlement.',
  'Flash fund na fake money wey go show for your screen temporary but no go settle inside your real account balance.'
from public.modules where order_index = 2;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'When accepting bank transfers in your store, what is the safest policy for cashier staff?', 
  'When customer dey transfer money for shop, wetin be the safest rule for cashier?',
  '["Accept screenshots of debit alerts as proof of payment","Mandate confirmation on the store''s official merchant terminal or notification app","Allow customers to leave if they promise to send receipt on WhatsApp","Trust transfers if the customer is wearing corporate attire"]'::jsonb,
  '["Accept debit alert screenshot as proof","Compulsory say cashier must see confirmation for shop official device or app","Allow customer make e go if e promise say e go send receipt for WhatsApp","Trust the transfer if the customer dress corporate"]'::jsonb,
  1,
  'Store policy should mandate verification on merchant devices only, never relying on customer-provided screenshots or devices.',
  'Shop policy must insist say na shop device or notification cashier go use confirm money, no be customer phone.'
from public.modules where order_index = 2;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'If a business computer suddenly displays a ransom note with locked files, what is the first step?', 
  'If shop computer suddenly lock all files come demand ransom money, wetin be first thing to do?',
  '["Pay the demanded cryptocurrency immediately to recover files","Immediately disconnect the computer from the network and Wi-Fi","Restart the computer repeatedly to see if files unlock","Email the attackers asking for a discount"]'::jsonb,
  '["Pay the crypto money dem demand sharp-sharp","Disconnect the computer from internet, Wi-Fi and network immediately","Restart the computer plenty times see whether e go open","Send email give scammers beg for discount"]'::jsonb,
  1,
  'Disconnecting the computer prevents ransomware from spreading across shared office networks and cloud sync folders.',
  'Disconnecting network sharp-sharp dey stop the ransomware make e no spread enter other computers for office.'
from public.modules where order_index = 3;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'What is the most effective defense against losing all business data to ransomware?', 
  'Wetin be the best way to protect your business make ransomware no destroy all your data?',
  '["Regular automated backups stored offline or in write-protected cloud storage","Hiding business spreadsheets in obscure computer folders","Renaming important accounting files every week","Using free cracked software found on public download sites"]'::jsonb,
  '["Regular backup wey save offline or inside secure cloud wey dem no fit overwrite","Hide accounting file inside corner folder","Change the name of your files every week","Use free pirated software wey you download for internet"]'::jsonb,
  0,
  'Offline and immutable cloud backups ensure you can restore clean data without ever paying ransoms to cybercriminals.',
  'Offline backup dey make sure say you fit restore your clean business records without paying kobo to criminals.'
from public.modules where order_index = 3;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'How do ransomware infections typically enter an SME office?', 
  'How ransomware dey usually enter SME business office?',
  '["Through official Windows operating system updates","Through malicious email attachments, fake invoice PDFs, or pirated software","Through certified POS payment machines provided by licensed banks","Through encrypted HTTPS website connections"]'::jsonb,
  '["Through original Windows update","Through bad email attachment, fake invoice PDF, or pirated software","Through original POS terminal from bank","Through secure HTTPS website"]'::jsonb,
  1,
  'Ransomware commonly disguises itself as unpaid invoice attachments, shipping notices, or cracked accounting software.',
  'Ransomware dey hide inside fake invoice attachment, receipt PDF, or cracked software wey staff download.'
from public.modules where order_index = 3;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'A WhatsApp contact asks you to send them a 6-digit code sent to your SMS because they entered the wrong number. What should you do?', 
  'Person for WhatsApp ask you say make you send am 6-digit code wey enter your SMS by mistake. Wetin you go do?',
  '["Send the code immediately to help them recover their account","Never share the code under any circumstances; it is your WhatsApp registration PIN","Post the code in a group chat to verify who owns it","Call the number back and read the numbers slowly"]'::jsonb,
  '["Send the code sharp-sharp make you e fit open e account","Never send the code at all; na your own WhatsApp verification PIN dem dey find","Drop the code for group make people check whose code e be","Call the person read the numbers give am"]'::jsonb,
  1,
  'That 6-digit SMS code is your WhatsApp verification code. Sharing it allows attackers to instantly hijack your account.',
  'That 6-digit SMS na your own WhatsApp login code. If you give dem, dem go instantly hijack your WhatsApp account.'
from public.modules where order_index = 4;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'What critical security feature prevents attackers from hijacking your business WhatsApp?', 
  'Which security setting dey prevent scammers from hijacking your business WhatsApp?',
  '["Two-Step Verification with a secret 6-digit PIN and email recovery","Changing your profile picture daily","Turning off read receipts (blue ticks)","Restricting who can see your ''About'' bio"]'::jsonb,
  '["Two-Step Verification with secret 6-digit PIN and backup email","Change your profile photo every day","Off read receipts (blue ticks)","Hide your ''About'' status"]'::jsonb,
  0,
  'WhatsApp Two-Step Verification requires your secret PIN whenever the app is re-registered on a new phone.',
  'Two-Step Verification dey require your secret PIN before anyone fit register your WhatsApp on any other phone.'
from public.modules where order_index = 4;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'If your business Instagram or WhatsApp is hijacked, how do scammers exploit your customers?', 
  'If scammers hijack your business Instagram or WhatsApp, how dem dey scam your customers?',
  '["They solicit fake investments, urgent loans, or fake product clearance sales to your contacts","They improve your business search engine optimization","They pay off pending merchant invoices","They automatically file tax clearance reports"]'::jsonb,
  '["Dem go post fake investment, beg for emergency loan, or sell fake market with your name","Dem go improve your website Google search","Dem go pay your supplier bills","Dem go file tax papers for government"]'::jsonb,
  0,
  'Hijacked accounts exploit existing trust to defraud loyal customers and business contacts with fake emergency requests.',
  'Dem dey use the trust wey your customers get for you take collect fake payments and fake emergency transfer.'
from public.modules where order_index = 4;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'A customer asks to plug their USB drive into your shop''s cashier computer to print a document. What should you do?', 
  'Customer bring flash drive say make you plug am for cashier computer make e print document. Wetin you suppose do?',
  '["Plug it directly into the cashier terminal with administrator privileges","Refuse or use an isolated, non-cashier terminal with up-to-date antivirus scanning","Run all executable files on the flash drive to find the document","Disable your antivirus so the file opens faster"]'::jsonb,
  '["Plug am direct for cashier computer wey handle money","Decline or use isolated computer wey no dey touch money with strong antivirus scan","Open all .exe files for the flash drive","Off your antivirus make the file open sharp-sharp"]'::jsonb,
  1,
  'Untrusted USB drives can carry auto-run worms and keyloggers that capture cashier passwords and financial credentials.',
  'Flash drive fit carry virus or keylogger wey go record cashier passwords and steal shop account details.'
from public.modules where order_index = 5;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'What does a hardware or software keylogger do?', 
  'Wetin keylogger dey do for computer?',
  '["It improves keyboard typing speed and fixes spelling","It covertly records every keystroke, including passwords and banking PINs","It cleans dust and debris from physical keyboards","It encrypts store databases for secure transport"]'::jsonb,
  '["E dey make typing speed fast","E dey secretly record every key wey you press, including bank password and PIN","E dey clean keyboard dust","E dey protect shop database"]'::jsonb,
  1,
  'Keyloggers record keyboard inputs and transmit typed passwords, bank credentials, and customer data to attackers.',
  'Keylogger dey secretly copy all passwords and secret PINs wey you type come send dem give scammers.'
from public.modules where order_index = 5;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'You find an unbranded flash drive lying on the counter outside your store. What is the safest action?', 
  'You see flash drive wey somebody drop for your shop counter. Wetin be the safest thing to do?',
  '["Plug it into your cashier computer to see who owns it","Do not plug it in; treat it as an intentional malicious drop and report to management","Format it on your main accounting server and use it for backups","Share it with cashier staff for storing personal music"]'::jsonb,
  '["Plug am inside shop cashier computer see who get am","No plug am at all; na trap wey scammers dey drop, report to shop manager","Format am for accounting computer use am do backup","Give staff make dem use am put music"]'::jsonb,
  1,
  '''USB drop'' attacks rely on curiosity to trick employees into plugging infected drives into company networks.',
  'Criminals dey deliberately drop flash drive make curious staff plug am infect business computer.'
from public.modules where order_index = 5;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'Your business phone suddenly loses cellular signal and shows ''No Service'' for hours during business hours. What should you do?', 
  'Your business line suddenly lose network, show ''No Service'' for hours for broad daylight. Wetin you suppose do?',
  '["Wait until tomorrow to see if telecom network maintenance finishes","Immediately contact your telecom operator and freeze linked bank accounts to prevent SIM swap fraud","Turn airplane mode on and off and ignore incoming banking emails","Assume your SIM card expired and buy a random new line"]'::jsonb,
  '["Wait till tomorrow see whether network go come back","Call your telecom telco sharp-sharp and alert your bank make dem hold account against SIM swap","Put airplane mode on and off come relax","Think say SIM don expire go buy another one"]'::jsonb,
  1,
  'Sudden persistent loss of network on a phone line linked to bank accounts is the primary indicator of an ongoing SIM swap.',
  'Sudden loss of network for line wey link to your bank account na major sign say scammers dey do SIM swap.'
from public.modules where order_index = 6;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'How do criminals use SIM swaps to drain SME bank accounts?', 
  'How criminals dey use SIM swap take clear money from business bank account?',
  '["They clone the merchant''s physical ATM card","They intercept bank SMS OTPs and reset banking passwords using the swapped SIM number","They disable the store''s electricity meter","They impersonate POS terminal hardware manufacturers"]'::jsonb,
  '["Dem go clone your ATM card","Dem go intercept bank OTPs and reset your bank passwords with the new swapped SIM","Dem go off light for your shop","Dem go pretend to be POS factory company"]'::jsonb,
  1,
  'By controlling your phone number, criminals receive one-time passwords (OTPs) and password reset links for your bank accounts.',
  'Once dem get your number, all bank OTP and password reset go enter their hand direct.'
from public.modules where order_index = 6;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'What safeguard best protects your business phone number from unauthorized telecom porting or swaps?', 
  'Which protection best dey stop scammers from swapping or porting your business line?',
  '["Setting a strict alphanumeric PIN/passcode with your telecom carrier and avoiding public exposure of bank-linked numbers","Turning off phone notifications at night","Using only 3G network mode","Never using mobile recharge cards"]'::jsonb,
  '["Put strong secret PIN with your telecom network and no dey expose bank line for public anyhow","Off notification for night","Use only 3G network","Stop to buy recharge card"]'::jsonb,
  0,
  'Telco account PINs and separating public business advertising lines from confidential bank-linked lines stops SIM swaps.',
  'Putting security PIN with your network and separating public customer line from bank line dey prevent swap.'
from public.modules where order_index = 6;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'A customer insists on holding the POS terminal out of your sight while entering their card details. What should you do?', 
  'Customer insist say make e hold the POS terminal hide am enter card under counter. Wetin you suppose do?',
  '["Allow them complete privacy under the counter","Ensure the terminal remains on the counter within clear view, allowing privacy only for entering the secret PIN","Turn off the POS terminal screen","Ask the customer to tell you their 4-digit PIN instead"]'::jsonb,
  '["Allow am hide the terminal under counter do anything e like","Make sure the POS remain on top counter where you fit see am, allow privacy only when e dey punch secret PIN","Off the POS screen","Tell customer make e shout e 4-digit PIN give you"]'::jsonb,
  1,
  'Keep terminals in clear sight to prevent skimming devices, card swapping, or unauthorized hardware tampering.',
  'Make POS dey always visible for counter make person no fit swap terminal or put skimming device inside.'
from public.modules where order_index = 7;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'What physical inspection should POS operators perform every morning before starting transactions?', 
  'Which physical check POS agent suppose do every morning before e start work?',
  '["Inspect terminal seals, card slot, and serial number for signs of tampering, looseness, or device swapping","Clean the terminal with soapy water and bleach","Change the paper roll five times","Leave the terminal on the street overnight"]'::jsonb,
  '["Check the terminal body, card slot, and serial number say nobody tamper or swap the machine","Wash the terminal with soap and bleach","Change paper roll five times","Leave the machine outside for night"]'::jsonb,
  0,
  'Daily checks ensure no skimmers are attached and that rogue actors have not swapped your terminal for a compromised device.',
  'Checking serial number and card slot every morning dey prevent rogue device swap and skimming.'
from public.modules where order_index = 7;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'A stranger claims to be an official POS maintenance technician sent to upgrade terminal software without prior bank notification. What should you do?', 
  'Person come say na engineer sent to upgrade your POS machine software, but your bank no tell you. Wetin you go do?',
  '["Hand over the POS terminal immediately without questions","Refuse access, verify directly with your official bank relationship officer or aggregator before allowing anyone to touch the device","Give them your supervisor admin password","Leave them alone with the device while you take lunch"]'::jsonb,
  '["Give am the POS machine make e carry go","Refuse, call your official bank account officer or company verify before anyone touch the device","Give am your admin password","Leave am with the machine make you go chop"]'::jsonb,
  1,
  'Fraudsters impersonate technicians to clone terminals or harvest keys. Never surrender terminals without verified authorization.',
  'Scammers dey pretend to be engineers to swap machine or steal data. Always call your bank confirm first.'
from public.modules where order_index = 7;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'Why is using the same password for your business email, bank portal, and social media dangerous?', 
  'Why e dey very dangerous to use the same password for shop email, bank, and social media?',
  '["If one service suffers a data breach, attackers can easily unlock all your other business accounts","Passwords expire faster when shared across multiple websites","Internet connection becomes significantly slower","It confuses web browser password autofill"]'::jsonb,
  '["If one website leak your password, scammers go use that same password open all your other accounts","Password go expire fast if e too many","Internet network go slow down","Browser no go sabi save password"]'::jsonb,
  0,
  'Credential stuffing attacks use passwords leaked from minor sites to automatically breach critical banking and business accounts.',
  'Once scammers get your password from one small site, dem go use am try log into your bank and business email.'
from public.modules where order_index = 8;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'Which of the following represents the strongest password strategy for an SME accounting system?', 
  'Which of these na the strongest password method for business accounting computer?',
  '["ShopName2024! (easily guessed by anyone familiar with the store)","A unique passphrase of 4-5 random words with symbols and numbers (e.g., Mango#Bridge9Yellow!Desk)","12345678Admin","The business owner''s birthday and child''s name"]'::jsonb,
  '["ShopName2024! (anybody wey know shop fit guess am)","Long passphrase with 4-5 different words plus symbols and numbers (e.g., Mango#Bridge9Yellow!Desk)","12345678Admin","Birthday and pikin name"]'::jsonb,
  1,
  'Long passphrases (16+ characters) composed of multiple unrelated words with numbers and symbols are nearly impossible to brute-force.',
  'Long passphrase with 4 or 5 different words and symbols dey hard pass computer to guess or crack.'
from public.modules where order_index = 8;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'Where is the safest place to store complex business passwords?', 
  'Where be the safest place to keep strong business passwords?',
  '["On a yellow sticky note pasted to the cashier computer monitor","In a reputable, encrypted password manager with master password and 2FA","In a shared WhatsApp group chat with all store employees","In an unencrypted text file on the desktop labeled ''PASSWORDS.txt''"]'::jsonb,
  '["For paper sticky note paste for computer screen","Inside secure encrypted password manager with master password and 2FA","Drop am for shop general WhatsApp group","Put am inside notepad for desktop name am ''PASSWORDS.txt''"]'::jsonb,
  1,
  'Encrypted password managers protect credentials behind zero-knowledge encryption and eliminate password reuse.',
  'Encrypted password manager dey lock your passwords securely with strong encryption and master key.'
from public.modules where order_index = 8;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'Why do software companies frequently release app updates and security patches?', 
  'Why software company dey always release update and security patch?',
  '["To consume extra mobile data on your business phone","To repair known security vulnerabilities that cybercriminals actively exploit","To delete old business records automatically","To slow down older smartphones intentionally"]'::jsonb,
  '["Make e consume your phone data","To fix security holes wey hackers dey use attack phones and computers","To delete your old shop files","To make old phone slow down intentionally"]'::jsonb,
  1,
  'Updates patch security flaws. Delaying updates leaves your systems vulnerable to automated malware tools.',
  'Updates dey block security holes. If you no update, scammers fit enter your phone or computer easily.'
from public.modules where order_index = 9;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'An employee''s phone used for business banking is running an Android version from 6 years ago that no longer receives updates. What risk does this present?', 
  'Staff dey use 6-year-old Android phone do shop bank transfer, and the phone no dey get updates again. Wetin be the risk?',
  '["No risk as long as the screen is clean","High risk: unpatched vulnerabilities allow malware to intercept banking sessions and steal OTPs","Low risk because older phones cannot connect to the internet","Zero risk if the phone uses a PIN lock"]'::jsonb,
  '["No risk as long as screen clean","High risk: security holes go allow malware enter phone steal banking OTP and password","Small risk because old phone no dey fast","No risk at all if e get PIN lock"]'::jsonb,
  1,
  'Devices past end-of-life have unpatched exploits that attackers can use without user interaction.',
  'Old phones wey no dey get updates get plenty security holes wey scammers fit use steal bank money.'
from public.modules where order_index = 9;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'What should you do when prompted with an official security update on your store''s POS terminal or business laptop?', 
  'When official security update prompt pop up for your shop laptop or POS, wetin you suppose do?',
  '["Click ''Remind me in 6 months'' indefinitely","Install the update promptly during non-peak business hours","Immediately uninstall the operating system","Ignore it until the computer breaks down"]'::jsonb,
  '["Click ''Remind me in 6 months'' every time","Install the update quick-quick when shop no too busy or during closing","Delete the whole operating system","Ignore am till computer crash"]'::jsonb,
  1,
  'Installing updates promptly ensures your business defenses stay current against newly discovered cyber threats.',
  'Installing updates on time dey protect your business against new cyber attack tactics.'
from public.modules where order_index = 9;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'While traveling for business at an airport or cafe, you connect to ''Free_Public_WiFi''. What risk do you face when doing bank transfers?', 
  'You dey airport or hotel come connect ''Free_Public_WiFi''. Wetin fit happen if you do bank transfer on top?',
  '["Attackers on the same network can intercept unencrypted traffic and redirect you to cloned phishing portals","Your phone battery life will instantly drop to zero","Your phone SIM card will be physically ejected","The coffee shop will automatically charge your credit card"]'::jsonb,
  '["Hackers on the same network fit intercept your traffic and redirect you enter fake bank page","Phone battery go die one time","Your SIM card go drop out of the phone","The cafe go charge your card automatically"]'::jsonb,
  0,
  'Public open Wi-Fi lacks encryption, allowing adversaries to perform ''Man-in-the-Middle'' attacks and capture sensitive traffic.',
  'Open public Wi-Fi no get protection; scammers fit position themselves intercept your data and login credentials.'
from public.modules where order_index = 10;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'What is the safest way to access business bank accounts when outside the office?', 
  'Wetin be the safest way to access business bank account when you dey outside office?',
  '["Use free unencrypted Wi-Fi hotspots at shopping plazas","Use your mobile cellular data (4G/5G) or a trusted VPN connection","Ask a stranger to tether their phone to yours","Use public internet cafe terminals"]'::jsonb,
  '["Use free open Wi-Fi for plaza","Use your own cellular mobile data (4G/5G) or trusted VPN","Beg stranger make e share hotspot give you","Enter public cyber cafe computer"]'::jsonb,
  1,
  'Cellular carrier data (4G/5G) is encrypted between your phone and base station, providing vastly superior security over public Wi-Fi.',
  'Your mobile cellular data (4G/5G) dey safe pass public Wi-Fi because e get built-in telecom encryption.'
from public.modules where order_index = 10;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'What is an ''Evil Twin'' Wi-Fi hotspot attack?', 
  'Wetin be ''Evil Twin'' Wi-Fi attack?',
  '["A fake Wi-Fi hotspot created by scammers with the exact name of a legitimate hotel, airport, or mall to snoop on connections","A router with two antennas instead of one","A Wi-Fi connection that only connects at night","A telecom tower shared between two Nigerian mobile carriers"]'::jsonb,
  '["Fake Wi-Fi wey scammers create with the same name as hotel or airport make people connect snoop their traffic","Router wey get two antennas","Wi-Fi wey dey work only for night","Telecom mast wey two networks dey share"]'::jsonb,
  0,
  'Attackers set up rogue hotspots with familiar names (e.g., ''Airport_Free_WiFi'') to trick devices into connecting through their sniffing gear.',
  'Scammers dey put fake Wi-Fi with legitimate name make people connect, then dem go monitor everything you dey do.'
from public.modules where order_index = 10;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'You receive an email from your regular supplier stating their bank details have changed and asking you to pay today''s invoice into a new account. What is your mandatory action?', 
  'You receive email from your supplier say their bank account don change, make you pay today invoice enter new bank. Wetin you MUST do?',
  '["Immediately pay into the new account to avoid shipment delays","Call the supplier on their verified known phone number (out-of-band) to confirm before paying a single kobo","Reply to the email asking ''Are you sure this is correct?''","Forward the new bank details to your cashier to process right away"]'::jsonb,
  '["Pay the new account sharp-sharp make goods no delay","Call the supplier direct with their normal known phone number confirm well before you pay kobo","Reply the email ask ''Abi na true?''","Forward the new account give cashier make e pay"]'::jsonb,
  1,
  'Supplier account change requests via email are classic Business Email Compromise (BEC). Always verify by phone using a trusted number.',
  'Change of bank account for email na major scam sign. Always pick phone call your supplier direct verify.'
from public.modules where order_index = 11;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'How do cybercriminals execute Business Email Compromise (BEC)?', 
  'How cybercriminals dey take do Business Email Compromise (BEC)?',
  '["By hacking or spoofing executive or vendor email accounts and silently observing conversations until an invoice is due","By physically stealing cardboard invoice boxes from store warehouses","By blocking postal mail couriers in traffic","By disconnecting office landline phone wires"]'::jsonb,
  '["Dem go hack or spoof supplier email, monitor conversations quietly till invoice time come change bank account","Dem go steal physical paper invoice from warehouse","Dem go hold postman for traffic","Dem go cut landline wire"]'::jsonb,
  0,
  'BEC attackers monitor legitimate email chains for months, then intervene at payment time with slightly modified bank accounts.',
  'Scammers dey watch email discussions for weeks, then once payment time reach, dem go slip in fake bank account.'
from public.modules where order_index = 11;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'Which policy best protects an SME from paying millions into fraudulent supplier accounts?', 
  'Which shop rule best dey protect business make dem no go pay millions enter scammer account?',
  '["Dual authorization policy: two managers must independently approve all account change requests after verbal phone verification","Allowing cashiers to approve transfers under 500,000 Naira on their own discretion","Accepting scanned bank reference letters attached to unverified emails","Only making payments late on Friday afternoons"]'::jsonb,
  '["Two-person sign-off rule: two managers must independently verify and confirm any account change by voice call","Allow cashier make e approve transfers by himself","Trust scanned bank letter wey attach for email","Dey pay only for Friday night"]'::jsonb,
  0,
  'A strict dual-authorization policy requiring two independent verifications prevents single-point failure in payment approvals.',
  'Strict policy wey require two managers verify bank change on phone dey prevent catastrophic fraud.'
from public.modules where order_index = 11;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'A social media ad offers brand-new wholesale stock at 80% below market price, payable only via direct personal bank transfer. What should you conclude?', 
  'Social media ad show brand-new wholesale goods at 80% discount, but say na personal bank transfer only dem accept. Wetin you suppose know?',
  '["It is a legitimate clearance sale that you should purchase immediately","It is almost certainly a clone/scam storefront created to steal your funds without delivering goods","It is subsidized by the federal government","The seller is a close relative of the manufacturer"]'::jsonb,
  '["Na genuine clearance promo, buy am quick","Na 99% fake scam account wey wan chop your money run without giving you goods","Na government subsidy promo","The seller na relative to company owner"]'::jsonb,
  1,
  'Prices that appear too good to be true, paired with demands for non-reversible personal transfers, are hallmarks of fraudulent shops.',
  'Prices wey too cheap pass normal market coupled with personal bank transfer na direct trap.'
from public.modules where order_index = 12;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'How can you check if an online merchant vendor is genuine before sending large wholesale payments?', 
  'How you fit check whether online seller na genuine company before you transfer big money?',
  '["Count how many followers they purchased on Instagram","Verify their CAC registration, physical warehouse address, and inspect reviews on independent forums","Check if they posted attractive photos with high-end cars","Trust them if they have a verified blue checkmark on TikTok"]'::jsonb,
  '["Count their Instagram followers","Check their CAC registration, visit their physical shop address, and check independent customer reviews","Check whether dem snap picture with fine car","Trust am if e get blue tick for TikTok"]'::jsonb,
  1,
  'Followers and blue checkmarks can be bought. Verifiable physical presence and official Corporate Affairs Commission (CAC) status protect you.',
  'Followers and badges fit be bought. Physical address and CAC company verification na the real proof.'
from public.modules where order_index = 12;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'What is ''domain spoofing'' or ''typosquatting'' used by fake online suppliers?', 
  'Wetin be ''typosquatting'' or fake website link wey scammers dey use?',
  '["Registering a web address that looks nearly identical to a real supplier (e.g., paystak-secure.com instead of paystack.com)","Offering free delivery during weekend promotions","Selling refurbished electronics as second-hand goods","Translating a website from English to French"]'::jsonb,
  '["Register website address wey look like real one (e.g., paystak-secure.com instead of paystack.com)","Offer free delivery on weekend","Sell used electronics as second hand","Translate site go French"]'::jsonb,
  0,
  'Typosquatting mimics real company domains with subtle spelling differences to trick merchants into submitting payments to fraudsters.',
  'Scammers dey register website name wey resemble original company make you think say na real website.'
from public.modules where order_index = 12;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'You receive a phone call that sounds exactly like your business owner demanding an emergency cash transfer right now. What should you do?', 
  'You receive phone call wey sound exactly like your boss voice dey shout say make you transfer money immediately. Wetin you suppose do?',
  '["Transfer the company funds immediately to obey your boss","Hang up and call the owner back on their verified saved number, or confirm with a pre-arranged secret verbal safe-word","Send cash via public transport courier","Transfer half the money as a compromise"]'::jsonb,
  '["Transfer the money quick make boss no vex","Drop call come call your boss back with your own saved line, or ask for your secret family/office safe-word","Send cash with driver","Send half of the money"]'::jsonb,
  1,
  'Generative AI can clone anyone''s voice with just 3 seconds of audio. Always disconnect and call back on trusted numbers or use code words.',
  'AI fit clone person voice cleanly now. Always cut call come dial your boss direct on their known line.'
from public.modules where order_index = 13;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'What is ''Vishing'' (Voice Phishing)?', 
  'Wetin be ''Vishing'' (Voice Phishing)?',
  '["Phishing attacks executed over telephone calls to trick victims into revealing sensitive banking tokens or passwords","Recording promotional voice notes for radio broadcast","Leaving WhatsApp voice notes for customer birthdays","Singing cybersecurity jingles in company meetings"]'::jsonb,
  '["Phishing scam wey dem dey do through phone call take deceive you give dem bank details or OTP","Record voice note for radio","Drop WhatsApp voice note for birthday","Sing security song for meeting"]'::jsonb,
  0,
  'Vishing uses live or AI-assisted phone calls pretending to be bank security agents, telecom reps, or law enforcement.',
  'Vishing na phone call scam where criminals pretend to be bank officer or police make you give dem your secret codes.'
from public.modules where order_index = 13;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'A caller claiming to be from your bank''s fraud department says your account is under attack and asks you to read back the SMS code on your screen. What do you do?', 
  'Caller say na bank fraud team e be, say attack dey happen for your account make you read the SMS code for your phone. Wetin you go do?',
  '["Read the code quickly to stop the fraud attack","Refuse and end the call immediately; banks never call to ask for OTPs or login tokens","Ask the caller for their staff identification number and then share the code","Forward the SMS to the caller on WhatsApp"]'::jsonb,
  '["Read the code sharp-sharp make e help you block the attack","Refuse come cut the call immediately; bank no go ever call ask for your OTP","Ask for e staff ID number then give am the code","Send the SMS give am for WhatsApp"]'::jsonb,
  1,
  'Real bank fraud teams will NEVER call asking for an OTP. The caller is the attacker trying to trigger a transaction.',
  'Real bank fraud team no go ever call ask you for OTP. Na the caller be the criminal wey wan transfer your money.'
from public.modules where order_index = 13;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'What is ''Quishing'' (QR Code Phishing)?', 
  'Wetin be ''Quishing'' (QR Code Phishing)?',
  '["Using malicious QR codes that redirect victims to cloned phishing sites or initiate malicious downloads","Generating barcodes for supermarket grocery scanning","Using quick reply buttons on Instagram stories","Scanning receipts for tax deductions"]'::jsonb,
  '["Using bad QR code wey go carry you go fake website or download virus enter your phone","Generate barcode for supermarket","Quick reply button for Instagram","Scan tax receipt"]'::jsonb,
  0,
  'Because humans cannot read raw QR code URLs, scammers replace legitimate payment QR stickers with fake ones leading to phishing sites.',
  'Person eye no fit read QR code direct, so scammers dey paste fake QR sticker over original shop payment code.'
from public.modules where order_index = 14;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'What physical tampering should cashiers inspect on store payment QR counter stands?', 
  'Which check cashier suppose do on top shop payment QR code stand?',
  '["Inspect to ensure no fake sticker has been pasted over the store''s original payment QR code","Ensure the QR code has a bright green border","Spray perfume on the QR code daily","Cover the QR code with cardboard during business hours"]'::jsonb,
  '["Check say nobody paste fake sticker on top of your shop original payment QR code","Check whether green border dey","Spray perfume on top QR code","Cover the code with cardboard"]'::jsonb,
  0,
  'Fraudsters routinely paste fraudulent QR stickers over shop counter displays, causing customer payments to divert to criminal wallets.',
  'Scammers dey paste fake QR sticker cover shop original code make customer transfer go their own account.'
from public.modules where order_index = 14;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'When you scan a QR code on your phone, what should you verify before proceeding?', 
  'When you scan QR code for phone, wetin you suppose check before you proceed?',
  '["Look at the full preview URL destination to confirm it points to the genuine, official domain","Confirm your phone battery has at least 80% charge","Scan the code three times repeatedly","Turn off your mobile data connection"]'::jsonb,
  '["Check the full website link wey pop up confirm say na original company domain","Check say battery reach 80%","Scan the code three times","Off your mobile data"]'::jsonb,
  0,
  'Always inspect the destination preview URL shown by your phone camera before tapping open or entering login details.',
  'Always check the preview website link wey your phone camera show before you click open or enter details.'
from public.modules where order_index = 14;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'If a business smartphone containing customer records and banking apps is stolen, what immediate actions must be taken?', 
  'If dem thief shop phone wey get customer records and bank apps, wetin you must do immediately?',
  '["Remotely wipe the device, block the SIM line with telecom operator, and change all banking and email passwords immediately","Wait 48 hours to see if someone returns it to the police station","Send friendly SMS messages to the phone offering to buy it back","Delete the store''s social media page"]'::jsonb,
  '["Wipe the phone remotely, block the SIM card with network, and change all bank and email passwords sharp-sharp","Wait 48 hours maybe person go bring am back","Send text message beg the thief make e sell am back give you","Delete your shop Facebook page"]'::jsonb,
  0,
  'Immediate remote wipe and SIM deactivation prevent thieves from resetting banking PINs or exfiltrating customer records.',
  'Wiping the phone and blocking the line sharp-sharp dey stop thief from entering your bank apps or stealing customer data.'
from public.modules where order_index = 15;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'Under the Nigeria Data Protection Act (NDPA 2023), why is leaving customer databases unencrypted on laptops illegal?', 
  'Under NDPA 2023 law, why e dey illegal to leave customer database on laptop without encryption?',
  '["The law mandates technical safeguards to protect Nigerian citizens'' sensitive personal data from breach or unauthorized disclosure","The law requires all customer data to be stored on paper ledgers only","Laptops are required to be shared publicly with tax inspectors","It prevents software companies from selling operating systems"]'::jsonb,
  '["The law require strong security protection so that customer private information no go leak enter wrong hands","The law say na only paper notebook shop fit use","Laptops must be shared with tax collectors","E dey stop software sales"]'::jsonb,
  0,
  'NDPA 2023 legally obligates businesses to protect customer personal and financial data using encryption and access controls.',
  'NDPA 2023 law dey mandate all businesses to lock and protect customer data with encryption make e no leak.'
from public.modules where order_index = 15;

insert into public.quiz_questions (module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm)
select id, 
  'What is the ''3-2-1 Backup Rule'' every SME should implement?', 
  'Wetin be the ''3-2-1 Backup Rule'' wey every shop suppose dey use?',
  '["3 copies of critical business data, on 2 different types of media, with 1 copy stored securely offsite or in cloud storage","Backing up data every 3 hours for 2 minutes with 1 cashier","Having 3 laptops, 2 smartphones, and 1 POS machine","Saving 3 spreadsheets in 2 folders on 1 flash drive"]'::jsonb,
  '["3 copies of your data, for 2 different storage types, with 1 copy saved offsite or inside secure cloud","Backup every 3 hours for 2 minutes with 1 staff","Get 3 laptops, 2 phones, and 1 POS","Save 3 files for 2 folders for 1 flash drive"]'::jsonb,
  0,
  'The 3-2-1 rule guarantees business continuity against device theft, fire, hardware failure, and ransomware.',
  '3-2-1 rule dey make sure say even if theft, fire, or crash happen, your shop data and accounts dey 100% safe.'
from public.modules where order_index = 15;

