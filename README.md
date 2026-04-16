# News Website Frontend

Public-facing website that reads published articles from your Supabase-backed CMS.

## Features

- Homepage with latest published stories
- Article detail pages by slug
- Category pages
- Featured images, author, publish timestamp
- Dhivehi RTL rendering support

## Setup

1. Copy `.env.example` to `.env.local`
2. Add your Supabase values:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

3. Install and run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Data source

This app reads from:

- `articles` (published only)
- `categories`

It is designed to work directly with your existing CMS database schema.
