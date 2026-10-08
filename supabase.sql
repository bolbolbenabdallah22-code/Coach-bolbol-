/* =========================================================
   COACH BOLBOL — SUPABASE DATABASE
   ========================================================= */


/* =========================================================
   EXTENSIONS
   ========================================================= */

create extension if not exists "pgcrypto";


/* =========================================================
   PROFILES
   ========================================================= */

create table if not exists public.profiles (

    id uuid primary key references auth.users(id) on delete cascade,

    full_name text,
    email text,

    age integer,
    gender text,
    height_cm numeric,
    current_weight numeric,
    goal_weight numeric,

    activity_level text default 'moderate',
    fitness_level text default 'beginner',

    role text default 'client'
        check (role in ('client', 'coach')),

    avatar_url text,

    created_at timestamptz default now(),
    updated_at timestamptz default now()

);


/* =========================================================
   WEIGHT CHECK-INS
   ========================================================= */

create table if not exists public.weight_checkins (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references public.profiles(id)
        on delete cascade,

    weight_kg numeric not null,

    body_fat_percent numeric,

    waist_cm numeric,

    notes text,

    recorded_at timestamptz default now()

);


/* =========================================================
   WORKOUT LOGS
   ========================================================= */

create table if not exists public.workout_logs (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references public.profiles(id)
        on delete cascade,

    workout_name text not null,

    program_name text,

    duration_minutes integer,

    total_volume numeric default 0,

    exercises_completed integer default 0,

    calories_burned numeric,

    notes text,

    completed_at timestamptz default now()

);


/* =========================================================
   EXERCISE SET LOGS
   ========================================================= */

create table if not exists public.exercise_sets (

    id uuid primary key default gen_random_uuid(),

    workout_log_id uuid not null
        references public.workout_logs(id)
        on delete cascade,

    exercise_name text not null,

    set_number integer,

    weight_kg numeric,

    reps integer,

    rir numeric,

    volume numeric,

    completed boolean default true,

    created_at timestamptz default now()

);


/* =========================================================
   NUTRITION LOGS
   ========================================================= */

create table if not exists public.nutrition_logs (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references public.profiles(id)
        on delete cascade,

    food_name text not null,

    grams numeric,

    calories numeric default 0,

    protein numeric default 0,

    carbs numeric default 0,

    fat numeric default 0,

    meal_type text,

    consumed_at timestamptz default now()

);


/* =========================================================
   DAILY NUTRITION TARGETS
   ========================================================= */

create table if not exists public.nutrition_targets (

    user_id uuid primary key
        references public.profiles(id)
        on delete cascade,

    calories numeric default 0,

    protein numeric default 0,

    carbs numeric default 0,

    fat numeric default 0,

    water_liters numeric default 2.5,

    updated_at timestamptz default now()

);


/* =========================================================
   WATER LOGS
   ========================================================= */

create table if not exists public.water_logs (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references public.profiles(id)
        on delete cascade,

    amount_ml integer not null,

    recorded_at timestamptz default now()

);


/* =========================================================
   PROGRAMS
   ========================================================= */

create table if not exists public.programs (

    id uuid primary key default gen_random_uuid(),

    name text not null,

    category text not null,

    level text,

    description text,

    duration_weeks integer,

    created_at timestamptz default now()

);


/* =========================================================
   USER PROGRAMS
   ========================================================= */

create table if not exists public.user_programs (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references public.profiles(id)
        on delete cascade,

    program_id uuid not null
        references public.programs(id)
        on delete cascade,

    started_at timestamptz default now(),

    active boolean default true

);


/* =========================================================
   MESSAGES
   ========================================================= */

create table if not exists public.messages (

    id uuid primary key default gen_random_uuid(),

    sender_id uuid not null
        references public.profiles(id)
        on delete cascade,

    receiver_id uuid not null
        references public.profiles(id)
        on delete cascade,

    message text not null,

    read boolean default false,

    created_at timestamptz default now()

);


/* =========================================================
   COACH REPORTS
   ========================================================= */

create table if not exists public.coach_reports (

    id uuid primary key default gen_random_uuid(),

    client_id uuid not null
        references public.profiles(id)
        on delete cascade,

    coach_id uuid not null
        references public.profiles(id)
        on delete cascade,

    report_type text,

    title text,

    content text,

    status text default 'new'
        check (status in ('new', 'reviewed', 'archived')),

    created_at timestamptz default now(),

    reviewed_at timestamptz

);


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

create table if not exists public.notifications (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references public.profiles(id)
        on delete cascade,

    title text not null,

    message text,

    type text default 'general',

    read boolean default false,

    created_at timestamptz default now()

);


/* =========================================================
   INDEXES
   ========================================================= */

create index if not exists idx_weight_user
on public.weight_checkins(user_id, recorded_at desc);


create index if not exists idx_workout_user
on public.workout_logs(user_id, completed_at desc);


create index if not exists idx_nutrition_user
on public.nutrition_logs(user_id, consumed_at desc);


create index if not exists idx_water_user
on public.water_logs(user_id, recorded_at desc);


