# NisaInvest-TFB-BE

There are a few important considerations and modifications we need to make to ensure it works well with Vercel's serverless environment. Here's what you need to know:

Vercel and Express:
* Vercel primarily supports serverless functions, which means we need to adapt our Express app to work in this environment.
* File Structure: We'll need to modify our file structure slightly to work with Vercel's conventions.
* Serverless Function: We'll create a serverless function that wraps our Express app.

NISAINVEST-TFB-BE/
├── api/
│   └── index.ts
├── src/
│   ├── app.ts //Here we set the express server and its middleware
│   └── (other source files)
├── package.json
├── tsconfig.json
└── vercel.json


Vercel (Production):
On Vercel, you'll set environment variables through their dashboard or CLI. These will be available in your code via process.env without needing to use dotenv.

In your .env file for development:
```CopyCORS_ORIGIN=http://localhost:3000```

In Vercel's dashboard or CLI, set the same variable:
```CopyCORS_ORIGIN=https://your-frontend-domain.com```

Production Environment (Vercel):
Vercel automatically sets NODE_ENV to production in its deployment environment. You don't need to set this manually.

To redeploy:
npx vercel --prod

The backend will be accessible on:
https://nisa-invest-tfb-be.vercel.app/


#### Run and stop local supabase instance
```npx supabase start```
```npx supabase stop```

#### Reset local db
```npx supabase db reset```

#### Access to local Supabase Studio
```http://localhost:54323/project/default```

#### Generate Supabase access token to link local db with remote. Needed to be able to push local schema to remote schema
Go to https://app.supabase.com
Click on your profile icon in the top right
Select "Account"
In the left sidebar, click "Access Tokens"
Click "Generate New Token"
Name it (e.g., "CLI Access Token") and generate it
Copy the token immediately (you won't see it again)

Then set it as an environment variable:
```export SUPABASE_ACCESS_TOKEN=your_new_token_here```

#### Link with remote DB:
```npx supabase link --project-ref xzzacivebczssoporkmz```

### Completely reset remote db (Caution, will reseed)
```npx supabase db reset --linked```