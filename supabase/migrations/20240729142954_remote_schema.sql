create type "public"."recurrence_type" as enum ('day', 'week', 'month', 'year');

create type "public"."status" as enum ('not_done', 'in_progress', 'completed');

alter table "public"."users" drop column "deleteme";

