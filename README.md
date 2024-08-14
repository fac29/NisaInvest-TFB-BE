# NisaInvest-TFB-BE

This backend project is designed to work with Vercel's serverless environment. Here's a quick guide to get you started:

## Deployment

### Environment Variables
- **Development**: Use `.env` file
CORS_ORIGIN=http://localhost:3000
- **Production**: Set in Vercel dashboard
CORS_ORIGIN=https://the-frontend-domain.com

### Deployment Command
```npx vercel --prod```
Backend URL: https://nisa-invest-tfb-be.vercel.app/
It will also deploy when pushing code to the branch 'deployed'

### Local Development
#### Supabase Commands
##### Start local instance:
```npx supabase start```
##### Stop local instance:
```npx supabase stop```
##### Reset local DB:
```npx supabase db reset```
##### Access local Supabase Studio:
```http://localhost:54323```

### Supabase Remote Setup

1) Generate access token at https://app.supabase.com
2) Set environment variable:
```export SUPABASE_ACCESS_TOKEN=your_new_token_here```

3) Link with remote DB:
```npx supabase link --project-ref xzzacivebczssoporkmz```

### Reset Remote DB (Caution: Will reseed)
```npx supabase db reset --linked```

## API Documentation
See test files for each category:
* [Contact](./tests/contact_nisa.http)
* [Goals](./tests/goals.http)
* [Quiz](./tests/quiz.http)
* [Quotes](./tests/quotes.http)
* [Reports](./tests/reports.http)
* [Users](./tests/users.http)