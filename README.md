# Elev8 Print

Next.js serverless application for Elev8 Print — custom stickers, mylar bags, order management, and admin tools. Deployed on Vercel.

## Stack

- **Next.js 16** (App Router, serverless API routes)
- **Supabase** (database, auth, file storage)
- **SendGrid** (transactional email)
- **Zustand** (cart state)

## Getting started

```bash
npm install
cp .env.example .env.local
# Fill in your environment variables
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Scope | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Supabase anon key (client auth) |
| `SUPABASE_URL` | Server | Supabase project URL |
| `SUPABASE_KEY` | Server | Supabase service role key |
| `SENDGRID_API_KEY` | Server | SendGrid API key |
| `JWT_SECRET` | Server | Secret for admin JWT tokens |
| `ADMIN_PASSWORD` | Server | Admin panel login password |
| `JWT_EXPIRES_IN` | Server | Admin token expiry (default: `1h`) |

## API routes

All former Express backend endpoints are now Next.js Route Handlers under `/api/`:

- `GET /api/health` — health check
- `POST /api/auth/login` — admin authentication
- `POST /api/contact` — contact form
- `GET /api/pricing` — sticker pricing proxy
- `GET/POST /api/orders` — list / create orders
- `POST /api/orders/upload` — design file upload
- `GET /api/orders/track/:track_id` — track order
- `GET /api/orders/mine/:user_id` — user orders
- `PATCH /api/orders/:id/status` — update order status (auth)
- `DELETE /api/orders/:id` — delete order (auth)
- `GET /api/posts` — list posts
- `PATCH /api/posts/:id` — update post

## Deploy on Vercel

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Deploy

No separate backend server is required — API routes run as Vercel serverless functions.

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```
