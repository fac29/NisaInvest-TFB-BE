-- Clear existing data
TRUNCATE TABLE users, goals, quotes, user_goals RESTART IDENTITY CASCADE;

-- Insert goals with sort_order
INSERT INTO goals (category, title, description, is_recurrent, recurrence_type, recurrence_value, sort_order) VALUES
('savings', 'I have at least 50% of one month''s salary saved', 'I have at least 50% of one month''s salary saved', false, NULL, NULL, 1),
('savings', 'I built an emergency fund of 3 to 6 months of expenses', 'I built an emergency fund of 3 to 6 months of expenses', false, NULL, NULL, 2),
('expenses', 'I can login online to all my utility providers', 'I can login online to all my utility providers', false, NULL, NULL, 1),
('expenses', 'I know the cost of my monthly expenses', 'I know the cost of my monthly expenses', false, NULL, NULL, 2),
('expenses', 'I have logged into my personal tax account and confirmed my tax code', 'I have logged into my personal tax account and confirmed my tax code', false, NULL, NULL, 3),
('expenses', 'I have a SIM-only mobile phone plan', 'I have a SIM-only mobile phone plan', false, NULL, NULL, 4),
('expenses', 'I have negotiated with my utilities providers in the last 18 months', 'I have negotiated with my utilities providers in the last 18 months', false, NULL, NULL, 5),
('expenses', 'My expenses are no more than 50-60% of my take home pay', 'My expenses are no more than 50-60% of my take home pay', false, NULL, NULL, 6),
('expenses', 'I save in advance for larger purchases with a sinking fund', 'I save in advance for larger purchases with a sinking fund', false, NULL, NULL, 7),
('expenses', 'My personal spending comes out of a separate bank account', 'My personal spending comes out of a separate bank account', false, NULL, NULL, 8),
('investing', 'I have a list of any debts I have outstanding', 'I have a list of any debts I have outstanding', false, NULL, NULL, 1),
('investing', 'I don''t use a credit card', 'I don''t use a credit card', false, NULL, NULL, 2),
('investing', 'I can login online to my pension accounts', 'I can login online to my pension accounts', false, NULL, NULL, 3),
('investing', 'I know what my employer''s pension offers and confirmed the halal options', 'I know what my employer''s pension offers and confirmed the halal options', false, NULL, NULL, 4),
('investing', 'I have checked and confirmed the information on my credit report', 'I have checked and confirmed the information on my credit report', false, NULL, NULL, 5),
('investing', 'I know which platform to use to open an investment account that offers halal options', 'I know which platform to use to open an investment account that offers halal options', false, NULL, NULL, 6),
('investing', 'I am being tax efficient', 'I am being tax efficient', false, NULL, NULL, 7),
('investing', 'I have a plan to pay down my debt including contributing at least 20% of my take-home pay to it', 'I have a plan to pay down my debt including contributing at least 20% of my take-home pay to it', false, NULL, NULL, 8),
('investing', 'I am investing 20% of my take-home pay in halal assets', 'I am investing 20% of my take-home pay in halal assets', false, NULL, NULL, 9),
('charity', 'I purify any interest I receive in my bank accounts', 'I purify any interest I receive in my bank accounts', false, NULL, NULL, 1),
('charity', 'I give back in person', 'I give back in person', false, NULL, NULL, 2),
('charity', 'I know how to calculate and pay my zakat', 'I know how to calculate and pay my zakat', false, NULL, NULL, 3),
('charity', 'I make a regular donation from my payslip', 'I make a regular donation from my payslip', false, NULL, NULL, 4);

-- Insert quotes
INSERT INTO quotes (text, author, valid_from, valid_to) VALUES
('Strive for that which will benefit you, seek the help of Allah, and do not feel helpless.', 'Hadith Muslim', NULL, NULL),
('The Messenger of Allah (PBUH) said: Whoever among you wakes up physically healthy, feeling safe and secure within himself, with food for the day, it is as if he acquired the whole world.', 'Salamah bin ''Ubaidullah bin Mihsan Al-Ansari', NULL, NULL),
('The Prophet (PBUH) said, "So his wealth is whatever he spends (in Allah''s Cause) during his life (on good deeds) while the wealth of his heirs is whatever he leaves after his death.', 'Al-Bukhari', NULL, NULL),
('Truly, for every nation there is a trial, and the trial for my nation is wealth', 'Prophet Muhammad (PBUH)', NULL, NULL),
('If the son of Adam had a valley full of gold, he would like to have two valleys.', 'Prophet Muhammad (PBUH)', NULL, NULL),
('Believe in Allah and His Messenger and spend out of that of which He has made you trustees. For those who have believed among you and spent, there will be a great reward.', 'Qur''an 57:7', NULL, NULL),
('And [they are] those who, when they spend, do so not excessively or sparingly but are ever, between that, justly moderate.', 'Qur''an 25:67', NULL, NULL),
('Eat, drink, give in charity, and wear nice clothing, but without pride and extravagance. Verily, Allah loves for His blessings to be seen upon His servants.', 'Prophet Muhammad (PBUH)', NULL, NULL),
('The example of those who spend their wealth in the way of Allah is like a seed [of grain] which grows seven spikes; in each spike is a hundred grains. And Allah multiplies [His reward] for whom He wills.', 'Qur''an 2:261', NULL, NULL),
('Compare [yourself] to those who are lower than you [in wealth] and do not look at those who are above you [in wealth], for it is more suitable that you do not discount the blessings of Allah.', 'Prophet Muhammad (PBUH)', NULL, NULL),
('Charity does not decrease wealth, no one forgives another person but Allah increases their honor, and no one humbles himself for the sake of Allah but that Allah raises their status.', 'Prophet Muhammad (PBUH)', NULL, NULL),
('And if you should count the favors of Allah, you could not enumerate them.', 'Qur''an 17:100', NULL, NULL),
('Tie your camel first, and then put your trust in Allah.', 'Prophet Muhammad (PBUH)', NULL, NULL),
('Richness does not lie in the abundance of (worldly) goods but richness is the richness of the soul (heart, self).', 'Prophet Muhammad (PBUH)', NULL, NULL),
('Wealth is not in having many possessions, but rather (true) wealth is feeling sufficiency in the soul.', 'Prophet Muhammad (PBUH)', NULL, NULL);

