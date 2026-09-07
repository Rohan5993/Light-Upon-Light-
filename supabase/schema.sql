-- Light Upon Light: blog CMS schema (Google auth editors via Supabase)
-- Project: dytnsafqjxovcwcvixex

-- Editors allowlist
create table if not exists public.blog_editors (
  email text primary key,
  created_at timestamptz not null default now()
);

-- Blog posts
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  date_label text not null default '',
  category text not null default '',
  body text not null default '',
  image_url text not null default '',
  is_featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_published_idx on public.blog_posts (published);
create index if not exists blog_posts_featured_idx on public.blog_posts (is_featured);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- Helper: is current user an allowlisted editor?
create or replace function public.is_blog_editor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.blog_editors e
    where lower(e.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_blog_editor() from public;
grant execute on function public.is_blog_editor() to authenticated, anon;

alter table public.blog_editors enable row level security;
alter table public.blog_posts enable row level security;

-- blog_editors policies
drop policy if exists blog_editors_select_own on public.blog_editors;
create policy blog_editors_select_own
  on public.blog_editors
  for select
  to authenticated
  using (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));

drop policy if exists blog_editors_select_editors on public.blog_editors;
create policy blog_editors_select_editors
  on public.blog_editors
  for select
  to authenticated
  using (public.is_blog_editor());

-- blog_posts policies
drop policy if exists blog_posts_public_read on public.blog_posts;
create policy blog_posts_public_read
  on public.blog_posts
  for select
  to anon, authenticated
  using (published = true or public.is_blog_editor());

drop policy if exists blog_posts_editor_insert on public.blog_posts;
create policy blog_posts_editor_insert
  on public.blog_posts
  for insert
  to authenticated
  with check (public.is_blog_editor());

drop policy if exists blog_posts_editor_update on public.blog_posts;
create policy blog_posts_editor_update
  on public.blog_posts
  for update
  to authenticated
  using (public.is_blog_editor())
  with check (public.is_blog_editor());

drop policy if exists blog_posts_editor_delete on public.blog_posts;
create policy blog_posts_editor_delete
  on public.blog_posts
  for delete
  to authenticated
  using (public.is_blog_editor());

-- Seed primary editor
insert into public.blog_editors (email)
values ('lightuponlight1408@gmail.com')
on conflict (email) do nothing;

-- Storage bucket for blog images
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog',
  'blog',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set public = true,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists blog_images_public_read on storage.objects;
create policy blog_images_public_read
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'blog');

drop policy if exists blog_images_editor_insert on storage.objects;
create policy blog_images_editor_insert
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'blog' and public.is_blog_editor());

drop policy if exists blog_images_editor_update on storage.objects;
create policy blog_images_editor_update
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'blog' and public.is_blog_editor())
  with check (bucket_id = 'blog' and public.is_blog_editor());

drop policy if exists blog_images_editor_delete on storage.objects;
create policy blog_images_editor_delete
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'blog' and public.is_blog_editor());
