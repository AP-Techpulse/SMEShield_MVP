-- Migration: 20260918000001_enrich_module_content.sql
-- Expands lesson content for Modules 4 through 15 to match academic depth standards

UPDATE modules SET
  content_en = '## Social Media & WhatsApp Hijacking: The SME Threat

For Nigerian businesses, WhatsApp Business, Instagram, and Facebook are storefronts. When attackers seize these accounts, they do not just lock you out—they impersonate your business, deceive your loyal customers, defraud suppliers, and destroy your commercial reputation overnight.

### How Attackers Execute Account Takeovers in Nigeria

1. **The WhatsApp 6-Digit Code Trap**: An attacker registers your phone number on a new device and immediately messages you on SMS or another channel claiming, *"I accidentally sent my verification code to your line, please send it back."* Once you share that code, they take complete control.
2. **Fake Meta Verification & Copyright DMs**: Fraudsters send messages on Instagram stating: *"Your business account violated copyright rules and will be disabled in 24 hours. Fill this form to appeal."* The link leads to a cloned phishing site harvesting your login password and 2FA recovery backup codes.
3. **SIM Hijack or SIM Cloning**: Targeting phone lines tied directly to two-factor SMS OTPs.

### Warning Signs & Red Flags

- Unexpected SMS messages containing WhatsApp, Instagram, or Google verification codes that you never requested.
- Urgent direct messages claiming to be "Instagram Support" or "WhatsApp Security Team" requesting credentials or appeal actions via external links.
- Sudden notifications that a new unknown device or location (e.g. from another state or abroad) has logged into your business page.
- Inability to send WhatsApp messages or an unexpected logout prompt saying: *"Your phone number is no longer registered with WhatsApp on this phone."*

### Defensive Protocol & Human Firewall Checklist

- **Enable WhatsApp Two-Step Verification Today**: Go to Settings > Account > Two-Step Verification > Turn On. Set a private 6-digit PIN and add your secure recovery email.
- **Never Share 6-Digit Codes**: No genuine vendor, family member, church group admin, or platform support agent will ever legitimately ask you for an SMS OTP or registration code.
- **Dedicated Business Numbers**: Avoid using personal lines with widely published contact cards as your primary administrative recovery number.
- **Maintain Multi-Admin Governance**: Ensure at least two verified company directors or trusted managers hold Admin access on Facebook Business Suite and Instagram pages.',
  content_pcm = '## Social Media & WhatsApp Hijack: Danger We Dey Face for Naija

For plenty Nigerian small business, WhatsApp Business, Instagram, and Facebook na our main market shop. If 419 boys hack your account, no be only say they lock you outside—they go begin chat your customers, sell fake goods with your name, borrow money from your suppliers, and spoil your business name quick quick.

### How Dem Dey Hack People Account for Naija

1. **The 6-Digit WhatsApp Code Trick**: Somebody go put your phone number for his own phone, then call or message you say: *"Abeg I mistakenly send my code enter your phone, help me send am back."* As you send that 6-digit code, na so you give am the key to your WhatsApp.
2. **Fake Instagram Copyright & Blue Badge Message**: Scammers go send DM say: *"Your shop account don break rule, we go block am in 24 hours. Click here make you appeal."* If you click the link and type your password, dem don carry your page.
3. **Phishing Links for WhatsApp Groups**: Links wey dey promise FG grant, empowerment funds, or viral giveaways wey tell you to log in with your Facebook or WhatsApp details.

### Red Flags Wey You Must Spot Sharp Sharp

- You receive SMS code from WhatsApp or Instagram wey you no request yourself.
- Any message wey dey talk say "Instagram Support" or "WhatsApp Team" dey ask for your password or verification code.
- Your WhatsApp suddenly lock you out talk say: *"Your phone number is no longer registered on this phone."*
- Friends or customers begin call your normal phone say you dey post crypto investment or dey borrow money on your status.

### Wetin You and Your Staff Must Do

- **Put WhatsApp Two-Step Verification Now Now**: Go to Settings > Account > Two-Step Verification > Turn On. Choose 6-digit PIN wey only you know, and put your email.
- **Never Ever Share Any 6-Digit Code**: Nobody on top earth—no matter who dem claim to be—suppose get your verification code.
- **Separate Personal Line from Business Admin**: Make your main admin recovery line dey private, no be the one you paste everywhere on social media.
- **Make More than One Person Dey as Page Admin**: Make sure at least two trusted people get admin access to your Facebook and Instagram Business page so if one get issue, una fit recover am.'
WHERE id = 'ae4f2012-be51-4ced-b7c4-2936f16eda9c';

UPDATE modules SET
  content_en = '## USB Malware & Hardware Keyloggers: Physical Entry Points

While internet-based cyber attacks receive high visibility, physical USB drives and rogue peripheral devices represent some of the most destructive attack vectors against Nigerian SMEs, business centres, accounting offices, and retail cashier desks.

### How USB Attacks Operate Against Small Businesses

1. **The "Lost Drive" Bait (Drop Attacks)**: Scammers purposely drop a USB flash drive branded with enticing labels like *"Staff Salaries 2026.xlsx"* or *"CAC Board Resolution.pdf"* right outside your office door or parking lot, waiting for a curious employee to plug it in.
2. **Business Centre & Cybercafe Contamination**: When staff copy invoices or company letterheads onto a flash drive at a local printing shop, hidden malware (such as worms, shortcuts, and auto-executing scripts) silently infects the drive and spreads back onto your company network.
3. **Hardware Keyloggers**: Tiny adapter devices plugged between a cashier''s keyboard and the back of an office desktop, silently recording every keystroke, including internet banking passwords and customer card details.

### Warning Signs of Compromised Hardware

- Files on your USB drive unexpectedly turn into `.lnk` shortcut files, or folders turn invisible while file storage remains consumed.
- Antivirus popups flagging autorun scripts (`autorun.inf`, `.vbs`, or powershell executions) immediately after inserting an external drive.
- Strange hardware dongles or unfamiliar adapters connected to the back of office PCs or POS terminals.
- Unexplained background CPU spikes or mouse freezing when external storage is connected.

