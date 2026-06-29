-- PayPal billing subscriptions for Zentro Assistant
-- Run in Supabase SQL editor after profiles table exists.

create table if not exists public.billing_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null default 'paypal',
  provider_subscription_id text not null unique,
  plan text not null default 'trial',
  status text not null default 'created',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists billing_subscriptions_user_id_idx
  on public.billing_subscriptions (user_id);

alter table public.billing_subscriptions enable row level security;

drop policy if exists "Users can view own billing subscription" on public.billing_subscriptions;
create policy "Users can view own billing subscription"
on public.billing_subscriptions
for select
to authenticated
using (auth.uid() = user_id);

-- Service role (webhooks) updates via admin client; no public insert/update policies.
