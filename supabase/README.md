# Supabase Setup Guide

This project uses Supabase for database and authentication.

## Prerequisites

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new project in your Supabase dashboard

## Setup Steps

### 1. Get Your Credentials

From your Supabase project dashboard:

1. Go to **Settings** → **API**
2. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep this secret!)

### 2. Create Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Supabase credentials in `.env.local`

### 3. Run Database Migrations

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase/schema.sql`
4. Paste and run the SQL in the editor

This will create all necessary tables, indexes, and Row Level Security (RLS) policies.

## Database Schema

### Tables

- **profiles** - User profiles (extends auth.users)
- **jobs** - Job postings
- **applications** - User job applications
- **saved_jobs** - Jobs saved by users
- **courses** - AI-generated preparation courses
- **course_purchases** - Course purchase records
- **course_progress** - User progress through courses
- **activity_logs** - Activity tracking for admin

### Security

All tables have Row Level Security (RLS) enabled with appropriate policies:

- Users can only read/write their own data
- Employers can manage their own job postings
- Employers can view applications for their jobs
- Admins have elevated access
- Public data (jobs, courses) is readable by all

## Authentication

Supabase Auth is configured with:

- Email/password authentication
- OAuth providers (optional: Google, GitHub, etc.)
- Session persistence
- Auto token refresh

### Setting Up OAuth (Optional)

1. Go to **Authentication** → **Providers** in Supabase dashboard
2. Enable desired providers (Google, GitHub, etc.)
3. Configure OAuth credentials from each provider

## Usage in Code

### Client-side (React components)

```typescript
import { supabase } from '@/lib/supabase/client';

// Fetch jobs
const { data: jobs } = await supabase
  .from('jobs')
  .select('*')
  .eq('status', 'active');

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
});

// Sign out
await supabase.auth.signOut();
```

### Server-side (Admin operations)

```typescript
import { supabaseAdmin } from '@/lib/supabase/server';

// Admin operations with service role
const { data: users } = await supabaseAdmin
  .from('profiles')
  .select('*');
```

## Testing

You can test the database connection by running:

```bash
npm run dev
```

The app will throw an error if Supabase credentials are missing or invalid.

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` exists and contains all required variables
- Restart the dev server after adding environment variables

### "JWT expired" or authentication errors
- Clear browser cookies and local storage
- Sign out and sign back in

### RLS policy errors
- Verify RLS policies are correctly set up in Supabase dashboard
- Check that the user has the correct role for the operation

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
