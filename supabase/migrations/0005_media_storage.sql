-- ============================================================================
-- Storage: public "media" bucket for admin-uploaded images & videos.
-- Same access model as the content tables in 0001_init_cms_schema.sql —
-- anyone can read (site visitors load the images/videos), only a signed-in
-- Supabase Auth user (i.e. an admin) can upload, replace, or delete.
-- Run once against the project (Supabase SQL Editor, `supabase db push`,
-- or the Supabase MCP `apply_migration` tool).
-- ============================================================================

insert into storage.buckets (id, name, public, file_size_limit)
values ('media', 'media', true, 314572800) -- 300MB, covers admin-uploaded review/intro videos
on conflict (id) do update set public = true, file_size_limit = 314572800;

create policy "media_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

create policy "media_admin_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and auth.uid() is not null);

create policy "media_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and auth.uid() is not null)
  with check (bucket_id = 'media' and auth.uid() is not null);

create policy "media_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and auth.uid() is not null);
