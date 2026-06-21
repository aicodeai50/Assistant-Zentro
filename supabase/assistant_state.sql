create table if not exists public.assistant_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  memory jsonb not null default '[]'::jsonb,
  tasks jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.assistant_state enable row level security;

drop policy if exists "Users can view own assistant state" on public.assistant_state;
create policy "Users can view own assistant state"
on public.assistant_state
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own assistant state" on public.assistant_state;
create policy "Users can insert own assistant state"
on public.assistant_state
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own assistant state" on public.assistant_state;
create policy "Users can update own assistant state"
on public.assistant_state
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
