-- Extend modules metadata and educational structure

alter table public.modules add column if not exists description_en text;
alter table public.modules add column if not exists description_pcm text;
alter table public.modules add column if not exists estimated_duration integer default 10;
alter table public.modules add column if not exists is_active boolean default true;
alter table public.modules add column if not exists image_url text;

-- Learning Objectives (arrays of text)
alter table public.modules add column if not exists learning_objectives_en jsonb;
alter table public.modules add column if not exists learning_objectives_pcm jsonb;

-- Key Takeaways (arrays of text)
alter table public.modules add column if not exists key_takeaways_en jsonb;
alter table public.modules add column if not exists key_takeaways_pcm jsonb;

-- Scenario Objects (jsonb with specific structure: situation, warning_signs, risky_action, safe_action, explanation)
alter table public.modules add column if not exists scenario_en jsonb;
alter table public.modules add column if not exists scenario_pcm jsonb;
