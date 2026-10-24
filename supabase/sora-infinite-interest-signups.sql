-- Run this once in Supabase SQL Editor for project mfpbqdzfzqkqlvgzqrii.
do $$
begin
  create type public.sora_infinite_application_status as enum ('Pending', 'Approved', 'Declined');
exception
  when duplicate_object then null;
end;
$$;

create table if not exists public.sora_infinite_interest_signups (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(btrim(full_name)) between 1 and 80),
  contact_email text not null check (
    char_length(contact_email) between 6 and 254
    and contact_email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  ),
  member_status_reported text not null check (member_status_reported in ('Gold', 'Platinum')),
  lifetime_points_reported bigint not null default 0 check (lifetime_points_reported >= 0),
  consent_given boolean not null check (consent_given is true),
  consented_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  application_status public.sora_infinite_application_status not null default 'Pending',
  reviewed_at timestamptz,
  review_notes text
);

-- Add review fields to an existing signup table too.
alter table public.sora_infinite_interest_signups
  add column if not exists application_status public.sora_infinite_application_status not null default 'Pending',
  add column if not exists reviewed_at timestamptz,
  add column if not exists review_notes text;

create unique index if not exists sora_infinite_interest_signups_email_unique
  on public.sora_infinite_interest_signups (lower(contact_email));

alter table public.sora_infinite_interest_signups enable row level security;

revoke all on table public.sora_infinite_interest_signups from anon, authenticated;
drop policy if exists "Public can submit Sora Infinite interest" on public.sora_infinite_interest_signups;
drop policy if exists "Verified users can submit their own Sora Infinite interest" on public.sora_infinite_interest_signups;

create or replace function public.is_verified_sora_account_email(candidate_email text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
      from auth.users as u
      where u.id = (select auth.uid())
        and u.email_confirmed_at is not null
        and lower(u.email) = lower(candidate_email)
  );
$$;

revoke all on function public.is_verified_sora_account_email(text) from public, anon, authenticated;
grant execute on function public.is_verified_sora_account_email(text) to authenticated;

grant insert (full_name, contact_email, member_status_reported, lifetime_points_reported, consent_given)
  on table public.sora_infinite_interest_signups to authenticated;
create policy "Verified users can submit their own Sora Infinite interest"
  on public.sora_infinite_interest_signups
  for insert
  to authenticated
  with check (
    consent_given is true
    and lower(contact_email) = lower((select auth.jwt() ->> 'email'))
    and public.is_verified_sora_account_email(contact_email)
  );

create or replace function public.set_sora_infinite_reviewed_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.application_status is distinct from old.application_status then
    if new.application_status = 'Pending' then
      new.reviewed_at := null;
    else
      new.reviewed_at := now();
    end if;
  end if;
  return new;
end;
$$;

revoke all on function public.set_sora_infinite_reviewed_at() from public, anon, authenticated;
drop trigger if exists sora_infinite_application_reviewed_at on public.sora_infinite_interest_signups;
create trigger sora_infinite_application_reviewed_at
  before update of application_status on public.sora_infinite_interest_signups
  for each row execute function public.set_sora_infinite_reviewed_at();

comment on column public.sora_infinite_interest_signups.application_status is
  'NPG review decision. Change to Approved or Declined in the Supabase Table Editor.';
comment on column public.sora_infinite_interest_signups.reviewed_at is
  'Automatically set when a reviewer changes the application status away from Pending.';
comment on column public.sora_infinite_interest_signups.review_notes is
  'Private reviewer notes; never exposed through the public website.';

create or replace function public.get_my_sora_infinite_status()
returns text
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  verified_email text;
  decision text;
begin
  select lower(u.email)
    into verified_email
    from auth.users as u
    where u.id = (select auth.uid())
      and u.email_confirmed_at is not null;

  if verified_email is null then
    raise exception 'A verified Sora account is required.' using errcode = '42501';
  end if;

  select s.application_status::text
    into decision
    from public.sora_infinite_interest_signups as s
    where lower(s.contact_email) = verified_email
    order by s.created_at desc
    limit 1;

  return coalesce(decision, 'NotApplied');
end;
$$;

revoke all on function public.get_my_sora_infinite_status() from public, anon, authenticated;
grant execute on function public.get_my_sora_infinite_status() to authenticated;
