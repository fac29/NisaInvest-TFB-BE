# API Endpoints Documentation

## Contact Nisa

- **GET /contactnisa/all**: Get all contacts
- **POST /contactnisa**: Create contact request
  ```json
  {
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "social_media": "@johndoe",
    "text_field": "Contact request"
  }
  ```

## Goals

- **GET /goals/user/:userId**: Get all goals for a user
- **GET /goals/:goalId**: Get goal by ID
- **POST /goals**: Create goal
  ```json
  {
    "user_id": 1,
    "title": "New Goal",
    "description": "Description",
    "status": "not_done",
    "due_date": "2024-12-31T23:59:59Z"
  }
  ```
- **PUT /goals/:goalId**: Update goal
- **PUT /goals/user-goal/:userId/:goalId**: Update user-specific goal
- **DELETE /goals/:goalId**: Delete goal
- **POST /goals/update-quiz-selected**: Set goals as quiz selected
  ```json
  {
    "userId": 5,
    "goalIds": [1, 2, 3]
  }
  ```
- **GET /goals/user-quiz-goals/:userId**: Get categorized user goals

## Quiz

- **GET /quiz/questions**: Get all questions
- **GET /quiz/questions-with-answers**: Get questions with answers
- **POST /quiz/goals-for-answers**: Get goals for answers
  ```json
  {
    "answerIds": [1, 2, 3]
  }
  ```
- **GET /quiz/questions/:questionId**: Get question by ID
- **POST /quiz/questions**: Create question
- **PUT /quiz/questions/:questionId**: Edit question
- **DELETE /quiz/questions/:questionId**: Delete question
- **GET /quiz/answers**: Get all answers
- **GET /quiz/answers/:answerId**: Get answer by ID
- **POST /quiz/answers**: Create answer
- **PUT /quiz/answers/:answerId**: Edit answer
- **DELETE /quiz/answers/:answerId**: Delete answer

## Quotes

- **GET /quotes**: Get all quotes
- **GET /quotes/:quoteId**: Get quote by ID
- **POST /quotes**: Create quote
- **PUT /quotes/:quoteId**: Update quote
- **DELETE /quotes/:quoteId**: Delete quote
- **GET /quotes/random**: Get random quotes (use query params for date and count)

## Reports

- **GET /reports/all**: Get all reports
- **GET /reports/user/:userId**: Get reports for a user
- **POST /reports**: Create report
  ```json
  {
    "user_id": 1,
    "title": "Report Title",
    "text": "Report content",
    "priority": "medium"
  }
  ```
- **PUT /reports/:reportId**: Update report
- **DELETE /reports/:reportId**: Delete report

## Users

- **GET /users/all**: Get all users
- **GET /users/email/:email**: Get user by email
- **POST /users**: Create user
  ```json
  {
    "email": "user@example.com",
    "first_name": "User Name",
    "password": "password123"
  }
  ```
- **PUT /users/:userId**: Update user
- **DELETE /users/:userId**: Delete user