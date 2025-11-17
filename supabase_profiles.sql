
create table if not exists public.profiles (
  id text primary key,
  email text,
  full_name text,
  avatar_url text,
  inserted_at timestamptz default now()
);
