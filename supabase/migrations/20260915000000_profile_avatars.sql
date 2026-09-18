-- Add avatar_url to users table
ALTER TABLE public.users ADD COLUMN avatar_url text;

-- Create avatars bucket (public)
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);

-- Policy to allow authenticated users to upload their own avatar in their user folder
create policy "Users can upload their own avatar"
on storage.objects for insert
with check (
  bucket_id = 'avatars' 
  and auth.role() = 'authenticated'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can update their own avatar"
on storage.objects for update
using (
  bucket_id = 'avatars'
  and auth.role() = 'authenticated'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can delete their own avatar"
on storage.objects for delete
using (
  bucket_id = 'avatars'
  and auth.role() = 'authenticated'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Avatars are publicly accessible"
on storage.objects for select
using ( bucket_id = 'avatars' );
