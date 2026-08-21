-- 錯題本：每位使用者、每個模式、每個單字只保留一筆累積紀錄。
create table if not exists public.wrong_words (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  word text not null,
  chinese text,
  app_mode text not null check (app_mode in ('toddler', 'advanced')),
  source text,
  wrong_count integer not null default 1 check (wrong_count >= 0),
  correct_count integer not null default 0 check (correct_count >= 0),
  mastered boolean not null default false,
  last_wrong_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (user_id, word, app_mode)
);

alter table public.wrong_words enable row level security;

create policy "Users can read their own wrong words"
on public.wrong_words for select
using (auth.uid() = user_id);

create policy "Users can insert their own wrong words"
on public.wrong_words for insert
with check (auth.uid() = user_id);

create policy "Users can update their own wrong words"
on public.wrong_words for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own wrong words"
on public.wrong_words for delete
using (auth.uid() = user_id);

create index if not exists wrong_words_user_mode_mastered_idx
on public.wrong_words (user_id, app_mode, mastered, wrong_count desc, last_wrong_at desc);