### Practical Defensive Protocol

- **Prohibit Unknown Flash Drives**: Strictly instruct employees that any found or personal USB drive must never be plugged into business-critical computers.
- **Disable AutoPlay/AutoRun Globally**: Configure all Windows PCs in your business to prevent external drives from automatically running programs upon insertion.
- **Maintain Regular Antivirus Scans**: Run up-to-date endpoint security scans on any flash drive before opening files.
- **Physical Desk Hygiene**: Routinely inspect the rear USB ports on accounting desktops and POS payment processing terminals.',
  content_pcm = '## Flash Drive Virus & Keylogger: How Physical Threat Dey Enter Office

Plenty people dey fear internet hacker, but one small flash drive fit destroy all the computers wey dey your office or shop. For Naija business centers, accounting firms, and supermarkets, flash drive na one of the easiest ways virus dey spread.

### How Bad Guys Dey Use Flash Drive Do Harm

1. **The Drop Attack (Lost Flash Trap)**: Somebody go drop flash drive for your shop front or staircase with label like *"Staff Salary 2026"* or *"CAC Contract Document"*. Once your worker take am plug for computer because of amebo or curiosity, virus go enter immediately.
2. **Business Center & Printing Shop Infection**: You take flash go print receipt or document for street business center. The business center computer already get virus, e go infect your flash. Once you return enter office plug am, your whole office network don enter trouble.
3. **Keylogger Hardware**: Small device wey person fit plug behind desktop computer in-between keyboard and CPU. E go record every single letter and password wey cashier or accountant dey type.

### Red Flags Wey You Must Notice

- Files inside your flash drive suddenly turn to shortcuts (.lnk) or all your folders disappear but the flash still dey full.
- Your computer antivirus dey shout immediately you plug flash drive.
- You see strange plastic plug or small adapter behind your office computer wey no be your IT person put am.
- Computer dey slow down seriously or mouse dey freeze immediately you plug external drive.

### Wetin You Must Do for Your Workplace

- **No Plug Any Strange Flash Drive**: Tell all staff say any flash drive wey dem pick outside or borrowed from stranger must NEVER touch office computer.
- **Scan Before Opening**: Always right-click scan any flash drive with active antivirus before you double-click open any file.
- **Send Files via Cloud or Email**: Instead of waka with flash go everywhere, use secure cloud email or Google Drive to share documents for printing.
- **Check Behind Computers Regularly**: Check the back of your office CPUs and POS machines to ensure nobody plug illegal hardware keylogger.'
WHERE id = '45c23526-b54e-47d5-8c60-1432baf6e363';

UPDATE modules SET
  content_en = '## SIM Swap Fraud: The Direct Threat to Your Business Accounts

In Nigeria, your mobile phone number is the universal master key to your digital identity. It receives bank OTPs, USSD transfer authorization codes, and WhatsApp login tokens. When criminals swap your SIM, they strip away your communication and systematically empty your business accounts.

### The Mechanics of a SIM Swap Attack in Nigeria

1. **Reconnaissance & BVN/NIN Harvesting**: Fraudsters gather your name, date of birth, mother''s maiden name, and NIN through phishing messages or collusive leaks.
2. **Impersonation at the Telco Agent**: The attacker visits a telecom service center or roadside SIM registration kiosk pretending to be you with a fake national ID card, claiming their phone was stolen and requesting a SIM replacement.
3. **The Silent Switch**: Your physical SIM card suddenly loses signal (*"No Service"* or *"Emergency Calls Only"*).
4. **Account Drainage**: Within minutes, the attacker dials USSD banking codes or resets bank app passwords using incoming SMS verification codes, transferring your funds to money-mule accounts before you can report to your bank.

### Critical Warning Signs

- Sudden, prolonged loss of mobile network service in an area where you normally have strong, stable connectivity.
- Receiving unprompted SMS alerts from your telecom provider stating: *"Your request for SIM replacement is being processed."*
- Calls to your phone line divert directly to voicemail or ring on another handset while your phone has zero bars.
- Unexpected notifications from banking applications indicating new mobile banking device registrations.

### Defensive Protocols to Safeguard Your Business Lines

- **Lock Your SIM Card with a Custom PIN**: Change your default telco SIM PIN (default is usually 0000 or 1234) to a unique 4-digit PIN in your phone settings. Even if your phone is stolen, the SIM cannot be used in another handset.
- **Immediate Action on "No Service"**: If your mobile line suddenly goes dead without explanation, immediately borrow a phone and call your bank''s emergency fraud hotline to temporarily freeze your accounts.
- **Separate Financial Transaction Lines**: Maintain a confidential phone number registered with banks for financial transaction OTPs that is never publicly advertised on billboards, social media, or company vehicles.',
  content_pcm = '## SIM Swap 419: How Scammers Dey Use Your Phone Line Sweep Your Money

For Nigeria here, your SIM card na your master key. Your bank SMS alert, USSD transfer, BVN/NIN notifications, and WhatsApp verification codes all dey enter that one line. If thief manage do SIM swap on your number, dem fit wipe out all your business money within 15 minutes.

### How Scammers Dey Do SIM Swap for Naija

1. **Gathering Your Info (Phishing)**: Dem go first trick you reveal your full name, date of birth, mother''s maiden name, or NIN through fake call or survey form.
2. **Visiting Telco Kiosk with Fake ID**: The fraudster go carry fake ID card go telecom agent say his phone lost, say e want retrieve his SIM card.
3. **Your Network Go Die ("No Service")**: Once the telco activate the new SIM card for the criminal hand, your own original SIM card go lose network immediately.
4. **Sweeping Your Account with USSD**: Because incoming SMS now dey land on their phone, dem go dial *737#, *901#, *894#, or reset your banking apps and transfer your funds before you even wake up.

### Red Flags Wey Go Alert You

- Your phone suddenly show "No Service" or "Emergency Calls Only" for place where network always dey strong.
- You receive sudden SMS from MTN, Airtel, Glo, or 9mobile say: *"SIM replacement request is in progress."*
- People dey call you say your number dey ring or busy, but nothing dey show on your phone.
- Strange email alerts showing say somebody dey log enter your bank app from another phone.

