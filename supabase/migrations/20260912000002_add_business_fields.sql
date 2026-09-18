alter table public.businesses
add column if not exists location_state text default '',
add column if not exists employee_count integer default 1,
add column if not exists business_type text default 'Other';
