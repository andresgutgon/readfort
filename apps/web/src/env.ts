import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export default createEnv({
  server: {
    AUTH_SECRET: z.string(),
    FROM_MAILER_EMAIL: z.string(),
    MAILGUN_API_KEY: z.string().optional(),
    MAILGUN_DOMAIN: z.string().optional(),
    DATABASE_URL: z.string(),
    TEST_DATABASE_URL: z.string(),
    BETA_LIST_EMAILS: z.string(),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
  },
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    FROM_MAILER_EMAIL: process.env.FROM_MAILER_EMAIL,
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
    BETA_LIST_EMAILS: process.env.BETA_LIST_EMAILS,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
  },
})