### Wetin You Must Do Sharp Sharp

- **Put SIM PIN on Your Phone Right Now**: Enter your phone Settings > Security > SIM Card Lock. Change the default PIN (0000 or 1234) to your personal secret 4 digits. If thief steal your phone, dem no fit put the SIM for another phone.
- **If Network Die Suddenly, Act Fast**: If your business phone line suddenly show "No Service" for more than 10 minutes without reason, borrow phone call your bank hotline immediately make dem block your accounts first.
- **Separate Your Bank Alert Number**: No use the same phone number wey you write for your billboard and Instagram take receive your bank OTP.'
WHERE id = 'a30a1871-0b15-49b0-b4c5-f2672b02e6a7';

UPDATE modules SET
  content_en = '## POS & Agent Banking Fraud: Protecting the Frontline Cashier

Point of Sale (POS) terminals and agent banking kiosks are the lifeblood of Nigerian commerce. However, because POS devices handle direct financial settlements and customer payment cards, they are frequent targets for skimming, hardware swapping, and card manipulation fraud.

### Common POS Fraud Techniques in Nigeria

1. **Terminal Swapping**: A rogue customer or distraction team visits during a rush hour, creates a commotion, and swaps your business POS terminal with an identical non-working or rogue device configured to divert settlements to an attacker''s merchant account.
2. **Fake Chargeback / Transaction Reversal Scams**: A customer performs a transaction, then colludes with their bank or utilizes illicit merchant reversal codes claiming a false dispense error while walking away with high-value goods.
3. **Card Skimming & Shoulder Surfing**: Criminals fit overlay skimmers over terminal card slots or covertly position mirrors and cameras to record customer ATM PINs during checkout.

### Warning Signs of Compromised POS Hardware

- The terminal serial number or merchant identification tag does not match your official terminal registration paperwork.
- The device prompts for unusual system updates or shows unexpected hardware tamper warnings (*"PED Tampered"* or *"System Halted"*).
- The transaction printout displays a different Merchant Name or Acquirer Bank than your registered business name.
- Customers repeatedly complain that their debit cards are difficult to insert or that the card slot feels loose or modified.

### Operational Safety Guidelines for POS Operators

- **Secure Physical Possession**: Never allow customers or unauthorized delivery staff to walk away with or handle the terminal out of your line of sight. Keep terminals tethered or mounted at the counter.
- **End-of-Day Terminal Audit**: Verify that the physical serial number printed on the back of the terminal matches the business records and daily settlement slips.
- **Verify Approved Slips**: Ensure the transaction receipt clearly shows **APPROVED (00)** and verify that the amount settled matches the bill before releasing purchased merchandise.
- **Protect Customer PIN Privacy**: Ensure customers shield their PIN entry using their hand, and keep your cashiers trained never to type a customer''s PIN on their behalf.',
  content_pcm = '## POS & Agent Banking 419: How to Protect Your Cashier Counter

For Nigeria today, POS machine na our daily bread for shop and agency banking. But because POS machine dey handle cash directly, fraudsters dey always try trick cashiers through terminal swap, fake reversal, and skimming.

### How Dem Dey Do POS 419 for Naija Shops

1. **Terminal Swapping (Changing Your Machine)**: Criminals go come your shop when everywhere dey busy. One person go distract your cashier, while his partner go carry your original POS machine swap am with another identical machine wey look exactly like your own. Money wey customers pay go begin enter their own account!
2. **Card Skimming & PIN Stealing**: Bad people fit put small illegal chip inside card slot or spy on top customer hand when dem dey type their ATM card PIN.
3. **Fake Reversal & Stolen Card**: Criminal go use stolen card or hot card buy expensive goods, then run commot before the real card owner block the card.

### Red Flags Wey You Must Spot for Counter

- The Merchant Name wey dey print on top the paper receipt no match your business name.
- The POS machine dey show error like *"Tamper Detected"* or *"Security Breach"*.
- The machine serial number for back don scratch commot or no match your bank paper.
- Customer dey rush you say: *"Network dey delay, receipt don show successful for my app, carry the goods give me make I dey go."*

### Rules Wey Every Shop Cashier Must Follow

- **No Allow Customer Hold POS Commot for Counter**: The machine must always stay where cashier eye dey see am clearly.
- **Check Serial Number Every Morning and Night**: Make sure say the POS machine wey you dey use na your original machine wey your bank give you.
- **Confirm APPROVED (00) for Paper Receipt**: Never release goods until the POS machine print out paper receipt showing **APPROVED 00** with correct transaction date and amount.
- **Never Type Customer PIN for Am**: Tell customers make dem cover hand type their secret PIN themselves.'
WHERE id = '32d4b901-cd32-4add-8200-86d888bcb8f8';

UPDATE modules SET
  content_en = '## Weak Passwords & Credential Reuse: Closing the Open Door

Using predictable passwords or repeating the same password across multiple platforms is the easiest way for cybercriminals to compromise an entire business. If a hacker breaches one minor platform where you used your favorite password, they immediately test that credential on your email, banking, CAC portal, and cloud storage.

### How Attackers Exploit Password Weaknesses

1. **Credential Stuffing**: Automated bots take username and password dumps from previously leaked databases and automatically test millions of combinations against Nigerian banking portals, email providers, and social media platforms.
2. **Brute Force & Dictionary Attacks**: Attackers guess passwords using common Nigerian terms, slang, sports teams, and simple patterns like `Lagos2024!`, `Arsenal123`, or `Pass12345`.
3. **Shared Workplace Passwords**: Multiple employees sharing a single login password on sticky notes attached to computer monitors, leaving no accountability when an unauthorized transaction occurs.

### Red Flags & High-Risk Password Behaviors

- Using passwords containing your business name, family members'' names, year of birth, or predictable suffixes (e.g. `@2025`).
- Reusing the exact same password for your official corporate email, online banking, and personal entertainment platforms.
- Writing passwords on paper notepads, sticky notes on monitors, or saving them in unencrypted text files on desktop screens.
- Storing passwords in shared WhatsApp groups or plain text spreadsheets accessible to unauthorized staff.

