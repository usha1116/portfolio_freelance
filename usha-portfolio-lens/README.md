# Usha Teli: portfolio

Next.js (App Router) + Three.js. Concept: one page, seen two ways.

- **Hero lens**: drag/move the lens to read "Thoughtfully engineered underneath."
- **Show the build** switch (top bar): the whole page draws its own component tree and each project reveals its architecture layers. Fully keyboard accessible.
- **How I build**: a Three.js stack of four paper-craft layers that pulls apart as you scroll; drag to rotate.
- **Project sketches**: small working versions of each product's main flow. They are illustrations, not screenshots.

## Run

    npm install
    npm run dev        # http://localhost:3000
    npm run build

## Deploy to Netlify

Connect the repo; Netlify detects Next.js (`netlify.toml` adds the Next.js runtime). Build command `npm run build`.

## Contact form email delivery

The contact form sends submissions through [Resend](https://resend.com/) to the email address in `data/site.ts`.

1. Create a Resend account and an API key.
2. Verify a domain you control in Resend, then choose a sender address on that domain.
3. Set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` in Netlify under **Site configuration → Environment variables**. `CONTACT_FROM_EMAIL` must be a sender Resend allows (for example, `Portfolio <contact@your-verified-domain.com>`).
4. Redeploy the site after setting the variables.

For local development, set the same variables in `.env.local`. Keep the API key server-side; do not prefix it with `NEXT_PUBLIC_` or commit it.

## Before you publish: edit `data/site.ts`

Search for `CONFIRM`:
1. Confirm the email address that should receive contact form submissions.
2. GitHub and LinkedIn URLs.
3. Whether Ahmedabad should be shown as your current location.
4. Each project's role and stack against its repository; add `github` links.
5. ToneOwl live URL (currently points at the older Vibe Reply deployment).
6. InOutBilling and StudyUnify live URLs, if deployed.
7. Replace the sketches with real screenshots by adding images in `public/` when you have them.

## Status

Written without being able to install or build in the authoring environment (npm registry blocked), so it has not been compiled or viewed in a browser. Run `npm run lint` (type check) and `npm run build` first and report anything that fails.
