-- Create a table for Workshops
create table workshops (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  date timestamp with time zone not null,
  mentor text,
  fee numeric not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for Registrations
create table registrations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  workshop_id uuid references workshops(id) not null,
  payment_id text,
  payment_status text default 'pending',
  amount_paid numeric,
  registered_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table workshops enable row level security;
alter table registrations enable row level security;

-- Policies for Workshops
-- Everyone can view workshops
create policy "Workshops are viewable by everyone"
  on workshops for select
  using ( true );

-- Only admins/service_role can insert/update/delete (handled by checking specific email or role in real app, keeping simple for now)
-- potentially restricted in future. For now, we'll assume admin operations happen via dashboard with specific RLS or just service_role.

-- Policies for Registrations
-- Users can view their own registrations
create policy "Users can view their own registrations"
  on registrations for select
  using ( auth.uid() = user_id );

-- Users can insert their own registration (usually done via server action which uses service key or authenticated user)
-- If doing client side insert:
create policy "Users can register themselves"
  on registrations for insert
  with check ( auth.uid() = user_id );
