const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function insertQuestionsViaAPI() {
  // Get all module IDs
  const { data: modules } = await supabase
    .from('modules')
    .select('id, order_index')
    .order('order_index');

  if (!modules || modules.length === 0) {
    console.error('No modules found!');
    process.exit(1);
  }

  const mMap = {};
  modules.forEach((m) => (mMap[m.order_index] = m.id));
  console.log('Module IDs loaded:', Object.keys(mMap).length, 'modules');

  const questions = [
    // MODULE 1: Phishing & Fake Alerts
    {
      module_id: mMap[1],
      question_en:
        'You receive an email from your bank saying your account will be blocked unless you click a link and verify your BVN within 24 hours. What should you do first?',
      question_pcm:
        'You receive email from your bank say dem go block your account unless you click link verify your BVN within 24 hours. Wetin you go do first?',
      options_en: [
        'Call your bank directly using the official number on the back of your debit card or their verified website',
        'Click the link to check if the warning is genuine before it is too late',
        'Reply to the email with your BVN details to prevent suspension',
        'Ask a friend or colleague to click the link on your behalf',
      ],
      options_pcm: [
        'Call your bank direct with official number wey dey back of your ATM card or their real website',
        'Click the link first make you check whether the warning na true before time run out',
        'Reply the email with your BVN details so dem no go block the account',
        'Ask your friend or colleague make dem click the link for you',
      ],
      correct_option_index: 0,
      explanation_en:
        'Legitimate banks never request sensitive details through email links. Always verify bank communications by calling the official number you already have — not a number from the suspicious message.',
      explanation_pcm:
        'Real bank no dey ever ask you to give sensitive details through email link. Always verify bank message by calling official number wey you already get, not number wey dem give inside the suspicious message.',
    },
    {
      module_id: mMap[1],
      question_en:
        'A staff member receives an SMS with a link claiming to be from a courier company about an unexpected package delivery. They did not order anything. What is the safest action?',
      question_pcm:
        'Your worker receive SMS with link wey say na courier company dey deliver unexpected package. Dem no order anything. Wetin be the safest thing to do?',
      options_en: [
        'Do not click the link; contact the courier company directly using their official number',
        'Click the link to find out what the package is about',
        'Forward the link to the business owner to decide',
        'Share the link on the company WhatsApp group so others can investigate',
      ],
      options_pcm: [
        'No click the link; reach the courier company directly using official number from their real website',
        'Click the link make you see wetin the package be about',
        'Send the link give the business owner to decide',
        'Share the link for company WhatsApp group so others can check am',
      ],
      correct_option_index: 0,
      explanation_en:
        'Unexpected delivery SMS messages with links are a classic phishing technique. Never click unsolicited links. Contact the courier directly through their verified official website or trusted phone number.',
      explanation_pcm:
        'Unexpected delivery SMS with link na classic phishing method. No click any unsolicited link. Contact the courier directly through their real official website or trusted phone number.',
    },
    // MODULE 2: Fake Payment / Flash Funds
    {
      module_id: mMap[2],
      question_en:
        'A customer purchases goods worth ₦200,000 and shows you a bank transfer screenshot on their phone as proof of payment. They are demanding you release the goods immediately. What is the safest step?',
      question_pcm:
        'Customer buy goods worth ₦200,000 and show you bank transfer screenshot on their phone say dem don pay. Dem dey rush you to release the goods immediately. Wetin be the safest step?',
      options_en: [
        'Log into your own banking app or visit your bank to confirm the credit has arrived before releasing goods',
        'Accept the screenshot receipt as sufficient proof and release the goods',
        "Call the customer's bank to verify the transaction on their behalf",
        'Release the goods first and call your bank to verify while the customer is still present',
      ],
      options_pcm: [
        'Login your own banking app or go your bank to confirm say the credit don enter your account before you release anything',
        'Accept the screenshot receipt as enough proof and release the goods',
        'Call the customer own bank to verify the transaction for dem',
        'Release the goods first and call your bank to verify while the customer still dey present',
      ],
      correct_option_index: 0,
      explanation_en:
        'Screenshots can be easily edited. The only safe way to confirm payment is by checking your own bank account directly. Always verify the credit has actually arrived in your account before releasing any goods.',
      explanation_pcm:
        'Screenshots fit be edited. The only safe way to confirm payment na to check your own bank account directly. Always verify say the credit don actually enter your account before you release any goods.',
    },
    {
      module_id: mMap[2],
      question_en:
        'Why is releasing goods based on a payment screenshot particularly dangerous for a Nigerian small business owner?',
      question_pcm:
        'Why e dey very dangerous to release goods based on payment screenshot for Nigerian small business owner?',
      options_en: [
        'Screenshots can be digitally edited to show false payment details that appear completely genuine',
        'The bank may automatically reverse the payment after 48 hours as a standard policy',
        'Screenshot receipts expire after a short period and become invalid as proof of payment',
        'Customers who use screenshots are typically attempting to avoid paying tax on the transaction',
      ],
      options_pcm: [
        'Screenshots fit be edited to show fake payment details wey go look real proper-proper',
        'The bank fit automatically reverse the payment after 48 hours as standard policy',
        'Screenshot receipts dey expire after small time and no fit remain valid as proof of payment',
        'Customers wey dey use screenshots usually dey try to avoid paying tax on the transaction',
      ],
      correct_option_index: 0,
      explanation_en:
        'Digital receipts and bank alert screenshots are trivially easy to fake using simple photo editing tools. A fraudster who has edited a payment screenshot counts on the merchant not verifying the actual account credit.',
      explanation_pcm:
        'Digital receipts and bank alert screenshots dey very easy to fake using simple photo editing tool. Fraudster wey don edit payment screenshot dey count on the merchant not to verify the actual account credit.',
    },
    // MODULE 3: Ransomware
    {
      module_id: mMap[3],
      question_en:
        'Which combination of behaviours most effectively reduces the risk of ransomware permanently destroying your business records?',
      question_pcm:
        'Which combination of behaviours most effectively reduce the risk of ransomware permanently destroying your business records?',
      options_en: [
        'Keeping regular tested backups in a separate location and installing software updates promptly',
        'Using a strong email password and changing it every month without exception',
        'Turning off Wi-Fi at night and unplugging all devices when not in use',
        'Only opening email attachments from senders you recognise by their display name',
      ],
      options_pcm: [
        'Dey keep regular tested backup for separate location and dey install software update sharp-sharp when e dey available',
        'Dey use strong email password and dey change am every month without exception',
        'Dey turn off Wi-Fi at night and unplug all devices when you no dey use them',
        'Only dey open email attachment from sender wey you recognise by their display name',
      ],
      correct_option_index: 0,
      explanation_en:
        'The two most effective ransomware defences are: (1) tested backups in a separate location so you can restore without paying, and (2) patching software promptly to close known vulnerabilities before attackers exploit them.',
      explanation_pcm:
        'The two most effective ransomware defence na: (1) tested backup for separate location so you fit restore without paying, and (2) patching software quickly to close known vulnerability before attackers exploit them.',
    },
    {
      module_id: mMap[3],
      question_en:
        'Ransomware has locked all your business files and demands cryptocurrency payment before a countdown expires. What is the correct response?',
      question_pcm:
        'Ransomware lock all your business files and message dey demand cryptocurrency payment before countdown expire. Wetin be the correct response?',
      options_en: [
        'Disconnect the device from all networks immediately, do not pay the ransom, and restore from a clean backup',
        'Pay the ransom as quickly as possible before the countdown expires to recover your files',
        'Restart the computer multiple times to attempt to unlock the files without paying',
        'Delete all files from the infected device to prevent the ransomware from spreading',
      ],
      options_pcm: [
        'Disconnect the device from all networks immediately, no pay the ransom, and restore your data from clean backup',
        'Pay the ransom as fast as possible before the countdown expire to recover your files',
        'Restart the computer many times to try to unlock the files without paying',
        'Delete all files from the infected device to prevent the ransomware from spreading',
      ],
      correct_option_index: 0,
      explanation_en:
        'Paying ransomware attackers does not guarantee file recovery and directly funds future attacks. Isolate the device, do not pay, and restore from a tested backup. Regular backups are your most important defence.',
      explanation_pcm:
        'Paying ransomware attackers no guarantee say you go recover your files and your money dey fund future attacks. Isolate the device, no pay, and restore from tested backup. Regular backup na your most important defence.',
    },
    // MODULE 4: Social Media & WhatsApp Account Takeover
    {
      module_id: mMap[4],
      question_en:
        'Your business WhatsApp stops working and you receive a message saying your account has been moved to a new device. What most likely happened?',
      question_pcm:
        'Your business WhatsApp suddenly stop working and you receive message say dem don move your account to new device. Wetin most likely happen?',
      options_en: [
        'Someone obtained your six-digit WhatsApp OTP and registered your number on their own device',
        'WhatsApp automatically updated and migrated your account as part of a routine process',
        'Your SIM card has expired and your network provider has deactivated your number',
        'Your phone storage is full and WhatsApp has temporarily suspended the account',
      ],
      options_pcm: [
        'Someone get your six-digit WhatsApp verification OTP and register your number for their own device',
        'WhatsApp automatically update and migrate your account as part of routine process',
        'Your SIM card don expire and your network provider don deactivate your number',
        'Your phone storage don full and WhatsApp don temporarily suspend the account',
      ],
      correct_option_index: 0,
      explanation_en:
        "WhatsApp account takeover happens when a fraudster tricks you into sharing the six-digit registration OTP. Never share OTP codes with anyone — not even someone claiming to be from WhatsApp.",
      explanation_pcm:
        "WhatsApp account takeover dey happen when fraudster trick you to share the six-digit registration OTP. Never share OTP code with anybody — not even somebody wey claim say dem be from WhatsApp.",
    },
    {
      module_id: mMap[4],
      question_en:
        'Which single setting provides the strongest protection against WhatsApp business account takeover?',
      question_pcm:
        'Which single setting dey provide the strongest protection against WhatsApp business account takeover?',
      options_en: [
        'Enabling Two-Step Verification in WhatsApp settings with a strong personal PIN you have not shared with anyone',
        'Changing your profile photo and display name regularly to confuse potential attackers',
        'Setting your Last Seen and Online status to visible only to your contacts',
        'Archiving sensitive business conversations to keep them hidden from the main inbox',
      ],
      options_pcm: [
        'Enable Two-Step Verification inside WhatsApp settings with strong personal PIN wey you never share with anybody',
        'Dey change your profile photo and display name regularly to confuse potential attackers',
        'Set your Last Seen and Online status to visible only to your contacts',
        'Archive sensitive business conversation to hide them from the main inbox',
      ],
      correct_option_index: 0,
      explanation_en:
        'Two-Step Verification adds a personal PIN required when registering your number on any new device. Even if an attacker obtains your OTP, they cannot complete the account takeover without your separate PIN.',
      explanation_pcm:
        'Two-Step Verification dey add personal PIN wey dem must enter when dem dey register your number for any new device. Even if attacker get your OTP, dem no fit complete the account takeover without your separate PIN.',
    },
    // MODULE 5: USB Malware & Keyloggers
    {
      module_id: mMap[5],
      question_en:
        'A customer asks to use your business computer to print a file from their USB drive. What is the safest response?',
      question_pcm:
        'Customer ask make dem use your business computer to print file from their USB drive. Wetin be the safest response?',
      options_en: [
        'Politely decline and explain that your computer is reserved for business use only',
        'Accept the request briefly since printing is a low-risk activity',
        'Ask the customer to wait while you run an antivirus scan on their USB first',
        'Ask a colleague to handle it while you observe to ensure nothing harmful happens',
      ],
      options_pcm: [
        'Politely decline and explain say your computer na for business use only',
        'Accept the request small time since printing no be dangerous activity',
        'Ask the customer to wait make you run antivirus scan on their USB before you use am',
        'Ask colleague to handle am while you watch make sure nothing harmful happen',
      ],
      correct_option_index: 0,
      explanation_en:
        'Any unknown USB drive can automatically install malware the moment it is connected — before any scan can intervene. Printing is not inherently safe. The safest policy is no external USB drives on business devices, without exceptions.',
      explanation_pcm:
        'Any unknown USB drive fit automatically install malware the moment dem connect am — before any scan fit do anything. Printing no dey inherently safe. The safest policy na no external USB drive on business device, no exception.',
    },
    {
      module_id: mMap[5],
      question_en:
        'What is a keylogger and why is it especially dangerous for a business that handles customer payments on a shared computer?',
      question_pcm:
        'Wetin be keylogger and why e dey especially dangerous for business wey dey handle customer payment on shared computer?',
      options_en: [
        'Software or hardware that secretly records every keystroke, capturing passwords, card numbers, and banking credentials without detection',
        'A device that automatically locks your keyboard after three incorrect password attempts',
        'A program that deliberately slows internet speed on a network to prevent hacking',
        'Malware that deletes files when it detects a USB drive being connected to the infected computer',
      ],
      options_pcm: [
        'Software or hardware wey dey secretly record every key wey dem press, dey capture password, card number, and banking credential without detection',
        'Device wey dey automatically lock your keyboard after three wrong password attempt to prevent unauthorised access',
        'Program wey dey deliberately slow internet speed on network to make hacking more difficult',
        'Malware wey dey delete files when e detect USB drive being connected to the infected computer',
      ],
      correct_option_index: 0,
      explanation_en:
        'A keylogger silently records everything typed including passwords and card numbers. On a shared business computer, one infected machine can expose every transaction and customer detail to an attacker.',
      explanation_pcm:
        'Keylogger dey silently record everything wey dem type including password and card number. For shared business computer, one infected machine fit expose every transaction and customer detail to an attacker.',
    },
    // MODULE 6: SIM Swap Fraud
    {
      module_id: mMap[6],
      question_en:
        'Your phone suddenly loses all network signal — no calls, no SMS, no mobile data — despite being in an area with good coverage. What could this indicate?',
      question_pcm:
        'Your phone suddenly lose all network signal — no call, no SMS, no mobile data — even though you dey area with good coverage. Wetin this fit indicate?',
      options_en: [
        'A SIM swap attack where a fraudster has ported your number to a SIM card they control',
        'A temporary network outage that should resolve automatically within a few hours',
        'Your SIM card has physically failed and needs replacement at a network provider store',
        "Your phone battery is critically low and is shutting down non-essential connectivity",
      ],
      options_pcm: [
        'SIM swap attack where fraudster don port your number to SIM card wey dem control',
        'Temporary network outage wey go automatically resolve within few hours',
        'Your SIM card don physically fail and needs replacement for network provider store',
        'Your phone battery don critically low and e dey shut down non-essential connectivity',
      ],
      correct_option_index: 0,
      explanation_en:
        'Sudden complete loss of signal on a functioning phone in a good coverage area is a key warning sign of SIM swap fraud. Call your network provider immediately from another phone to report and block any transfers.',
      explanation_pcm:
        'Sudden complete loss of signal for functioning phone for area with good coverage na key warning sign of SIM swap fraud. Call your network provider immediately from another phone to report the issue and block any transfer.',
    },
    {
      module_id: mMap[6],
      question_en:
        'Which combination of protective measures best defends a Nigerian business owner against SIM swap fraud?',
      question_pcm:
        'Which combination of protective measures best go defend Nigerian business owner against SIM swap fraud?',
      options_en: [
        'Using an authenticator app instead of SMS OTPs for banking and alerting your network provider immediately if your phone loses signal unexpectedly',
        'Using a phone with two SIM slots so one remains active if the other is swapped',
        'Changing your phone number every six months to make yourself a harder target',
        'Switching off your mobile data when you are not actively using banking apps',
      ],
      options_pcm: [
        'Using authenticator app instead of SMS OTP for banking and calling your network provider immediately if your phone lose signal without reason',
        'Using phone with two SIM slots so one go still dey active if dem swap the other',
        'Changing your phone number every six months to make yourself harder target',
        'Switch off your mobile data when you no dey actively using banking apps',
      ],
      correct_option_index: 0,
      explanation_en:
        'Authenticator apps generate codes locally and are not linked to your phone number, so a SIM swap does not compromise them. Acting immediately when you lose signal can prevent the fraudster from intercepting your OTPs.',
      explanation_pcm:
        'Authenticator apps dey generate codes locally and no dey linked to your phone number, so SIM swap no fit compromise them. Acting immediately when you lose signal fit prevent the fraudster from intercepting your OTPs.',
    },
    // MODULE 7: POS/Agent Banking Fraud
    {
      module_id: mMap[7],
      question_en:
        'A customer insists you swipe their card multiple times because the first two attempts "failed," yet your POS consistently shows Declined. What should you do?',
      question_pcm:
        'Customer dey insist say you swipe their card many times because the first two attempts fail but your POS dey consistently show Declined. Wetin you go do?',
      options_en: [
        'Stop swiping, call your POS provider to verify the transaction status, and ask the customer to contact their own bank',
        'Attempt one final swipe and if it fails again, accept cash as an alternative',
        'Switch from swipe to chip insertion mode to see if the transaction goes through',
        "Trust the customer's explanation and release the goods since the card appears genuine",
      ],
      options_pcm: [
        'Stop swiping, call your POS provider to verify the transaction status, and ask the customer to call their own bank',
        'Try one final swipe and if e still fail, accept cash as alternative',
        'Switch from swipe to chip insertion mode to see if the transaction go pass',
        'Trust the customer explanation and release the goods since the card dey look genuine',
      ],
      correct_option_index: 0,
      explanation_en:
        'Multiple Declined swipes can be a manipulation tactic by fraudsters with blocked accounts. Always verify transaction status through your POS provider before releasing any goods. Customer pressure should never override your verification process.',
      explanation_pcm:
        'Multiple Declined swipes fit be manipulation tactic wey fraudsters with blocked accounts dey use. Always verify transaction status through your POS provider before you release any goods. Customer pressure should never override your verification process.',
    },
    {
      module_id: mMap[7],
      question_en:
        'What is card skimming and how can a POS merchant most effectively guard against it?',
      question_pcm:
        'Wetin be card skimming and how POS merchant fit most effectively guard against am?',
      options_en: [
        'A physical device secretly attached to a POS terminal to copy card data; inspect your terminal daily for unusual additions or loose components',
        'A method where merchants accidentally overcharge small amounts; prevented by printing and reviewing transaction receipts',
        'A technique where customers steal printed receipts from the POS printer to extract card data; prevented by promptly removing printed receipts',
        'A software virus infecting POS systems remotely; prevented by restarting the terminal each morning',
      ],
      options_pcm: [
        'Physical device wey dem secretly attach to POS terminal to copy card data; inspect your terminal every day for unusual addition or loose part',
        'Method where merchants accidentally overcharge small amount; prevented by printing and reviewing transaction receipts',
        'Technique where customers dey steal printed receipts from the POS printer to get card data; prevented by immediately removing printed receipts',
        'Software virus wey dey infect POS systems remotely; prevented by restarting the terminal every morning',
      ],
      correct_option_index: 0,
      explanation_en:
        'Skimming devices are physical overlays placed over your card reader that silently copy card information during every transaction. Daily physical inspection of your terminal for anything unfamiliar is one of the simplest and most effective defences.',
      explanation_pcm:
        'Skimming devices na physical overlay wey dem place over your card reader wey dey silently copy card information during every transaction. Daily physical inspection of your terminal for anything unfamiliar na one of the simplest and most effective defence.',
    },
    // MODULE 8: Weak Passwords
    {
      module_id: mMap[8],
      question_en:
        'You use the same password for your business email, mobile banking, and social media. A data breach at an unrelated company exposes that password. What is the most likely consequence?',
      question_pcm:
        'You dey use same password for your business email, mobile banking, and social media. Data breach for different company expose that password. Wetin most likely go be the consequence?',
      options_en: [
        'All your accounts become vulnerable immediately as attackers test the stolen credentials across multiple services',
        'Only the breached company is affected; your other accounts use different security infrastructure',
        'Your bank will detect the suspicious login and automatically lock your account before damage occurs',
        'The stolen password is useless unless the attacker also knows your exact username or email address',
      ],
      options_pcm: [
        'All your accounts go become vulnerable immediately as attackers test the stolen credentials across multiple services',
        'Only the breached company dey affected; your other accounts dey use different security infrastructure',
        'Your bank go detect the suspicious login and automatically lock your account before any damage occur',
        'The stolen password dey useless unless the attacker also know your exact username or email address',
      ],
      correct_option_index: 0,
      explanation_en:
        'Credential stuffing tools automatically test stolen username-password pairs across hundreds of services. Reusing the same password means a single breach compromises every account where you used it — including business banking and email.',
      explanation_pcm:
        'Credential stuffing tools dey automatically test stolen username-password pairs across hundreds of services. Reusing same password mean say single breach dey compromise every account where you use am — including business banking and email.',
    },
    {
      module_id: mMap[8],
      question_en:
        'Which of the following is the strongest password for a business account?',
      question_pcm:
        'Which of these na the strongest password for business account?',
      options_en: [
        'A long passphrase combining unrelated words with numbers and symbols, such as: Market#Yaba9Bridge!',
        'Your business name followed by the year your business was registered',
        'A six-digit PIN chosen because it is easy to memorise and type quickly',
        'A password your IT support created and shared with the team via a group chat',
      ],
      options_pcm: [
        'Long passphrase wey combine unrelated words with numbers and symbols, for example: Market#Yaba9Bridge!',
        'Your business name follow by the year wey you register your business',
        'Six-digit PIN wey you choose because e easy to remember and type quickly',
        'Password wey your IT support create and share with the team via group chat',
      ],
      correct_option_index: 0,
      explanation_en:
        'Long passphrases combining random words, numbers, and special characters are both strong and memorable. They are significantly harder to crack than short passwords, business names, or shared credentials.',
      explanation_pcm:
        'Long passphrase wey combine random words, numbers, and special character dey both strong and memorable. Dem dey significantly harder to crack than short password, business name, or shared credential.',
    },
    // MODULE 9: Unpatched Apps
    {
      module_id: mMap[9],
      question_en:
        'Your accounting software displays a critical security update notification. You dismiss it daily for two weeks because business is busy. What is the primary risk you are accepting?',
      question_pcm:
        'Your accounting software dey display critical security update notification. You dey dismiss am every day for two weeks because business dey busy. Wetin be the primary risk wey you dey accept?',
      options_en: [
        'A known security vulnerability remains open in your software, giving attackers a window to access your financial data',
        'The software licence may expire automatically if you delay the update for too long',
        'The update will eventually install without your permission and disrupt business operations',
        'Older software versions are slower but do not create meaningful security vulnerabilities',
      ],
      options_pcm: [
        'Known security vulnerability dey remain open for your software, giving attackers window to access your financial data',
        'The software licence fit automatically expire if you delay the update for too long',
        'The update go eventually install without your permission and disrupt your business operations',
        'Older software versions dey slower but dem no dey create meaningful security vulnerability',
      ],
      correct_option_index: 0,
      explanation_en:
        'When a critical update is released, the vulnerability it patches is already known to attackers. Every day you delay is additional exposure. Attackers actively scan for and exploit unpatched software.',
      explanation_pcm:
        'When critical update release, the vulnerability wey e dey patch don already known to attackers. Every day wey you delay na additional exposure. Attackers dey actively scan for and exploit unpatched software.',
    },
    {
      module_id: mMap[9],
      question_en:
        'Which device situation poses the highest cybersecurity risk when used to access a business banking application?',
      question_pcm:
        'Which device situation dey pose the highest cybersecurity risk when dem dey use am to access business mobile banking application?',
      options_en: [
        'An Android phone running a version that no longer receives security updates, used daily for banking transactions',
        'A brand-new laptop that has not yet been configured or personalised by the user',
        'A USB-only printer with no internet connectivity connected to a secure business network',
        'A wireless router installed by a certified provider within the past three months',
      ],
      options_pcm: [
        'Android phone wey dey run version wey no longer dey receive security update, dem dey use am every day for banking transaction',
        'Brand-new laptop wey nobody don yet configure or personalise',
        'USB-only printer wey no get internet connectivity connected to secure business network',
        'Wireless router wey certified provider install within the past three months',
      ],
      correct_option_index: 0,
      explanation_en:
        'A phone running an unsupported Android version no longer receives security patches. Known vulnerabilities in that OS version are permanently exposed, making it high-risk for any financial application.',
      explanation_pcm:
        'Phone wey dey run unsupported Android version no longer dey receive security patch. Known vulnerability for that OS version dey permanently exposed, making am high-risk for any financial application.',
    },
    // MODULE 10: Public Wi-Fi
    {
      module_id: mMap[10],
      question_en:
        'You are at a Lagos airport and need to process an urgent customer payment remotely. You connect to a free Wi-Fi network labelled "FreeAirportWifi." What is the primary risk?',
      question_pcm:
        'You dey Lagos airport and you need to process urgent customer payment remotely. You connect to free Wi-Fi network wey name na FreeAirportWifi. Wetin be the primary risk?',
      options_en: [
        'The network could be a rogue hotspot created by an attacker to intercept your banking credentials and payment data',
        'The payment may take significantly longer to process due to shared bandwidth at a busy airport',
        'Your phone battery will drain faster when connected to public Wi-Fi compared to mobile data',
        'The airport authority will monitor and log your internet activity for regulatory compliance',
      ],
      options_pcm: [
        'The network fit be fake hotspot wey attacker create to intercept your banking credential and payment data',
        'The payment fit take significantly longer to process because many people dey share the bandwidth for busy airport',
        'Your phone battery go drain faster when you dey connected to public Wi-Fi compared to using mobile data',
        'The airport authority go monitor and log your internet activity for regulatory compliance',
      ],
      correct_option_index: 0,
      explanation_en:
        'Attackers frequently create fake Wi-Fi hotspots with credible names in public places. When you connect, they can intercept unencrypted traffic and capture banking credentials, passwords, and payment details.',
      explanation_pcm:
        'Attackers dey frequently create fake Wi-Fi hotspot with credible names for public places. When you connect, dem fit intercept unencrypted traffic and capture banking credential, password, and payment details.',
    },
    {
      module_id: mMap[10],
      question_en:
        'When you must use public Wi-Fi for an important business task, which measure provides the most meaningful protection?',
      question_pcm:
        'When you absolutely must use public Wi-Fi for important business task, which measure dey provide the most meaningful protection?',
      options_en: [
        'Using a VPN to encrypt all your internet traffic before it leaves your device',
        'Enabling incognito or private browsing mode in your web browser before connecting',
        'Turning off Bluetooth while connected to reduce exposure to proximity-based attacks',
        'Completing your session within five minutes to minimise the window of exposure',
      ],
      options_pcm: [
        'Using VPN to encrypt all your internet traffic before e leave your device',
        'Enable incognito or private browsing mode for your web browser before you connect',
        'Turn off Bluetooth while you dey connected to reduce exposure to proximity-based attack',
        'Complete your session within five minutes to minimise the window of exposure',
      ],
      correct_option_index: 0,
      explanation_en:
        'A VPN encrypts your traffic end-to-end, making it unreadable even if intercepted on an unsecured network. Incognito mode only hides local browsing history and provides no protection against network-level interception.',
      explanation_pcm:
        'VPN dey encrypt your traffic end-to-end, making am unreadable even if dem intercept am on unsecured network. Incognito mode only dey hide local browsing history and no dey provide any protection against network-level interception.',
    },
    // MODULE 11: BEC & Fake Invoices
    {
      module_id: mMap[11],
      question_en:
        'You receive an email from your regular supplier requesting that all future payments be redirected to a new bank account with immediate effect. What should you do first?',
      question_pcm:
        'You receive email from your regular supplier requesting say make you redirect all future payments to new bank account with immediate effect. Wetin you go do first?',
      options_en: [
        'Call your supplier directly using a phone number already saved in your own contacts to verbally confirm the change',
        'Update your payment records immediately to avoid disrupting the business relationship',
        'Reply to the email requesting additional identity verification before making any changes',
        'Forward the email to your accountant and ask them to handle the response',
      ],
      options_pcm: [
        'Call your supplier directly using phone number wey you already get saved for your own contacts to verbally confirm the change',
        'Update your payment records immediately to avoid disrupting the business relationship and causing delay',
        'Reply the email requesting additional identity verification before you make any changes',
        'Forward the email give your accountant and ask dem to handle the response for your behalf',
      ],
      correct_option_index: 0,
      explanation_en:
        'Business Email Compromise attacks frequently involve fraudulent account-change requests. Always verify any payment detail change by calling the supplier using your own saved contact number — never use contact information from the suspicious email.',
      explanation_pcm:
        'Business Email Compromise attack dey frequently involve fraudulent account-change request. Always verify any payment detail change by calling the supplier using number from your existing contacts — never use contact information from the suspicious email.',
    },
    {
      module_id: mMap[11],
      question_en:
        'Which of the following best describes a Business Email Compromise (BEC) attack targeting a Nigerian SME?',
      question_pcm:
        'Which of these best describe Business Email Compromise (BEC) attack wey dey target Nigerian SME?',
      options_en: [
        'Attackers impersonate a trusted supplier or executive via email to redirect invoice payments to a fraudulent bank account',
        'Malware that automatically forwards copies of incoming emails to an external attacker without the account owner knowing',
        'A phishing attack that exclusively targets employees by sending fake payroll or HR notifications',
        'Ransomware that encrypts the email inbox and demands payment to the service provider for restoration',
      ],
      options_pcm: [
        'Attackers dey impersonate trusted supplier or executive via email to redirect invoice payment to fraudulent bank account',
        'Malware wey dey automatically forward copies of incoming emails to external attacker without the account owner knowing',
        'Phishing attack wey exclusively dey target employees by sending fake payroll or HR notification',
        'Ransomware wey dey encrypt the email inbox and dey demand payment to the email service provider for restoration',
      ],
      correct_option_index: 0,
      explanation_en:
        'BEC attacks are sophisticated social engineering operations where attackers study real business communication patterns before impersonating known parties. Nigerian SMEs that process regular supplier payments are common targets.',
      explanation_pcm:
        'BEC attack na sophisticated social engineering operation where attackers dey study real business communication pattern before dem impersonate known party. Nigerian SMEs wey dey process regular supplier payment na common target.',
    },
    // MODULE 12: Fake/Cloned Online Stores
    {
      module_id: mMap[12],
      question_en:
        'You are about to pay on an online store you have not used before. Which detail is the most reliable warning sign of a fraudulent website?',
      question_pcm:
        'You wan pay for goods on online store wey you never use before. Which detail na the most reliable warning sign of fraudulent website?',
      options_en: [
        'The URL contains slight misspellings or extra characters, such as jumia-shop-ng.com instead of jumia.com.ng',
        'The website displays a professional logo, high-quality product images, and customer reviews',
        'The website is offering a free delivery promotion on orders above a certain amount',
        'The website has a live chat support button visible in a corner of the page',
      ],
      options_pcm: [
        'The URL get small misspelling or extra characters, for example jumia-shop-ng.com instead of jumia.com.ng',
        'The website dey display professional logo, high-quality product images, and customer reviews',
        'The website dey offer free delivery promotion on orders above certain amount',
        'The website get live chat support button wey dey visible for corner of the page',
      ],
      correct_option_index: 0,
      explanation_en:
        'Fraudulent websites use domain names that closely mimic legitimate brands with subtle changes. Professional appearances, logos, and chat buttons can all be copied. Always inspect the exact URL before entering any payment or login details.',
      explanation_pcm:
        'Fraudulent websites dey use domain name wey dey closely mimic legitimate brands with subtle change. Professional appearance, logo, and chat button fit all be copied. Always inspect the exact URL before you enter any payment or login details.',
    },
    {
      module_id: mMap[12],
      question_en:
        'A customer claims they were charged twice when ordering from what they believe is your online store, but you have no record of their order. What is the most likely explanation?',
      question_pcm:
        'Customer contact you say dem charge them twice when dem order from wetin dem believe na your online store, but you no get any record of their order. Wetin most likely be the explanation?',
      options_en: [
        'A fraudster has created a cloned version of your store to collect customer payments; report to your hosting provider and warn affected customers',
        'Your payment gateway experienced a technical duplication error that charged without recording',
        'The customer accidentally ordered from a different legitimate store with a similar name',
        'An unstable internet connection caused the order to be submitted and charged twice',
      ],
      options_pcm: [
        'Fraudster don create cloned version of your store to collect customer payment; report to your hosting provider and warn affected customers',
        'Your payment gateway experience technical duplication error wey charge without recording',
        'The customer accidentally order from different legitimate store wey get similar name',
        'Unstable internet connection cause the order to be submitted and charged twice',
      ],
      correct_option_index: 0,
      explanation_en:
        "Store cloning is an active threat to Nigerian online merchants. Fraudsters replicate a store's design and branding to intercept customer payments. Orders collected by the clone never appear in your records.",
      explanation_pcm:
        'Store cloning na active threat to Nigerian online merchant. Fraudsters dey replicate store design and branding to intercept customer payment. Orders wey the clone collect never go appear for your records.',
    },
    // MODULE 13: Voice Phishing & AI Voice Clones
    {
      module_id: mMap[13],
      question_en:
        'You receive a voice message that sounds exactly like your business partner urgently requesting a ₦500,000 transfer. What should you do before taking any financial action?',
      question_pcm:
        'You receive voice message wey sound exactly like your business partner urgently requesting ₦500,000 transfer before end of day. Wetin you go do before you take any financial action?',
      options_en: [
        'Call your business partner back using their saved phone number to independently verify the request',
        'Transfer the funds immediately to protect the business relationship and meet the urgent deadline',
        'Send a WhatsApp message asking your partner to confirm before you proceed',
        'Ask your accountant to process the transfer since the amount is within normal business range',
      ],
      options_pcm: [
        'Call your business partner back using their saved phone number to independently verify the request',
        'Transfer the funds immediately to protect the business relationship and meet the urgent deadline',
        'Send WhatsApp message asking your partner to confirm before you proceed',
        'Ask your accountant to process the transfer since the amount dey within normal business range',
      ],
      correct_option_index: 0,
      explanation_en:
        "AI voice-cloning can replicate someone's voice from just a few seconds of recorded audio. Always independently verify any urgent financial request by calling back on a number you already trust — never act on a voice message alone.",
      explanation_pcm:
        "AI voice-cloning fit replicate somebody voice from just few seconds of recorded audio. Always independently verify any urgent financial request by calling back through number wey you already trust — never act on voice message alone.",
    },
    {
      module_id: mMap[13],
      question_en:
        'Which combination of signs most strongly suggests a caller may be using AI voice-cloning to deceive you?',
      question_pcm:
        'Which combination of signs most strongly suggest say caller fit be using AI voice-cloning to deceive you?',
      options_en: [
        'The caller sounds like someone you know but insists on immediate irreversible action, declines to video-call, and the request is unusual for that person',
        "The caller's voice has a slight echo due to mobile network connection quality",
        'The caller knows your name, business address, and specific details about recent transactions',
        'The call connects almost immediately without the usual number of ringing tones',
      ],
      options_pcm: [
        'The caller sound like somebody you know but insist say you must do immediate irreversible action, dem decline to switch to video call, and the request dey unusual for that person',
        'The caller voice get small echo because of mobile network connection quality',
        'The caller know your name, business address, and specific details about recent transactions',
        'The call connect almost immediately without the usual number of ringing tones',
      ],
      correct_option_index: 0,
      explanation_en:
        'The defining characteristics of AI voice-clone attacks are urgency for irreversible action, refusal to video-call, and an unusual request. Knowing your name and business details does not validate the call — such information is often publicly available.',
      explanation_pcm:
        'The defining characteristics of AI voice-clone attack na urgency for irreversible action, refusal to video-call, and unusual request. Knowing your name and business details no validate the call — such information dey often publicly available.',
    },
    // MODULE 14: QR Code Scams
    {
      module_id: mMap[14],
      question_en:
        'A vendor at a Lagos market hands you a printed QR code for payment. Before completing the transaction, what is the most important verification step?',
      question_pcm:
        'Vendor for busy Lagos market give you printed QR code for payment. Before you complete the transaction, wetin be the most important verification step?',
      options_en: [
        'After scanning the code, confirm that the account name displayed matches the vendor before authorising payment',
        'Scan and pay quickly to avoid holding up other customers in the queue',
        'Use a third-party QR scanner app rather than your banking app for added safety',
        'Ask the vendor to verbally confirm the exact payment amount before you scan the code',
      ],
      options_pcm: [
        'After you scan the code, confirm say the account name wey show dey match the vendor before you authorise the payment',
        'Scan and pay as quickly as possible to avoid holding up other customers for the queue',
        'Use third-party QR scanner app instead of your banking app for added safety',
        'Ask the vendor to verbally confirm the exact payment amount before you scan the code',
      ],
      correct_option_index: 0,
      explanation_en:
        'QR codes give no visual indication of where they route you. Always check the account name and details displayed after scanning before confirming payment. A tampered or swapped QR code will show a different account name.',
      explanation_pcm:
        'QR codes no dey give you visual indication of where dem go send you. Always check the account name and details wey show after you scan before you confirm payment. Tampered or swapped QR code go show different account name.',
    },
    {
      module_id: mMap[14],
      question_en:
        'How do attackers typically use QR codes to steal money from Nigerian merchants and their customers?',
      question_pcm:
        'How attackers dey typically use QR codes to steal money from Nigerian merchants and their customers?',
      options_en: [
        'They place sticker QR codes over legitimate payment QR codes, silently redirecting customer payments to their own account',
        'They send QR codes via email that install malicious payment apps when scanned with a phone camera',
        'They embed QR codes in CCTV footage that remotely charge cards captured near the camera',
        'They use self-destructing QR codes that expire after a single scan to prevent the merchant reusing them',
      ],
      options_pcm: [
        'Dem dey place sticker QR codes on top of legitimate payment QR codes, silently redirecting customer payment go their own account',
        'Dem dey send QR codes via email wey dey install malicious payment apps when you scan am with phone camera',
        'Dem dey embed QR codes for CCTV footage wey dey remotely charge cards wey dey near the camera',
        'Dem dey use self-destructing QR codes wey expire after single scan to prevent the merchant from reusing them',
      ],
      correct_option_index: 0,
      explanation_en:
        "Physical QR code substitution is one of the most common quishing attacks in Nigerian markets. A fraudster places their sticker over the merchant's legitimate QR code. The merchant is unaware and every customer payment goes to the fraudster.",
      explanation_pcm:
        "Physical QR code substitution na one of the most common quishing attack for Nigerian market. Fraudster dey place their QR sticker on top of merchant legitimate one. The merchant no know and every customer payment dey go to the fraudster.",
    },
    // MODULE 15: Device Theft/Loss & Backups
    {
      module_id: mMap[15],
      question_en:
        'Your business smartphone containing banking apps, business WhatsApp, and customer records is stolen. What is the most time-critical first action?',
      question_pcm:
        'Your business smartphone wey get your banking apps, business WhatsApp, and customer records don get stolen. Wetin be the most time-critical first action?',
      options_en: [
        'Remotely wipe the device via your Google or Apple account and immediately change passwords on all accounts accessible on the phone',
        'File a police report first and await recovery of the device before taking technical steps',
        'Call your network provider to suspend the SIM card and monitor the situation',
        'Purchase a replacement phone immediately so you can continue business operations without disruption',
      ],
      options_pcm: [
        'Remotely wipe the device via your Google or Apple account manager and immediately change password on all accounts wey dey accessible on the phone',
        'File police report first and wait for recovery of the device before you take further technical steps',
        'Call your network provider to suspend the SIM card and monitor the situation from there',
        'Buy replacement phone immediately so you fit continue business operations without disruption',
      ],
      correct_option_index: 0,
      explanation_en:
        'Every minute a stolen phone remains accessible, attackers can log into banking apps, intercept OTPs, and harvest customer data. Remote wipe and immediate password changes are the highest-priority first steps — before a police report.',
      explanation_pcm:
        'Every minute stolen phone remain accessible, attackers fit login banking apps, intercept OTPs, and harvest customer data. Remote wipe and immediate password changes na the highest-priority first steps — before police report.',
    },
    {
      module_id: mMap[15],
      question_en:
        'Which backup practice best ensures a small Nigerian business can fully recover from device theft or accidental data loss?',
      question_pcm:
        'Which backup practice best ensure say small Nigerian business fit fully recover from device theft or accidental data loss?',
      options_en: [
        'Maintaining at least one copy of important data in a secure cloud service or a physically separate location, tested through regular restores',
        'Backing up files to a second folder on the same device for quick and convenient access',
        'Taking monthly photographs of important paper documents using a secondary smartphone',
        'Saving all business data to a USB drive stored in the same office as the primary computer',
      ],
      options_pcm: [
        'Maintain at least one copy of important data for secure cloud service or physically separate location, verified through regular test restores',
        'Back up files to second folder on the same device for quick and convenient access',
        'Dey take monthly photographs of important paper documents using secondary smartphone',
        'Save all business data to USB drive wey you dey store for the same office as the primary computer',
      ],
      correct_option_index: 0,
      explanation_en:
        'A backup stored on the same device or in the same physical location is destroyed alongside the original in a theft, fire, or flood. The goal is at least one copy that survives the same event that destroys your primary data.',
      explanation_pcm:
        'Backup wey dey on the same device or same physical location go dey destroyed alongside the original if theft, fire, or flood happen. The goal na at least one copy wey go survive the same event wey destroy your primary data.',
    },
  ];

  console.log(`Inserting ${questions.length} new quiz questions...`);

  let inserted = 0;
  let failed = 0;
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const { error } = await supabase.from('quiz_questions').insert({
      module_id: q.module_id,
      question_en: q.question_en,
      question_pcm: q.question_pcm,
      options_en: q.options_en,
      options_pcm: q.options_pcm,
      correct_option_index: q.correct_option_index,
      explanation_en: q.explanation_en,
      explanation_pcm: q.explanation_pcm,
    });
    if (error) {
      console.error(`\nFailed Q${i + 1} (module_id=${q.module_id}):`, error.message);
      failed++;
    } else {
      inserted++;
      process.stdout.write('.');
    }
  }

  console.log(`\nInserted ${inserted} / ${questions.length} questions. Failed: ${failed}`);

  // Final verification
  const { data: counts } = await supabase.from('quiz_questions').select('module_id');
  const { data: allModules } = await supabase
    .from('modules')
    .select('id, order_index, title_en')
    .order('order_index');

  console.log('\n=== Final Question Count Verification ===');
  let allPass = true;
  for (const m of allModules) {
    const count = counts.filter((q) => q.module_id === m.id).length;
    const pass = count >= 5 ? '✅ PASS' : '❌ FAIL';
    if (count < 5) allPass = false;
    console.log(`${m.order_index}. ${m.title_en.substring(0, 42).padEnd(42)} | Qs: ${count} ${pass}`);
  }
  console.log(`\nTotal questions in DB: ${counts.length}`);
  console.log(
    `Academic compliance (≥75 total, ≥5/module): ${allPass && counts.length >= 75 ? '✅ ACHIEVED' : '❌ NOT MET'}`
  );
}

insertQuestionsViaAPI().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
