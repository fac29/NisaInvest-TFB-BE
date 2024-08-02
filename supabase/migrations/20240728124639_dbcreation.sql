-- Migration: Initial Schema
-- Description: Creates tables for users, goals, quotes, and user_goals

CREATE TABLE IF NOT EXISTS
  public.goals (
    created_at timestamp with time zone not null default now(),
    title text not null,
    description text null,
    is_recurrent boolean not null default false,
    recurrence_type text null,
    recurrence_value bigint null,
    id bigserial,
    category text null,
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
    )
  ) tablespace pg_default;

CREATE TABLE IF NOT EXISTS
  public.quotes (
    id bigserial,
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
  public.user_goals (
    id bigserial,
    user_id bigint null,
    goal_id bigint null,
    assigned_at timestamp with time zone not null default now(),
    due_date timestamp with time zone null,
    status text null,
    completed_at timestamp with time zone null,
    constraint user_goals_pkey primary key (id),
    constraint user_goals_user_id_goal_id_key unique (user_id, goal_id),
    constraint user_goals_goal_id_fkey foreign key (goal_id) references goals (id),
    constraint user_goals_user_id_fkey foreign key (user_id) references users (id),
    constraint status_check check (
      (
        status = any (
          array[
            'not_done'::text,
            'in_progress'::text,
            'completed'::text
          ]
        )
      )
    )
  ) tablespace pg_default;

CREATE TABLE IF NOT EXISTS
  public.users (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    email text not null default ''::text,
    name text not null,
    password text null,
    constraint users_pkey primary key (id),
    constraint users_email_key unique (email)
  ) tablespace pg_default;


create index if not exists idx_quotes_date_range on public.quotes using btree (valid_from, valid_to) tablespace pg_default;
create index if not exists idx_user_goals_user_id on public.user_goals using btree (user_id) tablespace pg_default;
create index if not exists idx_user_goals_goal_id on public.user_goals using btree (goal_id) tablespace pg_default;