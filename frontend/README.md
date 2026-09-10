# Hack The Path

Landing page for Hack The Path, a hackathon organized by Trilha UFPB in João Pessoa, PB (February 20–21, 2027).

## Stack

- [Next.js](https://nextjs.org) (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS 4
- Supabase (waitlist storage)
- Resend (transactional email, optional)
- PostHog (analytics, optional)
- Vitest (unit tests)

## Getting Started

```bash
npm install
cp .env.example .env.local # fill in the values you need
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the codebase |
| `npm run test` | Run the test suite once |
| `npm run test:watch` | Run the test suite in watch mode |

## Environment Variables

See `.env.example` for the full list. In short:

- `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` — waitlist storage
- `CRON_SECRET` — auth for the GitHub Actions job hitting `/api/cron/keep-warm`
- `RESEND_*` — optional, waitlist confirmation emails
- `NEXT_PUBLIC_POSTHOG_*` — optional, analytics
- `NEXT_PUBLIC_SITE_URL` — canonical URL used in SEO metadata

## Project Structure

```
app/            Routes, layout, SEO files (sitemap, robots), API endpoints
components/     UI sections (hero, FAQ, CTA, sponsors, waitlist signup form)
content/        Static copy and structured data for each section
lib/            SEO helpers and other shared logic
public/         Static assets (images, fonts)
```

## Deployment

Deployed on [Vercel](https://vercel.com). A GitHub Actions workflow (`.github/workflows/keep-warm.yml`) hits `/api/cron/keep-warm` every 5 days to keep the Supabase project active.
