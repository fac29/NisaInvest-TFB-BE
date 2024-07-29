-- Create Users Table
CREATE TABLE public.users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Goals Table
CREATE TABLE public.goals (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create User_Goals Table
CREATE TABLE public.user_goals (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.users(id),
  goal_id BIGINT REFERENCES public.goals(id),
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT user_goals_user_id_goal_id_key UNIQUE (user_id, goal_id)
);