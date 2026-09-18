-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Businesses Table
create table public.businesses (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Users Table (Profile extending auth.users)
-- Roles: 'business_owner', 'employee', 'sole_entrepreneur'
create table public.users (
    id uuid primary key references auth.users(id) on delete cascade,
    role text not null check (role in ('business_owner', 'employee', 'sole_entrepreneur')),
    business_id uuid references public.businesses(id) on delete set null,
    full_name text not null,
    preferred_language text default 'en' check (preferred_language in ('en', 'pcm')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Modules Table
create table public.modules (
    id uuid primary key default uuid_generate_v4(),
    order_index integer not null,
    title_en text not null,
    title_pcm text not null,
    content_en text not null,
    content_pcm text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Quiz Questions Table
create table public.quiz_questions (
    id uuid primary key default uuid_generate_v4(),
    module_id uuid references public.modules(id) on delete cascade not null,
    question_en text not null,
    question_pcm text not null,
    options_en jsonb not null, -- array of strings
    options_pcm jsonb not null, -- array of strings
    correct_option_index integer not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. User Progress Table
create table public.user_progress (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete cascade not null,
    module_id uuid references public.modules(id) on delete cascade not null,
    status text default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
    completed_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, module_id)
);

-- 6. Assessment Results Table
create table public.assessment_results (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete cascade not null,
    module_id uuid references public.modules(id) on delete cascade not null,
    score_percentage integer not null check (score_percentage >= 0 and score_percentage <= 100),
    passed boolean not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Employee Invites Table
create table public.employee_invites (
    id uuid primary key default uuid_generate_v4(),
    business_id uuid references public.businesses(id) on delete cascade not null,
    email text not null,
    status text default 'pending' check (status in ('pending', 'accepted', 'revoked')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.businesses enable row level security;
alter table public.users enable row level security;
alter table public.modules enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.user_progress enable row level security;
alter table public.assessment_results enable row level security;
alter table public.employee_invites enable row level security;

-- Create Policies

-- Users: Can read their own profile, or Business Owners can read employees in their business.
create policy "Users can read own profile" on public.users
    for select using (auth.uid() = id);

create policy "Business owners can read employees" on public.users
    for select using (
        auth.uid() in (
            select id from public.users where role = 'business_owner' and business_id = public.users.business_id
        )
    );

create policy "Users can update own profile" on public.users
    for update using (auth.uid() = id);

-- Businesses: Business owner can read their own business
create policy "Users can read their own business" on public.businesses
    for select using (
        id in (select business_id from public.users where id = auth.uid())
    );

-- Modules & Quizzes: Anyone authenticated can read
create policy "Authenticated users can read modules" on public.modules
    for select using (auth.role() = 'authenticated');

create policy "Authenticated users can read quiz questions" on public.quiz_questions
    for select using (auth.role() = 'authenticated');

-- User Progress: Can read/write their own progress. Business owners can read employee progress.
create policy "Users can manage own progress" on public.user_progress
    for all using (auth.uid() = user_id);

create policy "Business owners can read employee progress" on public.user_progress
    for select using (
        user_id in (
            select id from public.users 
            where business_id in (
                select business_id from public.users where id = auth.uid() and role = 'business_owner'
            )
        )
    );

-- Assessment Results: Same as User Progress
create policy "Users can read own assessments" on public.assessment_results
    for select using (auth.uid() = user_id);
    
create policy "Users can insert own assessments" on public.assessment_results
    for insert with check (auth.uid() = user_id);

create policy "Business owners can read employee assessments" on public.assessment_results
    for select using (
        user_id in (
            select id from public.users 
            where business_id in (
                select business_id from public.users where id = auth.uid() and role = 'business_owner'
            )
        )
    );

-- Invites: Business owner can manage invites for their business
create policy "Business owners manage invites" on public.employee_invites
    for all using (
        business_id in (
            select business_id from public.users where id = auth.uid() and role = 'business_owner'
        )
    );
