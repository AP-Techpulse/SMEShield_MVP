-- Fix for infinite recursion in public.users policy

-- 1. Drop the offending policy
drop policy if exists "Business owners can read employees" on public.users;

-- 2. Create a secure helper function to check if the current user is a business owner of a specific business
-- SECURITY DEFINER runs the function bypassing RLS, which prevents the infinite recursion.
create or replace function public.is_business_owner_of(check_business_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 
    from public.users 
    where id = auth.uid() 
      and role = 'business_owner' 
      and business_id = check_business_id
  );
$$;

-- 3. Recreate the policy using the helper function
create policy "Business owners can read employees" on public.users
    for select using (
        public.is_business_owner_of(business_id)
    );
