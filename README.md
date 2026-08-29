# TutorBridge

Marketing website + lightweight backend for **TutorBridge** — a platform
connecting parents and students in Pakistan with suitable tutors (O Levels,
IGCSE, A Levels, Matric, Intermediate, IELTS, SAT and school-level tuition).

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, backed by
**Supabase** (database) and **ntfy.sh** (live push notifications).

## How submissions work now

- **Find a Tutor** and **Become a Tutor** forms save straight to your
  database (Supabase) — nothing is sent via WhatsApp automatically.
- The moment someone submits either form, you get a **push notification on
  your phone and/or desktop** (via ntfy — see setup below).
- You view, search, and manage every submission in a password-protected
  dashboard at **`/admin`** — mark things "Contacted" or "Closed", or delete
  them. Clicking a WhatsApp number there opens a chat with that person
  directly, on your terms.
- The floating WhatsApp button and WhatsApp links elsewhere on the site are
  still there for people who want to message you directly — those are
  unrelated to the two forms.

This means **you need to do a bit of one-time setup** (below) before the
forms will work. Until you do, submitting a form will show a friendly error
message rather than silently failing.

## 1. One-time setup

### A. Create a Supabase project (free)

1. Go to [supabase.com](https://supabase.com) → sign up → **New project**.
2. Once it's created, go to **SQL Editor** → **New query**, paste the
   entire contents of [`supabase/schema.sql`](./supabase/schema.sql), and
   click **Run**. This creates the two tables submissions are stored in.
3. Go to **Project Settings → API**. You'll need:
   - **Project URL** → this is `SUPABASE_URL`
   - **`service_role` secret key** (not the `anon` public key) → this is
     `SUPABASE_SERVICE_ROLE_KEY`

   ⚠️ The service role key can read/write everything in your database with
   no restrictions — keep it secret, never commit it, never put it in a
   `NEXT_PUBLIC_` variable.

### B. Set up live push notifications (ntfy.sh, free, no signup)

1. Pick a topic name only you know, e.g. `tutorbridge-yourname-x7k2`
   (treat it like a password — anyone who knows it can also send to it).
2. Install the **ntfy** app: [iOS](https://apps.apple.com/app/ntfy/id1625396347),
   [Android](https://play.google.com/store/apps/details?id=io.heckel.ntfy),
   or use [ntfy.sh/app](https://ntfy.sh/app) in a desktop browser / their
   desktop app.
3. In the app, tap **Subscribe to topic** and enter the exact topic name you
   picked.
4. That's it — no account required. Test it anytime by running:
   ```bash
   curl -d "Test notification" ntfy.sh/your-topic-name
   ```
   You should see it appear on your phone/desktop within seconds.

### C. Choose an admin password

Pick a strong password for the `/admin` dashboard — this is the only thing
protecting your submissions, so don't reuse a password from elsewhere.

### D. Set up the AI chat assistant (Google Gemini — free tier)

The floating chat bubble (bottom-left) is **Bridget**, TutorBridge's assistant.
She answers academic questions (e.g. "what's covered in O Level Physics") and
TutorBridge-specific questions (how matching works, contact info) using
Google's Gemini model, grounded with TutorBridge's own facts — see
`lib/chat-knowledge.ts`.

Gemini was chosen over Claude/GPT here specifically because Google offers a
genuinely free tier directly (no credit card needed to start), which matters
for long-term running costs on a small site like this.

1. Go to [aistudio.google.com](https://aistudio.google.com) → sign in with a
   Google account.
2. Click **Get API Key** → **Create API key**. Copy it — this is
   `GEMINI_API_KEY`.
3. The free tier has a request-per-minute and per-day limit that Google sets
   (and occasionally adjusts) — check current numbers at
   [ai.google.dev/pricing](https://ai.google.dev/pricing). For a small
   business site's chat volume, the free tier is normally more than enough;
   if you ever outgrow it, Gemini's paid tier is inexpensive, or you can swap
   in a different provider later (the whole integration lives in one file,
   `app/api/chat/route.ts`, so swapping providers is a contained change).
   If this variable isn't set, the chat widget shows a friendly
   "unavailable, try WhatsApp" message instead of breaking.

**On quality:** Gemini's free-tier model has broad general academic knowledge
similar to other major models — plenty capable for typical O/A Level, IGCSE,
IELTS and SAT-level questions. It may occasionally be less polished on very
nuanced or advanced questions than a top-tier paid model, but for the
day-to-day questions a prospective student or parent will actually ask, it's
a strong, genuinely free fit.

**On "training" the assistant:** rather than fine-tuning a model (slow,
expensive, and hard to keep current), the assistant is *grounded* — every
conversation includes a detailed, accurate description of TutorBridge (what
it offers, how it works, contact info) alongside the model's own broad
academic knowledge. To change what Bridget knows about your business, just
edit the text in `lib/chat-knowledge.ts` — no retraining, no redeployment of
a model, just a normal code change and deploy.

## 2. Local development

Requires [Node.js](https://nodejs.org) 18.18+.

1. Copy `.env.example` to `.env.local` and fill in the five values from
   above (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`,
   `NTFY_TOPIC`, `GEMINI_API_KEY`).
2. Install and run:
   ```bash
   npm install
   npm run dev
   ```
3. Visit `http://localhost:3000` for the site, and
   `http://localhost:3000/admin` for the dashboard.

## 3. Deploy to Vercel (free)

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Before deploying, add the same five environment variables under
   **Environment Variables** (Production — and Preview/Development too, if
   you want them working on preview branches).
4. Click **Deploy**.

If you ever change these values later, do it in **Project → Settings →
Environment Variables** and redeploy.

## 4. Editing contact info & links

Everything else you're likely to change — WhatsApp numbers, Instagram/
Facebook links, email — lives in one file:

```
lib/site-config.ts
```

## 5. Project structure

```
app/
  layout.tsx, page.tsx, find-a-tutor/, become-a-tutor/, subjects/, about/, contact/, privacy/
  admin/                 Password-protected dashboard (login/, page.tsx)
  api/
    find-a-tutor/         POST → saves to Supabase + push notification
    become-a-tutor/       POST → saves to Supabase + push notification
    chat/                  POST → AI chat assistant "Bridget" (Google Gemini)
    admin/
      login/, logout/      Session cookie for the dashboard
      requests/             GET/PATCH/DELETE submissions (dashboard uses this)
components/               Navbar, Footer, forms, cards, ChatWidget, FlagMarquee, FAQ, Reveal
lib/
  site-config.ts           ← edit contact info & links here
  data.ts                   Levels & subjects content
  chat-knowledge.ts         ← edit what the AI assistant knows about TutorBridge
  supabase/server.ts        Server-only Supabase client (service role key)
  notify.ts                 ntfy.sh push notification helper
  admin-auth.ts              Stateless session helper for /admin
middleware.ts              Protects /admin and /api/admin routes
supabase/schema.sql        Run this once in Supabase's SQL Editor
```

## 6. Notes on the admin dashboard

- There's a single admin account (you) — sign-in is just the shared
  password from `ADMIN_PASSWORD`, no separate user accounts. This keeps
  things simple for a one-person or small-team operation. If you later want
  multiple staff logins with individual accounts, that can be upgraded to
  Supabase Auth without changing anything else in the app.
- The dashboard list auto-refreshes every 15 seconds while open. The push
  notification (ntfy) is what alerts you the moment something new comes in,
  even when the dashboard isn't open.
- Both submission forms have a hidden honeypot field to filter out simple
  spam bots — real users never see or fill it in, so it doesn't affect the
  experience.
