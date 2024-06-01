# Read fort

Readfort is a web app and a chrome extension to get hightlights from Kindle and
store them in a database. Then you can search and filter them by book or author.
Also by hightlights content.

It will have a text editor with a block system similar to Notion where you can reference books, authors and hightlights.

## Next App development

If you didn't setup dev for running on SSL you can [follow the steps](/apps/web/dev/ssl/README.md) to do it.
After that in 2 different terminals you can run:

```bash
pnpm dev
pnpm dev:ssl
```

## Debugging

```bash
pnpm dev:debug
```

And then go to [chrome://inspect](chrome://inspect/#devices). Be aware that a
second port is created when starting dev server. You have to configure it in
chrome inspect.

You should be able to access the app at https://readfort.dev
In the SSL docs is explained why we want to run on SSL during development.

## Mailer

Mails are configured to work during development with [Mailpit](https://mailpit.axllent.org/) it traps the emails and shows you in a nice web UI at http://localhost:8025. If you do `pnpm dev` in `apps/web` it should start PostgreSQL and Mailpit configured in docker compose

In production it uses [Mailgun](https://www.mailgun.com/). In order to make it
work you need to s1et the following environment variables:

```bash
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your_mailgun_domain
```

Mails are used mostly now for sending magic links to login.

## Google Auth

Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials?project=readfort) and create a new project. Then go to `APIs & Services` -> `Credentials` and create a new OAuth 2.0 Client ID. You can use `http://localhost:3000` as the authorized redirect URI for development.

Then copy the env variables we have in `apps/web/.env.local.example` to a new `.env` file and fill the values you got from Google.
