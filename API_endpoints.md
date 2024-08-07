# API Endpoints Documentation

## Contact Nisa

### Get all contacts
GET https://nisa-invest-tfb-be.vercel.app/contactnisa/all

### Create contact request
POST https://nisa-invest-tfb-be.vercel.app/contactnisa
Content-Type: application/json

{
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "social_media": "@johndoe",
  "text_field": "Contact request"
}

## Goals

### Get all goals for a user
GET https://nisa-invest-tfb-be.vercel.app/goals/user/2

### Get goal by ID
GET https://nisa-invest-tfb-be.vercel.app/goals/4

### Create goal
POST https://nisa-invest-tfb-be.vercel.app/goals
Content-Type: application/json

{
  "user_id": 1,
  "title": "New Goal",
  "description": "Description",
  "status": "not_done",
  "due_date": "2024-12-31T23:59:59Z"
}

### Update goal
PUT https://nisa-invest-tfb-be.vercel.app/goals/1
Content-Type: application/json

{
  "title": "Updated Goal Title",
  "description": "Updated description",
  "is_recurrent": true,
  "recurrence_type": "week",
  "recurrence_value": 1,
  "category": "fitness"
}

### Update user-specific goal
PUT https://nisa-invest-tfb-be.vercel.app/goals/user-goal/2/1
Content-Type: application/json

{
  "status": "not_done",
  "due_date": "2023-12-31T23:59:59Z"
}

### Delete goal
DELETE https://nisa-invest-tfb-be.vercel.app/goals/21

### Set goals as quiz selected
POST https://nisa-invest-tfb-be.vercel.app/goals/update-quiz-selected
Content-Type: application/json

{
  "userId": 5,
  "goalIds": [1, 2, 3]
}

### Get categorized user goals
GET https://nisa-invest-tfb-be.vercel.app/goals/user-quiz-goals/1

## Quiz

### Get all questions
GET https://nisa-invest-tfb-be.vercel.app/quiz/questions

### Get questions with answers
GET https://nisa-invest-tfb-be.vercel.app/quiz/questions-with-answers

### Get goals for answers
POST https://nisa-invest-tfb-be.vercel.app/quiz/goals-for-answers
Content-Type: application/json

{
  "answerIds": [1, 2, 3]
}

### Get question by ID
GET https://nisa-invest-tfb-be.vercel.app/quiz/questions/1

### Create question
POST https://nisa-invest-tfb-be.vercel.app/quiz/questions
Content-Type: application/json

{
  "question": "What is your financial goal?"
}

### Edit question
PUT https://nisa-invest-tfb-be.vercel.app/quiz/questions/1
Content-Type: application/json

{
  "question": "What is your main financial goal for this year?"
}

### Delete question
DELETE https://nisa-invest-tfb-be.vercel.app/quiz/questions/1

### Get all answers
GET https://nisa-invest-tfb-be.vercel.app/quiz/answers

### Get answer by ID
GET https://nisa-invest-tfb-be.vercel.app/quiz/answers/1

### Create answer
POST https://nisa-invest-tfb-be.vercel.app/quiz/answers
Content-Type: application/json

{
  "answer_text": "Save for retirement",
  "question_id": 1,
  "goal_id": 1
}

### Edit answer
PUT https://nisa-invest-tfb-be.vercel.app/quiz/answers/1
Content-Type: application/json

{
  "answer_text": "Save for a house down payment",
  "question_id": 1,
  "goal_id": 2
}

### Delete answer
DELETE https://nisa-invest-tfb-be.vercel.app/quiz/answers/1

## Quotes

### Get all quotes
GET https://nisa-invest-tfb-be.vercel.app/quotes

### Get quote by ID
GET https://nisa-invest-tfb-be.vercel.app/quotes/10

### Create quote
POST https://nisa-invest-tfb-be.vercel.app/quotes
Content-Type: application/json

{
  "text": "Invest in yourself.",
  "author": "Warren Buffett",
  "valid_from": "2023-01-01",
  "valid_to": "2023-12-31"
}

### Update quote
PUT https://nisa-invest-tfb-be.vercel.app/quotes/1
Content-Type: application/json

{
  "text": "The best investment you can make is in yourself.",
  "author": "Warren Buffett"
}

### Delete quote
DELETE https://nisa-invest-tfb-be.vercel.app/quotes/1

### Get random quotes
GET https://nisa-invest-tfb-be.vercel.app/quotes/random?date=2024-04-1&count=3

## Reports

### Get all reports
GET https://nisa-invest-tfb-be.vercel.app/reports/all

### Get reports for a user
GET https://nisa-invest-tfb-be.vercel.app/reports/user/1

### Create report
POST https://nisa-invest-tfb-be.vercel.app/reports
Content-Type: application/json

{
  "user_id": 1,
  "title": "Monthly Financial Report",
  "text": "Details of monthly finances...",
  "priority": "medium"
}

### Update report
PUT https://nisa-invest-tfb-be.vercel.app/reports/1
Content-Type: application/json

{
  "title": "Updated Monthly Financial Report",
  "text": "Updated details of monthly finances...",
  "priority": "high"
}

### Delete report
DELETE https://nisa-invest-tfb-be.vercel.app/reports/1

## Users

### Get all users
GET https://nisa-invest-tfb-be.vercel.app/users/all

### Get user by email
GET https://nisa-invest-tfb-be.vercel.app/users/email/emma.johnson@email.com

### Create user
POST https://nisa-invest-tfb-be.vercel.app/users
Content-Type: application/json

{
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "password": "securepassword123"
}

### Update user
PUT https://nisa-invest-tfb-be.vercel.app/users/1
Content-Type: application/json

{
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane.smith@example.com"
}

### Delete user
DELETE https://nisa-invest-tfb-be.vercel.app/users/7