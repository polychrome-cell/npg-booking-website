-- Run once in the Supabase SQL Editor for project mfpbqdzfzqkqlvgzqrii.
-- Enables verified Sora accounts to read only their own Infinite decision.

do $$
begin
  create type public.sora_infinite_application_status as enum ('Pending', 'Approved', 'Declined');
exception
  when duplicate_object then null;
end;
$$;

alter table public.sora_infinite_interest_signups
  add column if not exists application_status public.sora_infinite_application_status not null default 'Pending',
  add column if not exists reviewed_at timestamptz,
  add column if not exists review_notes text;

alter table public.sora_infinite_interest_signups enable row level security;

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

-- Applications now come from a verified account and must use its own email.
drop policy if exists "Public can submit Sora Infinite interest" on public.sora_infinite_interest_signups;
drop policy if exists "Verified users can submit their own Sora Infinite interest" on public.sora_infinite_interest_signups;
revoke all on table public.sora_infinite_interest_signups from anon, authenticated;
grant insert (full_name, contact_email, member_status_reported, lifetime_points_reported, consent_given)
  on table public.sora_infinite_interest_signups to authenticated;

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

create policy "Verified users can submit their own Sora Infinite interest"
  on public.sora_infinite_interest_signups
  for insert
  to authenticated
  with check (
    consent_given is true
    and lower(contact_email) = lower((select auth.jwt() ->> 'email'))
    and public.is_verified_sora_account_email(contact_email)
);

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