### Strong Credential Protocol for SMEs

- **Adopt the Passphrase Strategy**: Instead of short, hard-to-remember passwords like `P@$$w0rd`, create 4-word passphrases that are long yet memorable (e.g. `IbadanCassavaMarketGate44!`).
- **One System, One Password**: Ensure internet banking, business admin email, and operational accounts each have unique, independent credentials.
- **Deploy a Secure Password Manager**: Use reputable password managers (such as Bitwarden or 1Password) to generate, store, and auto-fill complex 16-character passwords across your workforce.
- **Enforce Mandatory Multi-Factor Authentication (MFA)**: Ensure that even if a password is breached, access cannot be granted without a secondary authenticator app or security key.',
  content_pcm = '## Weak Password & Same Password Everywhere: How Hackers Dey Enter

Using simple password or using the exact same password for your email, bank app, CAC portal, and Facebook na like using one single key for your house gate, your bedroom, and your shop safe. If thief pick that one key, e go open everywhere.

### How Hackers Dey Break Passwords for Naija

1. **Credential Stuffing**: When one small website leak your password, hackers go use computer robot test that same email and password on your bank app, your email, and your social media.
2. **Dictionary Guessing**: Hackers dey use computer guess common words wey Nigerians dey like: `Godisgood1`, `Arsenal2024`, `Nigeria123`, or name of your pikin plus year.
3. **Sticky Note for Desk**: Writing password on paper stick am on top computer screen make every customer or visitor fit see am.

### Red Flags Wey Mean Say You Dey Risk

- You dey use your phone number, your birthday, or your business name as your password.
- If they change your email password today, you go use that same new password for your bank.
- Your office workers dey share one password to log in, and the password dey written inside notebook for counter.

### Better Way to Secure Your Passwords

- **Use Passphrase (Combine 4 Words)**: Instead of short password wey easy to hack, join 4 words wey make sense to you alone, like: `JollofRiceSweetWellWell88!`. E long, e hard to crack, and e easy to remember.
- **Every App Must Get Its Own Unique Password**: Your bank password must differ from your email, and your email must differ from your Instagram.
- **Use Password Manager**: Use free, secure password manager like Bitwarden make you no need dey cram 50 passwords for head.
- **Always Turn On Two-Factor Authentication (2FA)**: Make sure any important app dey ask for code from authenticator app before person fit enter.'
WHERE id = 'd3fc4792-00f3-4c7d-b606-9f1402456336';

UPDATE modules SET
  content_en = '## Unpatched Apps & Outdated Devices: Eliminating Silent Vulnerabilities

Cybercriminals rarely invent new flaws when thousands of small businesses leave known security holes unpatched for months. When software vendors release security updates, they disclose previously discovered weaknesses. Attackers immediately target businesses that delay applying these security patches.

### The Attack Cycle on Outdated Software

1. **Vulnerability Disclosure**: A security patch is released for Windows, Android, WordPress, or accounting software like QuickBooks.
2. **Automated Scanning**: Hackers deploy automated scanners across the internet, looking for Nigerian IP addresses and web servers running obsolete software versions.
3. **Exploitation & Ransom**: Attackers utilize ready-made exploit toolkits to silently penetrate outdated servers or workstations, installing spyware, backdoors, or ransomware without requiring employee interaction.

### Warning Signs of Unpatched Infrastructure

- Windows or Android operating system updates showing as delayed or paused for more than 30 days.
- In-house computers running deprecated, unsupported operating systems (such as Windows 7 or Windows 8) that no longer receive official security patches from Microsoft.
- Web browsers displaying security warnings that SSL certificates or installed extensions are deprecated.
- Office machines randomly freezing, displaying unexpected command prompt windows, or slowing down significantly during routine operations.

### Practical Patch Management for SMEs

- **Enable Automatic Updates**: Turn on automatic updates on all business smartphones, laptops, tablets, and POS devices.
- **Schedule Weekly Reboot Windows**: Many security updates only finalize installation when a computer restarts. Enforce a Friday evening or Saturday morning restart routine across all staff workstations.
- **Retire Unsupported Operating Systems**: Replace or upgrade obsolete operating systems immediately; unsupported systems cannot be protected by antivirus alone.
- **Audit Installed Business Applications**: Uninstall legacy and unused software from business computers to reduce your attack surface.',
  content_pcm = '## Unpatched Apps & Old Devices: Why You Must Update Your Phone and Laptop

Plenty people dey click "Remind me tomorrow" when their phone or laptop show say system update dey. Wetin plenty people no know be say: whenever software company release update, na security holes wey hackers fit use enter your machine dem dey block.

### How Hackers Dey Attack Old Software for Naija

1. **Scanning for Weak Systems**: Hackers get automated tools wey dey scan internet search for businesses wey their computer still dey run old Windows or outdated apps.
2. **Using Ready-Made Exploits**: Because the security hole already dey known, hackers go just fire attack tool enter the system without needing you to click any link.
3. **Total Takeover**: Once dem enter through outdated app, dem fit steal your customer database or lock your files demand ransom.

### Red Flags Wey Show Say Your System Dey Danger

- Your office still dey use Windows 7 or Windows 8 wey Microsoft don stop supporting many years ago.
- Your phone or laptop update history dey show say you never update am for more than 3 months.
- Your internet browser dey always warn you say plugins or website certificates dey outdated.
- Computer dey behave strange or command prompt window dey pop up and disappear on its own.

### Wetin You Must Do for Your Workplace

- **Turn On Automatic Updates Everywhere**: Make sure all your office phones, laptops, and POS terminals get automatic update switched on.
- **Restart Computers Weekly**: Plenty updates no dey finish install until you restart the computer. Make Friday closing time your restart routine.
- **Delete Apps Wey You No Dey Use**: Any old program wey nobody dey use again for office, uninstall am so e no go become open door for hackers.
- **No Use Pirated / Crack Software**: Avoid downloaded crack software from road or torrent; almost all crack software carry hidden trojans and backdoors.'
WHERE id = '1d8909fd-cdff-4799-81f9-92799bea5efd';

