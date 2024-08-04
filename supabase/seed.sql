-- Clear existing data
TRUNCATE TABLE users, goals, quotes, user_goals RESTART IDENTITY CASCADE;

-- Insert goals
INSERT INTO goals (category, title, description, is_recurrent, recurrence_type, recurrence_value) VALUES
('Emergency_Savings', 'I have at least 50% of one month''s salary saved', 'I have at least 50% of one month''s salary saved', false, NULL, NULL),
('Emergency_Savings', 'I built an emergency fund of 3 to 6 months of expenses', 'I built an emergency fund of 3 to 6 months of expenses', false, NULL, NULL),
('Managing_Expenses', 'I can login online to all my utility providers', 'I can login online to all my utility providers', false, NULL, NULL),
('Managing_Expenses', 'I know the cost of my monthly expenses', 'I know the cost of my monthly expenses', false, NULL, NULL),
('Managing_Expenses', 'I have logged into my personal tax account and confirmed my tax code', 'I have logged into my personal tax account and confirmed my tax code', false, NULL, NULL),
('Managing_Expenses', 'I have a SIM-only mobile phone plan', 'I have a SIM-only mobile phone plan', false, NULL, NULL),
('Managing_Expenses', 'I have negotiated with my utilities providers in the last 18 months', 'I have negotiated with my utilities providers in the last 18 months', false, NULL, NULL),
('Managing_Expenses', 'My expenses are no more than 50-60% of my take home pay', 'My expenses are no more than 50-60% of my take home pay', false, NULL, NULL),
('Managing_Expenses', 'I save in advance for larger purchases with a sinking fund', 'I save in advance for larger purchases with a sinking fund', false, NULL, NULL),
('Managing_Expenses', 'My personal spending comes out of a separate bank account', 'My personal spending comes out of a separate bank account', false, NULL, NULL),
('Investing_in_the_Future', 'I have a list of any debts I have outstanding', 'I have a list of any debts I have outstanding', false, NULL, NULL),
('Investing_in_the_Future', 'I don''t use a credit card', 'I don''t use a credit card', false, NULL, NULL),
('Investing_in_the_Future', 'I can login online to my pension accounts', 'I can login online to my pension accounts', false, NULL, NULL),
('Investing_in_the_Future', 'I know what my employer''s pension offers and confirmed the halal options', 'I know what my employer''s pension offers and confirmed the halal options', false, NULL, NULL),
('Investing_in_the_Future', 'I have checked and confirmed the information on my credit report', 'I have checked and confirmed the information on my credit report', false, NULL, NULL),
('Investing_in_the_Future', 'I know which platform to use to open an investment account that offers halal options', 'I know which platform to use to open an investment account that offers halal options', false, NULL, NULL),
('Investing_in_the_Future', 'I am being tax efficient', 'I am being tax efficient', false, NULL, NULL),
('Investing_in_the_Future', 'I have a plan to pay down my debt including contributing at least 20% of my take-home pay to it', 'I have a plan to pay down my debt including contributing at least 20% of my take-home pay to it', false, NULL, NULL),
('Investing_in_the_Future', 'I am investing 20% of my take-home pay in halal assets', 'I am investing 20% of my take-home pay in halal assets', false, NULL, NULL),
('Giving_Back', 'I purify any interest I receive in my bank accounts', 'I purify any interest I receive in my bank accounts', false, NULL, NULL),
('Giving_Back', 'I give back in person', 'I give back in person', false, NULL, NULL),
('Giving_Back', 'I know how to calculate and pay my zakat', 'I know how to calculate and pay my zakat', false, NULL, NULL),
('Giving_Back', 'I make a regular donation from my payslip', 'I make a regular donation from my payslip', false, NULL, NULL);

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