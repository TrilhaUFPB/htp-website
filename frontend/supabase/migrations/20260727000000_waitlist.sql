create table waitlist (
  id                uuid primary key default gen_random_uuid(),
  email             text        not null unique,
  created_at        timestamptz not null default now(),
  source            text,
  consent_at        timestamptz not null,
  consent_version   text        not null,
  unsubscribed_at   timestamptz,
  bounced_at        timestamptz,
  suppressed_reason text,
  user_agent        text
);

create index waitlist_created_at_idx on waitlist (created_at desc);

alter table waitlist enable row level security;

-- Explicit grant for server-side access (required if "Automatically expose new tables" is off).
grant select, insert, update, delete on table public.waitlist to service_role;