UPDATE modules SET
  content_en = '## Public & Unsecured Wi-Fi: Securing Data Outside the Office

Working from coffee shops, hotel lobbies, airports, and public business hubs is routine for modern Nigerian entrepreneurs and field employees. However, connecting to free, open public Wi-Fi networks exposes your business passwords, corporate emails, and client records to interception.

### How Attackers Exploit Public Wi-Fi

1. **Man-in-the-Middle (MitM) Attacks**: Cybercriminals position themselves between your laptop and the internet router, capturing all unencrypted data transmissions, including sensitive login tokens.
2. **Evil Twin Hotspots**: An attacker sets up a rogue Wi-Fi network with an identical or convincing name (e.g. `Murtala_Airport_Free_WiFi` or `Cafe_Guest_5G`). When you connect, all your web traffic passes directly through their surveillance tools.
3. **Packet Sniffing**: Using free, accessible network monitoring software, attackers intercept sensitive traffic on open, unencrypted wireless networks.

### Critical Red Flags on Wireless Networks

- A public Wi-Fi network that requires zero password or security key to connect.
- Multiple identical network names appearing in your available Wi-Fi list (e.g. two networks named `Hotel_Lobby`).
- Web browsers popping up sudden SSL/TLS certificate warnings stating: *"Your connection is not private"* when accessing standard business websites.
- Requests to install unknown security certificates or browser profiles before granting internet access.

### SME Public Network Defense Protocol

- **Avoid Sensitive Financial Transactions**: Never log into internet banking or process vendor payments while connected to public or hotel Wi-Fi networks.
- **Use Mobile Hotspots Instead**: When traveling or working remotely, utilize your mobile phone''s personal 4G/5G hotspot, which provides encrypted, direct cellular connectivity.
- **Mandate Business Virtual Private Networks (VPNs)**: Ensure staff use reputable VPNs that create an encrypted tunnel for all business network traffic.
- **Disable "Auto-Connect to Open Networks"**: Configure all company laptops and mobile devices to forget public networks and never auto-join open Wi-Fi.',
  content_pcm = '## Public Wi-Fi Risks: Why Free Wi-Fi Fit Expose Your Business Secrets

To work from hotel, airport, eatery, or co-working space dey sweet. But when you connect your business phone or laptop enter free public Wi-Fi wey no get password, you dey open your screen give everyone wey dey that same network see.

### How Hackers Dey Steal Data from Free Wi-Fi

1. **Evil Twin (Fake Clone Hotspot)**: Scammer go sit down for airport or hotel turn on his own personal hotspot name am `Airport_Free_HighSpeed_WiFi`. Once you connect, every website you open and password you type dey pass through his computer.
2. **Man-in-the-Middle Spy**: Attacker go intercept the connection between your laptop and the router, dey copy your banking session cookies and emails.
3. **Malware Injection**: Fake Wi-Fi portal fit prompt you say: *"You must update your browser before internet fit work,"* and if you click, virus go download enter your machine.

### Red Flags Wey You Must Watch Out For

- The Wi-Fi network no dey ask for any password at all before e connect.
- You see two or three Wi-Fi with almost the same name for that place.
- Your browser suddenly begin show red warning: *"Your connection is not private"* or *"Certificate error"*.
- The Wi-Fi dey force you install strange app or profile before e let you browse.

### Wetin You and Your Staff Must Do

- **No Open Bank App on Top Free Public Wi-Fi**: If you must do transfer or check balance, disconnect from the free Wi-Fi first.
- **Use Your Own Phone Hotspot**: Your personal MTN, Airtel, or Glo hotspot dey far more secure than any open public Wi-Fi.
- **Use VPN**: If you must use outside network, make sure you turn on VPN make your data dey encrypted.
- **Turn Off "Auto-Connect"**: Change your phone and laptop setting make e no dey automatically connect enter any open Wi-Fi wey e see for road.'
WHERE id = 'e444cc62-18f3-4d58-a831-0cbee54be76e';

UPDATE modules SET
  content_en = '## Business Email Compromise (BEC) & Invoice Fraud

Business Email Compromise (BEC) is the single most financially damaging cyber threat facing Nigerian SMEs, import/export traders, contractors, and logistics companies. Rather than relying on malicious software, attackers exploit trust, urgency, and flawed payment verification procedures.

### How BEC and Fake Invoice Attacks Unfold

1. **Silent Mailbox Infiltration**: Attackers obtain an executive''s or vendor''s email password via phishing. They quietly set up forwarding rules to monitor payment conversations without triggering alarms.
2. **The "Updated Bank Account" Deception**: Just as a major purchase order or contract milestone payment is finalized, the attacker sends an urgent email mimicking the supplier: *"Please note our auditors are restructuring our accounts; kindly route this payment to our new partner bank account."*
3. **Domain Spoofing**: Attackers register deceptive domains that look nearly identical to legitimate vendors (e.g. `supplier-ng.com` instead of `supplier.com`) to deceive cashiers and accountants.

### Red Flags & High-Risk Indicators

- Any email requesting that payments be redirected to a new or personal bank account name.
- Extreme urgency emphasizing that goods will be delayed or legal penalties incurred if the transfer is not executed immediately.
- Slight discrepancies in email addresses (e.g. transposed letters or substituted domains like `.co` instead of `.com`).
- Instructions explicitly forbidding phone confirmation (e.g. *"I am in an executive meeting, do not call, communicate only via email"*).

### Defensive Standard Operating Procedures (SOPs)

- **Mandatory Out-of-Band Verbal Confirmation**: Establish a non-negotiable policy: No bank detail change is ever executed without verbally confirming the account number via a verified, known phone number.
- **Two-Person Approval on Transfers**: Require dual authorization for all vendor settlements above a defined threshold.
- **Inspect Email Headers & Domains**: Train accounts personnel to scrutinize sender addresses and reply-to fields on every payment invoice.
- **Implement Email Authentication (SPF, DKIM, DMARC)**: Secure your corporate domain with modern email authentication protocols to prevent unauthorized spoofing.',
  content_pcm = '## Business Email Compromise & Fake Invoice: The Scam Wey Dey Sweep Big Money

