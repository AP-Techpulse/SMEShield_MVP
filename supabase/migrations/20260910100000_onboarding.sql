-- Add business_type to businesses table
alter table public.businesses add column if not exists business_type text;
alter table public.businesses add column if not exists location text;
alter table public.businesses add column if not exists employee_count text;
alter table public.businesses add column if not exists join_code text unique;

-- Add onboarding_complete to users table
alter table public.users add column if not exists onboarding_complete boolean default false;

-- Users can insert their own profile row on signup
drop policy if exists "Users can insert own profile" on public.users;
create policy "Users can insert own profile" on public.users
    for insert with check (auth.uid() = id);

-- Users can insert a new business (business owners)
drop policy if exists "Business owners can insert business" on public.businesses;
create policy "Business owners can insert business" on public.businesses
    for insert with check (
        auth.role() = 'authenticated'
    );

-- Business owners can update their own business
drop policy if exists "Business owners can update business" on public.businesses;
create policy "Business owners can update business" on public.businesses
    for update using (
        id in (select business_id from public.users where id = auth.uid() and role = 'business_owner')
    );

-- Allow reading businesses by join code (for employee join flow)
drop policy if exists "Anyone can read business by join code" on public.businesses;
create policy "Anyone can read business by join code" on public.businesses
    for select using (join_code is not null);
