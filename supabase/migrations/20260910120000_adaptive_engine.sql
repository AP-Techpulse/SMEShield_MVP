-- Add metadata columns to modules table
alter table public.modules add column if not exists threat_category text;
alter table public.modules add column if not exists business_type_tags text[];

-- Update the 15 seed modules with their respective tags
-- Note: 'all' in business_type_tags implies relevance to all 8 sectors.

-- 1. Phishing & Fake Alerts
update public.modules set 
  threat_category = 'phishing', 
  business_type_tags = array['Retail & General Trade', 'Professional Services', 'Agriculture & Food', 'Tech & Telecom', 'Healthcare & Pharmacy', 'Education & Training', 'Logistics & Transport', 'Art, Beauty & Fashion']
where order_index = 1;

-- 2. Fake Payment / "Flash Funds" Scams
update public.modules set 
  threat_category = 'fake_payment', 
  business_type_tags = array['Retail & General Trade', 'Art, Beauty & Fashion', 'Logistics & Transport', 'Agriculture & Food']
where order_index = 2;

-- 3. Ransomware
update public.modules set 
  threat_category = 'ransomware', 
  business_type_tags = array['Professional Services', 'Healthcare & Pharmacy', 'Tech & Telecom', 'Education & Training']
where order_index = 3;

-- 4. Social Media & WhatsApp Account Takeover
update public.modules set 
  threat_category = 'social_engineering', 
  business_type_tags = array['Retail & General Trade', 'Art, Beauty & Fashion', 'Professional Services', 'Tech & Telecom']
where order_index = 4;

-- 5. USB Malware & Keyloggers
update public.modules set 
  threat_category = 'device_security', 
  business_type_tags = array['Education & Training', 'Tech & Telecom', 'Professional Services', 'Healthcare & Pharmacy']
where order_index = 5;

-- 6. SIM Swap Fraud
update public.modules set 
  threat_category = 'sim_swap', 
  business_type_tags = array['Retail & General Trade', 'Professional Services', 'Agriculture & Food', 'Tech & Telecom', 'Healthcare & Pharmacy', 'Education & Training', 'Logistics & Transport', 'Art, Beauty & Fashion']
where order_index = 6;

-- 7. POS/Agent Banking Fraud
update public.modules set 
  threat_category = 'agent_banking', 
  business_type_tags = array['Retail & General Trade', 'Logistics & Transport', 'Agriculture & Food']
where order_index = 7;

-- 8. Weak Passwords & Credential Reuse
update public.modules set 
  threat_category = 'passwords', 
  business_type_tags = array['Retail & General Trade', 'Professional Services', 'Agriculture & Food', 'Tech & Telecom', 'Healthcare & Pharmacy', 'Education & Training', 'Logistics & Transport', 'Art, Beauty & Fashion']
where order_index = 8;

-- 9. Unpatched Apps & Outdated Devices
update public.modules set 
  threat_category = 'device_security', 
  business_type_tags = array['Tech & Telecom', 'Professional Services', 'Healthcare & Pharmacy', 'Education & Training']
where order_index = 9;

-- 10. Public/Unsecured Wi-Fi Risks
update public.modules set 
  threat_category = 'wifi_security', 
  business_type_tags = array['Professional Services', 'Tech & Telecom', 'Retail & General Trade', 'Art, Beauty & Fashion']
where order_index = 10;

-- 11. Business Email Compromise & Fake Invoices
update public.modules set 
  threat_category = 'bec', 
  business_type_tags = array['Professional Services', 'Logistics & Transport', 'Healthcare & Pharmacy', 'Tech & Telecom', 'Education & Training']
where order_index = 11;

-- 12. Fake/Cloned Online Store Scams
update public.modules set 
  threat_category = 'phishing', 
  business_type_tags = array['Art, Beauty & Fashion', 'Retail & General Trade']
where order_index = 12;

-- 13. Voice Phishing & AI Voice-Clone Scams
update public.modules set 
  threat_category = 'social_engineering', 
  business_type_tags = array['Professional Services', 'Healthcare & Pharmacy', 'Tech & Telecom', 'Retail & General Trade']
where order_index = 13;

-- 14. QR Code Scams ("Quishing")
update public.modules set 
  threat_category = 'phishing', 
  business_type_tags = array['Retail & General Trade', 'Logistics & Transport', 'Art, Beauty & Fashion', 'Healthcare & Pharmacy']
where order_index = 14;

-- 15. Device Theft/Loss & Lack of Backups
update public.modules set 
  threat_category = 'device_security', 
  business_type_tags = array['Retail & General Trade', 'Professional Services', 'Agriculture & Food', 'Tech & Telecom', 'Healthcare & Pharmacy', 'Education & Training', 'Logistics & Transport', 'Art, Beauty & Fashion']
where order_index = 15;