Business Email Compromise (BEC) na the threat wey dey cost Nigerian businesses the biggest money. Scammers no dey use virus; na brain, fake email, and urgency dem dey use trick your accountant or cashier pay supplier money enter wrong account.

### How BEC Dey Happen for Naija Businesses

1. **Silent Monitoring**: Scammer go hack your supplier email or your own email, sit down quiet dey read all your business chats and invoices.
2. **The "Our Bank Account Don Change" Trap**: Just as your container or goods wan land, scammer go send email say: *"Our bank dey undergo audit, pay the ₦5,000,000 enter our new account details attached."*
3. **Spoofed Email Domain**: The email go look almost exactly like your real supplier, maybe with one small letter difference (like `dangotee-group.com` instead of `dangote-group.com`). If you no look well, you go send money give thief.

### Red Flags Wey You Must Catch Immediately

- Any email wey tell you say make you pay enter new or different bank account number.
- The email dey pressure you die say: *"If you no pay within 2 hours, goods go delay or price go double!"*
- The sender talk say: *"I dey meeting or plane, no call my phone, reply only by email."*
- Small spelling difference inside the email address wey send the invoice.

### The Rule We Must Follow for Office

- **Call Phone Confirm Before You Pay**: Anytime supplier say bank account don change, NEVER pay with email confirmation alone. Pick phone call the MD or GM for the number wey you already know before.
- **Two People Must Sign Big Payment**: No single staff suppose get power transfer big business money without second person checking the invoice and account name.
- **Match Account Name with Company CAC Name**: If company name na ABC Nigeria Ltd, why you dey pay enter personal account name like Chukwudi or Ibrahim? Stop and verify!
- **Protect Your Own Business Email with 2FA**: Make sure all staff email get two-step verification so scammers no go fit hack am read your transactions.'
WHERE id = 'b5e4d8be-1f55-4049-95a5-aa586a6ccafb';

UPDATE modules SET
  content_en = '## Fake & Cloned Online Store Scams: Protecting Your Brand & Wallet

As Nigerian businesses expand online via e-commerce websites, Instagram storefronts, and WhatsApp catalogs, scammers aggressively clone legitimate merchant brands to swindle consumers and steal payment card credentials.

### How Clone Stores & Impersonation Scams Operate

1. **Brand Asset Duplication**: Fraudsters download high-resolution photos, customer reviews, product descriptions, and registration logos directly from legitimate SME social media pages and websites.
2. **Sponsored Ad Promotion**: The cloned store runs sponsored campaigns on Instagram, TikTok, and Facebook promoting clearance sales with unrealistic discounts (e.g. *"75% off all iPhones & Lace Fabrics today only!"*).
3. **Payment Card & Bank Transfer Interception**: Shoppers either transfer funds to scam accounts or input payment credentials into fraudulent payment gateways, never receiving goods and blaming the genuine merchant.

### Warning Signs of Fraudulent Clones

- Unrealistic pricing substantially lower than prevailing market values (*"Too good to be true"* offers).
- Social media pages with thousands of followers but zero meaningful comments, or where all post comments are disabled/hidden.
- Account name history showing frequent rebranding (e.g. an Instagram page created last week under a completely different name).
- Absence of verifiable Nigerian physical address, contact telephone numbers, or CAC registration credentials.

### Brand Protection & Safe Purchasing Protocol

- **Actively Monitor Brand Mentions**: Regularly search for your business name on social platforms to detect and report clone accounts early before they defraud your patrons.
- **Publish Official Channels Clearly**: Place clear warnings on your website and profiles listing your ONLY official payment accounts and social handles.
- **Verify URLs & Domain Ages**: When procuring inventory online, inspect domain extensions and look for secure payment indicators (HTTPS and certified payment processors like Paystack or Flutterwave).
- **Report Impersonation Swiftly**: File intellectual property and fraud reports through platform abuse forms and notify the Nigerian Communications Commission (NCC) or relevant law enforcement bodies.',
  content_pcm = '## Fake & Cloned Online Store: How Dem Dey Copy Your Business Defraud Customers

As e-commerce dey boom for Nigeria, fraudsters dey copy pictures, logos, and reviews from real businesses set up fake Instagram pages and websites take scam customers. When trouble burst, na your real business name customers go carry go police or social media.

### How Dem Dey Clone Business for Naija

1. **Stealing Your Photos and Logo**: Scammers go download all the fine pictures of bags, clothes, phones, or wigs from your Instagram page.
2. **Running Sponsored Ads with Cheap Prices**: Dem go run Instagram ad promise 70% discount say: *"Clearance sale! Pay now make we deliver free today!"*
3. **Collecting Transfer and Disappearing**: Once customers pay into their OPay, PalmPay, or commercial bank account, dem go block the customer. The angry customer go come your real shop come fight you!

### Red Flags Wey Go Help You Spot Fake Stores

- Price too cheap for market reality—goods of ₦100,000 dem dey sell am ₦25,000.
- Comments section turned off, or all comments na robotic praise with no real conversation.
- The page name change 5 times inside 6 months (check "About this account" on Instagram).
- Dem no get physical shop, no get active phone number, and dem dey force person pay before delivery without escrow.

### How to Protect Your Shop and Customers

- **Put Watermark on Your Product Photos**: Write your business name or handle across your product pictures make e hard for scammers steal am.
- **Pin Your Official Bank Accounts on Your Page**: Let your customers know clearly say: *"We only receive money with ABC Ventures Zenith Bank account. Any other account na scam!"*
- **Tell Customers How to Spot Imposters**: Warn your followers regularly on your status say fake pages dey clone your brand.
- **Report Clones Fast**: Immediately you or your customer see fake page, gather friends report am on Instagram or Facebook make dem take am down.'
WHERE id = '2fadd432-900b-44c1-98d2-d55b918d7993';

UPDATE modules SET
  content_en = '## Voice Phishing ("Vishing") & AI Voice-Clone Scams

Phone-based social engineering has evolved from crude caller deception into sophisticated impersonation. With the proliferation of Artificial Intelligence (AI) voice cloning, cybercriminals only need a 3-second audio snippet of an executive or family member to generate realistic, convincing phone calls authorizing fraudulent transactions.

