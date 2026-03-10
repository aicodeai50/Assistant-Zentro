alter table public.profiles
  add column if not exists language text default 'en',
  add column if not exists plan text default 'trial',
  add column if not exists trial_started_at timestamptz default now(),
  add column if not exists trial_ends_at timestamptz default (now() + interval '7 days'),
  add column if not exists updated_at timestamptz default now();

create table if not exists public.daily_ai_usage (
  user_id uuid not null references auth.users(id) on delete cascade,
  usage_date date not null default current_date,
  usage_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, usage_date)
);

create table if not exists public.guest_ai_usage (
  client_key text primary key,
  usage_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.daily_ai_usage enable row level security;
alter table public.guest_ai_usage enable row level security;

drop policy if exists "Users can view own daily usage" on public.daily_ai_usage;
create policy "Users can view own daily usage"
on public.daily_ai_usage
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own daily usage" on public.daily_ai_usage;
create policy "Users can insert own daily usage"
on public.daily_ai_usage
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own daily usage" on public.daily_ai_usage;
create policy "Users can update own daily usage"
on public.daily_ai_usage
for update
to authenticated
using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, full_name, language, plan, trial_started_at, trial_ends_at)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'en',
    'trial',
    now(),
    now() + interval '7 days'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