create index if not exists idx_messages_receiver
on public.messages(receiver_id, created_at desc);


create index if not exists idx_messages_sender
on public.messages(sender_id, created_at desc);


create index if not exists idx_reports_client
on public.coach_reports(client_id, created_at desc);


/* =========================================================
   ROW LEVEL SECURITY
   ========================================================= */

alter table public.profiles enable row level security;
alter table public.weight_checkins enable row level security;
alter table public.workout_logs enable row level security;
alter table public.exercise_sets enable row level security;
alter table public.nutrition_logs enable row level security;
alter table public.nutrition_targets enable row level security;
alter table public.water_logs enable row level security;
alter table public.programs enable row level security;
alter table public.user_programs enable row level security;
alter table public.messages enable row level security;
alter table public.coach_reports enable row level security;
alter table public.notifications enable row level security;


/* =========================================================
   PROFILE POLICIES
   ========================================================= */

create policy "Users can view own profile"
on public.profiles
for select
using (auth.uid() = id);


create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = id);


create policy "Users can insert own profile"
on public.profiles
for insert
with check (auth.uid() = id);


/* =========================================================
   WEIGHT POLICIES
   ========================================================= */

create policy "Users can view own weights"
on public.weight_checkins
for select
using (auth.uid() = user_id);


create policy "Users can insert own weights"
on public.weight_checkins
for insert
with check (auth.uid() = user_id);


create policy "Users can update own weights"
on public.weight_checkins
for update
using (auth.uid() = user_id);


create policy "Users can delete own weights"
on public.weight_checkins
for delete
using (auth.uid() = user_id);


/* =========================================================
   WORKOUT POLICIES
   ========================================================= */

create policy "Users can view own workouts"
on public.workout_logs
for select
using (auth.uid() = user_id);


create policy "Users can insert own workouts"
on public.workout_logs
for insert
with check (auth.uid() = user_id);


create policy "Users can update own workouts"
on public.workout_logs
for update
using (auth.uid() = user_id);


create policy "Users can delete own workouts"
on public.workout_logs
for delete
using (auth.uid() = user_id);


/* =========================================================
   EXERCISE SET POLICIES
   ========================================================= */

create policy "Users can view own sets"
on public.exercise_sets
for select
using (
    exists (
        select 1
        from public.workout_logs
        where workout_logs.id = exercise_sets.workout_log_id
        and workout_logs.user_id = auth.uid()
    )
);


create policy "Users can insert own sets"
on public.exercise_sets
for insert
with check (
    exists (
        select 1
        from public.workout_logs
        where workout_logs.id = exercise_sets.workout_log_id
        and workout_logs.user_id = auth.uid()
    )
);


/* =========================================================
   NUTRITION POLICIES
   ========================================================= */

create policy "Users can view own nutrition"
on public.nutrition_logs
for select
using (auth.uid() = user_id);


create policy "Users can insert own nutrition"
on public.nutrition_logs
for insert
with check (auth.uid() = user_id);


create policy "Users can update own nutrition"
on public.nutrition_logs
for update
using (auth.uid() = user_id);


create policy "Users can delete own nutrition"
on public.nutrition_logs
for delete
using (auth.uid() = user_id);


/* =========================================================
   NUTRITION TARGET POLICIES
   ========================================================= */

create policy "Users can view own nutrition target"
on public.nutrition_targets
for select
using (auth.uid() = user_id);


create policy "Users can insert own nutrition target"
on public.nutrition_targets
for insert
with check (auth.uid() = user_id);


create policy "Users can update own nutrition target"
on public.nutrition_targets
for update
using (auth.uid() = user_id);


/* =========================================================
   WATER POLICIES
   ========================================================= */

create policy "Users can view own water"
on public.water_logs
for select
using (auth.uid() = user_id);


create policy "Users can insert own water"
on public.water_logs
for insert
with check (auth.uid() = user_id);


create policy "Users can delete own water"
on public.water_logs
for delete
using (auth.uid() = user_id);


/* =========================================================
   PROGRAM POLICIES
   ========================================================= */

create policy "Everyone can view programs"
on public.programs
for select
using (true);


/* =========================================================
   USER PROGRAM POLICIES
   ========================================================= */

create policy "Users can view own programs"
on public.user_programs
for select
using (auth.uid() = user_id);


create policy "Users can select own programs"
on public.user_programs
for insert
with check (auth.uid() = user_id);


/* =========================================================
   MESSAGE POLICIES
   ========================================================= */

create policy "Users can view their messages"
on public.messages
for select
using (
    auth.uid() = sender_id
    or
    auth.uid() = receiver_id
);


create policy "Users can send messages"
on public.messages
for insert
with check (auth.uid() = sender_id);


/* =========================================================
   NOTIFICATION POLICIES
   ========================================================= */

create policy "Users can view own notifications"
on public.notifications
for select
using (auth.uid() = user_id);


create policy "Users can update own notifications"
on public.notifications
for update
using (auth.uid() = user_id);


/* =========================================================
   FINISH
   ========================================================= */

-- Coach Bolbol database structure ready.
-- Do NOT add private/service-role keys to this file.
