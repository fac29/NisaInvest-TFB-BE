-- Migration: Initial Schema
-- Description: Creates tables for users, goals, quotes, and user_goals

CREATE TABLE IF NOT EXISTS
  public.goals (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    title text not null,
    sort_order integer,
    description text null,
    is_recurrent boolean not null default false,
    recurrence_type text null,
    recurrence_value bigint null,
    category text null,
    sort_order integer null,
    constraint goals_pkey primary key (id),
    constraint recurrence_type_check check (
      (
        recurrence_type = any (
          array[
            'day'::text,
            'week'::text,
            'month'::text,
            'year'::text
          ]
        )
      )
    ),
    constraint category_type_check check (
      (
        recurrence_type = any (
          array[
            'savings'::text,
            'expenses'::text,
            'investing'::text,
            'charity'::text
          ]
        )
      )
    )
  ) tablespace pg_default;

CREATE TABLE IF NOT EXISTS
  public.quotes (
    id bigint generated by default as identity,
    text text not null,
    author text null,
    valid_from date null,
    valid_to date null,
    created_at timestamp with time zone null default current_timestamp,
    constraint quotes_pkey primary key (id),
    constraint date_range_check check (
      (
        (valid_to is null)
        or (valid_from is null)
        or (valid_to >= valid_from)
      )
    )
  ) tablespace pg_default;

CREATE TABLE IF NOT EXISTS
  public.users (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    email text not null default ''::text,
    first_name text not null,
    last_name text,
    password text null,
    constraint users_pkey primary key (id),
    constraint users_email_key unique (email)
  ) tablespace pg_default;

CREATE TABLE IF NOT EXISTS
  public.user_goals (
    id bigint generated by default as identity,
    user_id bigint null,
    goal_id bigint null,
    assigned_at timestamp with time zone not null default now(),
    due_date timestamp with time zone null,
    status text null default 'not_done',
    focus_origin text null default null,
    -- quiz_selected boolean null default false,
    completed_at timestamp with time zone null,
    quiz_selected boolean default false,
    constraint user_goals_pkey primary key (id),
    constraint user_goals_user_id_goal_id_key unique (user_id, goal_id),
    constraint user_goals_goal_id_fkey foreign key (goal_id) references goals (id),
    constraint user_goals_user_id_fkey foreign key (user_id) references users (id),
    constraint status_check check (
      (
        status = any (
          array[
            'completed'::text,
            'focused'::text,
            'not_done'::text
          ]
        )
      )
    )
  ) tablespace pg_default;

CREATE TABLE IF NOT EXISTS
  public.questions (
    id bigint generated by default as identity,
    question text not null,
    created_at timestamp with time zone null default current_timestamp,
    constraint questions_pkey primary key (id)
  ) tablespace pg_default;

CREATE TABLE IF NOT EXISTS public.answers (
    id bigint generated by default as identity,
    answer_text text not null,
    question_id bigint references public.questions(id),
    goal_id bigint references public.goals(id),
    created_at timestamp with time zone null default  CURRENT_TIMESTAMP,
    CONSTRAINT answers_pkey primary key (id)
) TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS
  public.contact_nisa (
    id bigint generated by default as identity,
    first_name text null,
    last_name text null,
    email  text not null default ''::text,
    social_media text null,
    text_field text null,
    created_at timestamp with time zone null default current_timestamp,
    constraint consact_nisa_pkey primary key (id)
  ) tablespace pg_default;

CREATE TABLE IF NOT EXISTS
  public.reports (
    id bigint generated by default as identity,
    user_id bigint null,
    title text not null,
    created_at timestamp with time zone not null default now(),
    text text not null,
    priority text not null,
    constraint reports_pkey primary key (id),
    constraint reports_user_id_fkey foreign key (user_id) references users (id),
    constraint priority_check check (
      priority = any (array['low'::text, 'medium'::text, 'high'::text])
    )
  ) tablespace pg_default;

create index if not exists idx_quotes_date_range on public.quotes using btree (valid_from, valid_to) tablespace pg_default;
create index if not exists idx_user_goals_user_id on public.user_goals using btree (user_id) tablespace pg_default;
create index if not exists idx_user_goals_goal_id on public.user_goals using btree (goal_id) tablespace pg_default;
create index if not exists idx_answers_goal_id on public.user_goals using btree (goal_id) tablespace pg_default;
CREATE index IF NOT EXISTS idx_reports_user_id ON public.reports USING btree (user_id) tablespace pg_default;
