# My Personal Portfolio

A personal portfolio website for a **Full-Stack Web Developer**, built to attract freelance
clients, local businesses, schools, and international clients.

Built with **React + TypeScript + Vite + Tailwind CSS + Lucide React**.

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Build for production (outputs to /dist)
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## Project Structure

```
My-Portfolio/
├── index.html                  # HTML entry point (fonts, meta tags, favicon)
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js          # Brand colors, fonts, animations
├── postcss.config.js
├── vercel.json                 # Vercel deployment settings
├── public/
│   ├── favicon.svg
│   └── my-picture.jpg          # Optimized copy of your photo (used by the site)
├── src/
│   ├── main.tsx                # React entry point
│   ├── App.tsx                 # Page layout / section order
│   ├── index.css               # Tailwind layers + reusable component classes
│   ├── config/
│   │   └── site.ts             # ← EDIT THIS: your name, contact info, projects
│   ├── data/
│   │   ├── navigation.ts       # Nav link labels
│   │   └── portfolio.ts        # Services, technologies, and process steps
│   └── components/
│       ├── Navbar.tsx          # Responsive nav with mobile menu + active highlighting
│       ├── Hero.tsx            # Home section with your photo
│       ├── About.tsx           # About section with personal details card
│       ├── Services.tsx        # 8 service cards
│       ├── Technologies.tsx    # 8 technology cards
│       ├── Projects.tsx        # Project cards with screenshot placeholders
│       ├── Process.tsx         # 4-step development process
│       ├── Contact.tsx         # Contact details + working contact form
│       ├── Footer.tsx          # Footer with dynamic copyright year
│       ├── SectionHeading.tsx  # Reusable section heading
│       └── Reveal.tsx          # Subtle scroll-in animation (respects reduced motion)
└── My-Picture.jfif             # Your original photo — kept untouched
```

---

## Personalizing the Site

Almost everything you need to change lives in **one file**: `src/config/site.ts`

| What | Where |
| --- | --- |
| Your name | `site.name` |
| Hero tagline & introduction | `site.tagline`, `site.intro` |
| About paragraphs | `site.about` |
| Location, email, phone, Facebook | `site.location`, `site.email`, `site.phone`, `site.facebook` |
| Social links in the footer | `site.socials` |
| Projects (title, description, URL, screenshot) | `site.projects` |

Other editable content:

- **Services, technologies, and process steps** — `src/data/portfolio.ts`
- **Navigation labels** — `src/data/navigation.ts`
- **Brand colors and fonts** — `tailwind.config.js`
- **Your photo** — replace `public/my-picture.jpg` (keep the same filename, or update
  `site.picture`). The original `My-Picture.jfif` is never touched.

Every value that needs your input is marked with a `TODO` comment.

### Adding a project screenshot

1. Put the image in `public/` (for example `public/projects/mtcgs.png`).
2. Set that project's `screenshot` field to `'/projects/mtcgs.png'`.
3. Leave it as `''` to keep the placeholder.

---

## The Contact Form

The contact form sends messages through a Vercel serverless API endpoint and Resend. The visitor's
email address is included as the reply-to address; messages are sent only to the configured
`CONTACT_TO_EMAIL`.

Before deploying, create a Resend account, verify a sender domain/address, and add these
environment variables in **Vercel → Project Settings → Environment Variables**:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | API key from Resend |
| `CONTACT_FROM_EMAIL` | Sender address verified with Resend (for example, `Portfolio <contact@your-domain.com>`) |
| `CONTACT_TO_EMAIL` | Inbox that should receive messages (for example, the address in `site.email`) |

Keep the API key only in Vercel environment variables; never put it in frontend code or commit it
to the repository. Redeploy after adding or changing the variables. The Vercel function is not
available from the plain Vite development server (`npm run dev`); use a Vercel deployment or
`vercel dev` to test actual email delivery.

---

## Deploying to Vercel

The project is already configured for Vercel (`vercel.json` sets the framework to Vite and the
output directory to `dist`).

### Option A — From a Git repository (recommended)

1. Push this folder to GitHub, GitLab, or Bitbucket.
2. Go to <https://vercel.com/new> and **Import** the repository.
3. Vercel auto-detects Vite. Leave the defaults and click **Deploy**.
4. Every new push to the main branch triggers a new deployment automatically.

### Option B — From the terminal

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

### Option C — Drag and drop

Run `npm run build`, then drag the generated `dist/` folder onto
<https://vercel.com/new/drop>.

---

## Notes

- No personal information is collected or stored by the website.
- The site is a single page with smooth-scrolling anchor navigation.
- Animations are subtle and disabled automatically for visitors who prefer reduced motion.