-- Insert users
INSERT INTO users (created_at, email, first_name, last_name, password) VALUES
('2024-01-01 10:00:00+00', 'emma.johnson@email.com', 'Emma', 'Johnson Nore', 'hashed_password_1'),
('2024-01-02 11:30:00+00', 'liam.smith@email.com', 'Liam', 'Smith', 'hashed_password_2'),
('2024-01-03 09:15:00+00', 'sophia.brown@email.com', 'Sophia', 'Brown', 'hashed_password_3'),
('2024-01-04 14:45:00+00', 'noah.taylor@email.com', 'Noah', 'Taylor', 'hashed_password_4'),
('2024-01-05 16:20:00+00', 'olivia.davis@email.com', 'Olivia', 'Davis', 'hashed_password_5');

-- Insert user_goals
INSERT INTO user_goals (user_id, goal_id, assigned_at, due_date, status, completed_at) VALUES
(1, 1, '2023-07-01T10:00:00Z', '2023-12-31T23:59:59Z', 'in_progress', NULL),
(1, 2, '2023-07-02T11:30:00Z', '2023-11-30T23:59:59Z', 'completed', '2023-10-15T14:45:00Z'),
(1, 3, '2023-07-03T09:15:00Z', '2024-01-31T23:59:59Z', 'not_done', NULL),
(1, 4, '2023-07-04T14:00:00Z', '2023-12-15T23:59:59Z', 'in_progress', NULL),
(1, 5, '2023-07-05T16:45:00Z', '2024-02-29T23:59:59Z', 'not_done', NULL),
(2, 1, '2023-07-06T08:30:00Z', '2023-10-31T23:59:59Z', 'completed', '2023-09-30T18:20:00Z'),
(2, 2, '2023-07-07T13:00:00Z', '2024-03-31T23:59:59Z', 'in_progress', NULL),
(2, 3, '2023-07-08T11:45:00Z', '2023-12-31T23:59:59Z', 'not_done', NULL),
(2, 4, '2023-07-09T10:30:00Z', '2024-01-15T23:59:59Z', 'in_progress', NULL),
(3, 1, '2023-07-10T15:15:00Z', '2023-11-30T23:59:59Z', 'completed', '2023-11-15T09:30:00Z'),
(3, 2, '2023-07-11T09:45:00Z', '2024-02-28T23:59:59Z', 'in_progress', NULL),
(3, 3, '2023-07-12T14:30:00Z', '2023-12-31T23:59:59Z', 'not_done', NULL),
(4, 1, '2023-07-13T11:00:00Z', '2023-10-31T23:59:59Z', 'completed', '2023-10-20T16:45:00Z'),
(4, 2, '2023-07-14T16:30:00Z', '2024-01-31T23:59:59Z', 'in_progress', NULL),
(5, 1, '2023-07-15T10:45:00Z', '2023-12-15T23:59:59Z', 'not_done', NULL);

-- Insert questions
INSERT INTO questions (id, question, created_at) VALUES
(1, 'Which areas of your personal finances were you planning to focus on?', '2024-07-31 10:57:12.586849+00'),
(2, 'In the last two years which of these life events have you experienced?', '2024-07-31 10:57:34.65335+00'),
(3, 'Which topics below you would like more information on?', '2024-07-31 10:57:53.108628+00'),
(4, 'Is there any question you have and would like to ask?', '2024-07-31 10:58:06.319872+00');


--Instert Answers
INSERT INTO answers (id, answer_text, question_id, goal_id, created_at) VALUES
(1, 'Emergency Savings', 1, 2, '2024-07-31 11:02:32.428066+00'),
(2, 'Managing Expenses', 1, 4, '2024-07-31 11:03:14.550314+00'),
(3, 'Investing for the Future', 1, 16, '2024-07-31 11:04:54.834584+00'),
(4, 'Giving Back', 1, 22, '2024-07-31 11:05:36.106429+00'),
(5, 'Student or graduate', 2, 1, '2024-07-31 11:06:25.780938+00'),
(6, 'Moved home', 2, 4, '2024-07-31 11:07:00.694809+00'),
(7, 'Changed jobs or role', 2, 14, '2024-07-31 11:07:34.794972+00'),
(8, 'Been on sabbatical', 2, 1, '2024-07-31 11:07:56.631059+00'),
(9, 'Taken maternity leave', 2, 16, '2024-07-31 11:08:33.577078+00'),
(10, 'None applicable', 2, 1, '2024-07-31 11:08:54.462665+00'),
(11, 'Taxes', 3, 5, '2024-07-31 11:09:23.526468+00'),
(12, 'Household bills', 3, 3, '2024-07-31 11:09:57.679285+00'),
(13, 'Pensions and employee benefits', 3, 14, '2024-07-31 11:10:21.463339+00'),
(14, 'Halal investing', 3, 16, '2024-07-31 11:10:46.983309+00'),
(15, 'Student loans', 3, 11, '2024-07-31 11:11:24.339196+00');
