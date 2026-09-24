This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The landing page lives in `app/[locale]/page.js`; its sections are in `components/templates/landing/`. The page auto-updates as you edit the files.

## SEO

The canonical domain is configured in `lib/seo.js`. Titles and descriptions use `messages/es.json` and `messages/en.json`. Internal pages have their own metadata and canonical URLs. The legal document has its own slug per language (`/es/politicas-de-privacidad/`, `/en/privacy-policy/`, see `data/legalSlugs.js`); the other slug in each language redirects to the right one.

`app/sitemap.js` lists the public canonical pages. `app/robots.js` permits crawling so crawlers can read `noindex` on thank-you pages and the 404 response from removed panel routes.

After `npm run build` and `npm start`, run `npm run check:seo -- http://127.0.0.1:3000` to check metadata, language alternates, H1 headings, redirects, error statuses, robots.txt and the sitemap against the production server.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Structured data — first GEO stage

The two home pages render an Organization, WebSite, WebPage and Service JSON-LD graph in the initial server HTML. `lib/structured-data.js` reuses the existing translated metadata and visible service copy, with stable organization/website identifiers shared across languages. It escapes `<` before embedding JSON. The client-side LinkedIn tag remains isolated in `HomeTracking`.

`check:seo` also validates JSON parsing, internal entity references, localized copy, initial-HTML service content and absence of home markup on funnel pages. This is a technical baseline, not a guarantee of mentions in AI answers or a completed GEO program.

Next content review: verify case-study evidence and publication permission, make testimonials readable in initial HTML, and review existing FAQ clarity. Confirm official business/contact details before adding addresses, founding dates or other claims. No ratings or invented results are included.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# kliv-landing-v3
# kliv-landing-v3