### How Modern Vishing & Voice-Clones Target SMEs

1. **Executive Impersonation (CEO Fraud)**: An attacker uses AI software to clone the business owner''s voice and calls the accountant or branch manager: *"I am at a supplier warehouse and urgently need ₦750,000 released immediately to this vendor. Transfer it now."*
2. **The "Bank Security Officer" Call**: A scammer calls claiming to be from your bank''s fraud department, reciting your BVN or recent transaction amounts to gain trust, then urgently demanding your OTP to *"block a fraudulent transfer."*
3. **Distress & Emergency Scams**: Fraudsters call retail store managers claiming a director has had an accident or been detained by regulatory authorities, demanding emergency bail or medical fees.

### Red Flags in Voice Calls

- Unusual urgency combined with strict demands for immediate fund transfer or sensitive information disclosure.
- Slight robotic audio artifacts, unnatural pauses, or refusal to answer background or context questions during the call.
- The caller demands that you bypass established payment authorization protocols.
- The caller asks you to read aloud an SMS OTP or security code received during the call.

### Safe Telephone Protocol for Business Staff

- **Hang Up and Call Back via Known Lines**: If an unexpected call requests money, account details, or credentials, hang up immediately. Dial the known, saved personal phone number of the caller to verify.
- **Establish a Workplace "Duress / Safe Word"**: Create a private spoken verification phrase known only to executives and finance managers to validate emergency cash transfer requests.
- **Zero OTP Sharing Rule**: Reiterate to all staff that legitimate Nigerian banks will NEVER call asking for an OTP, ATM card CVV, or mobile banking password.',
  content_pcm = '## Voice Phishing & AI Voice-Clone 419: When Scammer Voice Sound Like Your Boss

Before before, phone scam na when somebody call you dey talk with strange accent. But today, with AI voice cloning, scammer fit carry 5 seconds voice note from your MD Facebook or status, use computer make that exact voice talk say: *"Transfer ₦500,000 give this supplier now now."*

### How Voice Scam Dey Work for Naija

1. **The Fake Boss Call (CEO Fraud)**: Accountant go receive call from number wey sound 100% like his MD voice: *"Abeg I dey meeting with tax officers, quickly transfer ₦600,000 enter this account make dem no seal our office."*
2. **The "Bank Customer Care" Trick**: Scammer go call you say: *"Good morning, this is Zenith Bank fraud unit. Somebody dey try withdraw ₦200,000 from your account for Abuja. Call the code wey just enter your phone make we block am."*
3. **Emergency Panic Call**: Dem go call your cashier say your family member get accident or police hold am, say send money immediately.

### Red Flags Wey You Must Spot on Phone Call

- The caller dey rush you die say: *"Do am now now, no waste time!"*
- The voice dey sound small robotic or get strange echo wey no normal.
- The caller dey ask you read out SMS OTP code wey enter your phone.
- The caller dey tell you make you no follow standard office payment process.

### Safe Call Rules for All Staff

- **Cut Call and Dial the Real Number**: If anybody call you ask for money or password—even if the voice sound like your MD or pastor—cut the call immediately. Dial his real saved number yourself confirm.
- **No Bank Go Ever Call Ask for OTP**: Banks in Nigeria dey say am every day: No bank officer will EVER ask for your OTP, PIN, or CVV on top phone.
- **Create Company Code Word**: Agree on one secret word inside your business wey only MD and accountant know. If voice request money without that secret word, na 419!'
WHERE id = '6dcfd918-8548-496e-9fcd-b406a4e1c624';

UPDATE modules SET
  content_en = '## QR Code Scams ("Quishing"): The Hidden Threat Behind the Scan

Quick Response (QR) codes are ubiquitous across Nigerian retail counters, restaurant tables, event banners, and invoices for rapid payments and menu lookups. However, because human eyes cannot read the encoded URL inside a QR code, attackers easily exploit this blind spot to route victims to malicious websites.

### How Quishing Attacks Target Nigerian SMEs & Patrons

1. **Counter QR Sticker Tampering**: A fraudster covertly places a fraudulent QR code sticker directly over the genuine payment QR code displayed on your counter or table, causing customer payments to route directly to the criminal''s wallet.
2. **Phishing Invoices with Embedded QR Codes**: Attackers send email invoices containing embedded QR codes to bypass standard email spam and security scanners, which typically analyze text links rather than images.
3. **Fake Utility & Parking Fines**: Scammers place stickers on business delivery vans or shop frontages claiming to be from state revenue or traffic authorities (e.g. LASAA or KASTLEA) directing victims to cloned payment portals.

### Red Flags in QR Codes

- Counter QR code displays that show physical signs of peeling, bubbling, or having a sticker pasted over the original placard.
- Scanning a QR code produces a shortened URL (e.g. `bit.ly/...`, `tinyurl.com/...`) or an unfamiliar domain instead of your verified payment partner.
- The scanned page immediately prompts you to download an `.apk` application or input banking credentials.
- Invoices where the payment instructions are hidden exclusively inside a QR code without clear bank text details.

### Defensive Protocols for Merchants & Staff

- **Routinely Inspect Counter Placards**: Conduct daily morning and evening checks of all printed payment QR codes on your counters, ensuring no rogue sticker has been superimposed.
- **Preview URLs Before Opening**: Ensure phone cameras or scanner apps display the destination web address before automatically opening it in a browser.
- **Never Enter Banking Credentials from a QR Scan**: Legitimate payment QR codes initiate structured merchant payments; they never prompt you to enter your private internet banking password.
- **Use Branded, Tamper-Evident Placards**: Encase your official payment QR codes inside rigid acrylic stands or behind protective glass rather than using loose paper printouts.',
  content_pcm = '## QR Code 419 ("Quishing"): The Scam Wey Dey Hide Behind Barcode

Today for Naija, QR code dey everywhere: for restaurant table, supermarket counter, church bulletin, and POS stand. You just point your phone camera, scan am, and pay. But because human being eye no fit read wetin dey inside the black and white pattern, scammers dey use am set trap.

