# TypeScript + Express Backend Project Style Guide

## 1. File Structure and Naming

- Use camelCase for file names: `userController.ts`, `authMiddleware.ts`
- Group related files in directories: `controllers/`, `models/`, `middlewares/`, `routes/`, `services/`, `utils/`
- Use index files to export from directories: `controllers/index.ts`

- Variables:
  - Use camelCase for variables and function names. 
  - Choose names that clearly describe the variable's purpose or content.
  - Use pronounceable names for easier discussions.
  - Avoid single-letter names or numeric constants without context.
  - For functions or methods, start with verbs that clearly indicate the action.
  - If the variable's purpose isn't clear from its immediate context, add more information to the name.
  - Use positive names for boolean variables, with prefixes like 'is', 'has', or 'should'.

```typescript
// Good
const userAge = 25;
const isActiveSubscription = true;
const fetchUserData = async (userId: string) => { /* ... */ };

// Avoid
const a = 25;
const active = true;
const userData = async (id: string) => { /* ... */ };
```

## 2. Typing

- Use TypeScript's built-in types where possible: `string`, `number`, `boolean`
- Create interfaces for complex shapes, including request bodies and response objects
- Use `type` for union types or simple aliases
- Use `enum` for a fixed set of constants

```typescript
interface User {
  id: string;
  name: string;
  role: 'admin' | 'user';
}

type UserId = string;

enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending'
}

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  id: string;
  name: string;
  email: string;
}
```

## 3. Express Route Handlers

- Use async/await for asynchronous operations
- Use strong typing for request and response objects
- Implement error handling middleware

```typescript
import { Request, Response, NextFunction } from 'express';
import { CreateUserRequest, CreateUserResponse } from '../interfaces/user';

const createUser = async (
  req: Request<{}, {}, CreateUserRequest>,
  res: Response<CreateUserResponse>,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    // User creation logic
    const newUser = await userService.createUser({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
```

## 4. Middleware

- Create reusable middleware functions for common operations
- Use descriptive names for middleware functions

```typescript
import { Request, Response, NextFunction } from 'express';

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  // JWT validation logic
};

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
};
```
## 5. Imports and Exports

- Use named exports for multiple exports from a file
- Use default export for the main functionality of a file
- Group imports: third-party, local

```typescript
import express from 'express';
import { createUser, getUser } from './controllers/userController';
import { validateJWT } from './middlewares/authMiddleware';
```

## 6. Comments and Documentation

- Use JSDoc comments for functions and classes
- Keep comments concise and meaningful
- Use TODO comments for temporary code or future improvements

```typescript
/**
 * Creates a new user in the database.
 * @param {CreateUserRequest} userData - The user data to create.
 * @returns {Promise<User>} The created user object.
 * @throws {Error} If the user creation fails.
 */
const createUser = async (userData: CreateUserRequest): Promise<User> => {
  // User creation logic
};
```

## 7. Environment Variables

- Use `dotenv` to manage environment variables
- Create a separate file for loading and validating environment variables

```typescript
import dotenv from 'dotenv';
import { cleanEnv, str, port } from 'envalid';

dotenv.config();

export default cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
  PORT: port({ default: 3000 }),
  DATABASE_URL: str(),
  JWT_SECRET: str(),
});
```

## 8. Linting and Formatting

- Use Prettier for code formatting

Prettier configuration:
```json
{
  "trailingComma": "es5",
  "tabWidth": 4,
  "singleQuote": true
}
```