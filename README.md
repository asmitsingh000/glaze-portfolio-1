# Glaze Portfolio

A personal portfolio built with Next.js, React, TypeScript, and Framer Motion.

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form

The Classic and Minimalist portfolio layouts send contact form submissions through [FormSubmit](https://formsubmit.co/) to `glaze0999@gmail.com`. No API keys, Redis database, or `.env.local` configuration are required.

The first time the form is submitted, FormSubmit sends an activation email to that inbox. Open it and confirm the address before expecting contact messages. Check the spam folder if it does not arrive. FormSubmit processes the submitted name, email address, and message; its spam protection and the form's honeypot field are enabled.

## Deploy

This project can be deployed to Vercel:

1. Push the repository to GitHub and import it at [vercel.com/new](https://vercel.com/new).
2. Deploy using the default Next.js settings.
3. After deployment, submit a test message and confirm the FormSubmit activation email if this is the first submission.

For command-line deployment, use the [Vercel CLI](https://vercel.com/docs/cli):

```bash
npm install --global vercel
vercel
```

## Environment files

Local environment files such as `.env.local` are ignored by Git. Do not commit API keys, passwords, or other secrets.
