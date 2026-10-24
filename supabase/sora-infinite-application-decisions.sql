-- Run once in Supabase SQL Editor to add review decisions to an existing signup table.
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

create or replace function public.set_sora_infinite_reviewed_at()
returns trigger
language plpgsql
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