### How Quishing Dey Happen for Naija Shops

1. **Pasting Fake Sticker on Your Counter**: Scammer go come your shop buy something small. While your cashier dey pack goods, the scammer go quietly paste his own fake QR sticker on top your original store payment QR stand! When next customer scan to pay, the money go enter scammer account!
2. **Fake Government Revenue Sticker**: Scammers go paste fake QR sticker on top your shop gate or delivery van say na "Lagos State Signage Fee" or "Local Government Permit". If you scan am, e go carry you go fake payment page.
3. **Phishing Email with QR Code**: Scammers dey send email attach QR code say: *"Scan this QR code to update your tax certificate"*. Security email filters no dey catch image easily, so e fit land inside your inbox.

### Red Flags Wey You Must Watch For

- Your payment counter QR stand look like say person paste another sticker on top am or e dey peel for edge.
- You scan QR code, the link wey show look like `bit.ly` or strange website wey no be your official bank or Paystack.
- Scanning the code immediately prompt your phone make e download one unknown file or app (.apk).
- The page wey open dey demand your ATM card PIN or online banking password.

### Wetin You Must Do for Your Counter

- **Check Your Counter QR Stand Every Day**: Every morning when you open shop and every night when you close, run your hand on top the QR stand make sure nobody paste fake sticker on top am.
- **Use Hard Glass / Acrylic Stand**: Put your QR code inside solid frame with glass so nobody fit easily paste paper sticker on top am without you knowing.
- **Look the Link Before You Click Open**: When your phone scan QR code, check the website address first before you tap am open.
- **Never Type Your Secret PIN on Any Scanned Page**: Genuine QR code for payment no go ever demand your secret ATM PIN or mobile banking password.'
WHERE id = '864e223e-00cf-4e56-b1b5-83f3a472ffb8';

UPDATE modules SET
  content_en = '## Device Theft, Loss & Lack of Backups: Resilience Under Crisis

In Nigeria, the physical loss or theft of an office laptop, cashier phone, or POS tablet is one of the most abrupt ways an SME loses years of accounting records, customer contact databases, and proprietary business documents. Without automated backups and remote security controls, physical loss rapidly converts into complete business failure.

### The True Business Impact of Unsecured Lost Devices

1. **Data Extortion & Loss**: If your sole accounting laptop is stolen or its hard drive crashes, you lose your inventory ledger, invoicing history, and supplier contacts with zero ability to recover.
2. **Corporate Identity Theft**: If the stolen phone or laptop was not encrypted or lacked strong screen lock passcodes, thieves gain immediate access to saved browser passwords, corporate emails, and mobile banking applications.
3. **Regulatory Non-Compliance (NDPA 2023)**: Under the Nigeria Data Protection Act (NDPA 2023), losing unencrypted customer personal records constitutes a reportable breach attracting severe statutory fines.

### Red Flags & High-Risk Practices

- Storing all business records exclusively on a single office laptop or desktop with zero offsite or cloud backup.
- Leaving company laptops or accounting tablets visible in cars or unattended at merchant counters during business hours.
- Devices configured with no screen lock, simple 4-digit PINs like `1234`, or permanently disabled biometric security.
- Failure to test whether backup copies can actually be restored successfully before disaster strikes.

### Business Resilience & Defense Checklist (The 3-2-1 Rule)

- **Implement the 3-2-1 Backup Strategy**:
  - Keep **3** copies of critical business data,
  - On **2** different storage types (e.g. computer hard drive + external drive),
  - With **1** copy kept completely offsite (e.g. secure cloud storage like Google Drive, OneDrive, or Dropbox).
- **Enforce Full Disk Encryption**: Enable BitLocker on all Windows laptops and FileVault on Mac devices so stolen physical storage cannot be read by third parties.
- **Enable Remote Find & Wipe**: Activate Google Find My Device or Apple Find My across all staff devices, allowing you to track and remotely erase all corporate data if a device is stolen.
- **Physical Lock & Anchor**: Secure cashier desktops and store equipment with physical Kensington cable locks in retail environments.',
  content_pcm = '## Device Theft, Loss & No Backup: How to Protect Your Business Files

For Nigeria, losing your business laptop or phone no be just about buying new device. If that device hold all your customer phone numbers, sales record, supplier contacts, and invoices, your business fit collapse overnight if you no get backup.

### Wetin Dey Happen When Person Lose Device Without Backup

1. **Total Memory Loss**: All your 5 years business transactions, inventory, and CAC documents disappear just like that because e only dey inside that one laptop.
2. **Thief Fit Open Your Bank & Email**: If the laptop or phone no get strong password, the thief go open your browser, see all your saved passwords, and begin enter your business accounts.
3. **NDPA 2023 Law Trouble**: Under the new Nigeria Data Protection Act (NDPA), if thief steal customer phone numbers and credit details from your unprotected laptop, government fit penalize your company heavily.

### Red Flags Wey Mean Say You Dey Danger

- All your company accounting files dey only inside one single desktop for office.
- You never backup your files go cloud or external drive for the past 6 months.
- Your office phone or laptop no get screen lock, or the lock code na `1234` or `0000`.
- You dey leave company laptop inside car booth or on top cashier counter when you step commot.

### The 3-2-1 Rule to Protect Your Business

- **Follow the 3-2-1 Backup Rule**:
  - Keep **3** copies of your important files,
  - For **2** different places (e.g. your computer + external hard drive),
  - Put **1** copy for cloud storage (like Google Drive, OneDrive, or Dropbox) so even if fire burn office, your files dey safe.
- **Turn On Device Encryption (BitLocker)**: Turn on BitLocker for your Windows laptop. Even if thief remove the hard drive put am for another computer, e no go fit read any single file without password.
- **Turn On "Find My Device" & Remote Wipe**: Make sure Google "Find My Device" or Apple "Find My" dey active. If thief run with your phone, you fit sit down house wipe all your company data commot clean.
- **Lock Your Screen Always**: Teach all workers make dem lock computer screen (Windows Key + L) anytime dem stand up from their desk.'
WHERE id = 'd0789a10-bee0-4ec1-a255-5290895527c7';

