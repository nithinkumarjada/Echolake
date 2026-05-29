# Nithin Kumar Jada Premium Portfolio

Modern personal portfolio built with Next.js, TypeScript, Tailwind CSS, Framer Motion, Three.js, and production deployment assets.

## Features

- Dark and light mode with accessible theme toggle
- Responsive sticky navigation, command palette, scroll progress, and floating social links
- Animated hero with Three.js particles and dynamic role marquee
- About, skills, experience, projects, certifications, education, achievements, GitHub, blog, testimonials, resume, advanced features, and contact sections
- Project search, category filters, and animated case-study modals
- SEO metadata, sitemap, robots, JSON-LD structured data, favicon, PWA manifest, and service worker
- Dockerfile and GitHub Actions CI pipeline
- Optional database schema in `docs/schema.sql` for analytics, contact messages, newsletter, and chatbot telemetry

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Resume

Add the resume PDF at:

```text
public/resume/Nithin_SDE.pdf
```

The current UI points resume preview and download actions to that file.

## Production Build

```bash
npm run typecheck
npm run lint
npm run build
npm run start
```

## Docker

```bash
docker build -t nithin-portfolio .
docker run -p 3000:3000 nithin-portfolio
```

## Deployment

Recommended deployment targets:

- Vercel for fastest Next.js SSR deployment
- AWS Amplify or Azure Static Web Apps with SSR-compatible configuration
- Docker on ECS, Cloud Run, App Service, or Kubernetes

Set these before launch:

- Replace placeholder social URLs, email, phone, and GitHub username in `lib/portfolio-data.ts`
- Add the actual resume PDF under `public/resume/`
- Connect contact and newsletter forms to an API route or provider
- Add analytics through `@next/third-parties` or your preferred provider
