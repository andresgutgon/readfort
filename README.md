# Read fort

Readfort is a web app and a chrome extension to get hightlights from Kindle and
store them in a database. Then you can search and filter them by book or author.
Also by hightlights content.

It will have a text editor with a block system similar to Notion where you can reference books, authors and hightlights.

## Mailer

Mails are configured to work during development with [Mailpit](https://mailpit.axllent.org/) it traps the emails and shows you in a nice web UI at http://localhost:8025. If you do `pnpm dev` in `apps/web` it should start PostgreSQL and Mailpit configured in docker compose

In production it uses [Mailgun](https://www.mailgun.com/). In order to make it
work you need to s1et the following environment variables:

```bash
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your_mailgun_domain
```

Mails are used mostly now for sending magic links to login.
