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
│   ├── app.ts
│   └── (other source files)
├── package.json
├── tsconfig.json
└── vercel.json

