-- Required when "Automatically expose new tables" is disabled at project creation.
-- service_role is the only role our server-side API uses (via secret key).
grant select, insert, update, delete on table public.waitlist to service_role;
