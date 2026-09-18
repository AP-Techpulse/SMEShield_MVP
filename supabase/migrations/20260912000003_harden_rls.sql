-- Drop the overly permissive policy
drop policy if exists "Users can update own profile" on public.users;

-- Create a restrictive policy for updates
create policy "Users can update own profile" on public.users
    for update using (auth.uid() = id);

-- Create a trigger to prevent privilege escalation via RLS
create or replace function public.restrict_user_updates()
returns trigger
language plpgsql security definer
as $$
begin
    -- Only restrict if the user is calling from the client (authenticated or anon)
    -- Service role bypasses this check
    if auth.role() = 'authenticated' or auth.role() = 'anon' then
        -- prevent changes to role
        if new.role is distinct from old.role then
            raise exception 'Not allowed to modify role';
        end if;
        -- prevent changes to business_id
        if new.business_id is distinct from old.business_id then
            raise exception 'Not allowed to modify business_id';
        end if;
        -- prevent changes to onboarding_complete
        if new.onboarding_complete is distinct from old.onboarding_complete then
            raise exception 'Not allowed to modify onboarding_complete';
        end if;
    end if;
    return new;
end;
$$;

drop trigger if exists tr_restrict_user_updates on public.users;
create trigger tr_restrict_user_updates
before update on public.users
for each row
execute function public.restrict_user_updates();
