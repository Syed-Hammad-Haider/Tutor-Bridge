-- ---------------------------------------------------------------------------
-- TutorBridge database schema
-- Run this once in your Supabase project's SQL Editor (Project → SQL Editor
-- → New query → paste this whole file → Run).
-- ---------------------------------------------------------------------------

-- Requests submitted via the "Find a Tutor" form
create table if not exists tutor_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new', -- 'new' | 'contacted' | 'closed'
  name text not null,
  whatsapp text not null,
  level text not null,
  subject text not null,
  board text,
  city text not null,
  format text,
  gender_preference text,
  budget text,
  availability text,
  notes text
);

-- Applications submitted via the "Become a Tutor" form
create table if not exists tutor_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new', -- 'new' | 'contacted' | 'closed'
  name text not null,
  whatsapp text not null,
  city text not null,
  area text,
  subjects text not null,
  levels text not null,
  experience text,
  mode text,
  availability text,
  notes text
);

-- Helpful indexes for the admin dashboard (sorting by newest, filtering by status)
create index if not exists tutor_requests_created_at_idx on tutor_requests (created_at desc);
create index if not exists tutor_applications_created_at_idx on tutor_applications (created_at desc);

-- Row Level Security: locked down by default. The website never talks to
-- Supabase from the browser — all reads/writes go through Next.js API routes
-- using the service role key, which bypasses RLS. This keeps submitted data
-- (names, phone numbers, addresses) inaccessible to anyone poking at the
-- browser's network requests or JS bundle.
alter table tutor_requests enable row level security;
alter table tutor_applications enable row level security;
-- Intentionally no policies are created, so all client-side (anon key) access
-- is denied. Only the service role key (used server-side only) can read/write.
