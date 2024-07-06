import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const DriveDiskSchema = z.union([z.literal('local'), z.literal('s3')])
export default createEnv({
  server: {
    AUTH_URL: z.string(),
    AUTH_SECRET: z.string(),
    FROM_MAILER_EMAIL: z.string(),
    MAILGUN_API_KEY: z.string().optional(),
    MAILGUN_DOMAIN: z.string().optional(),
    DATABASE_URL: z.string(),
    TEST_DATABASE_URL: z.string(),
    BETA_LIST_EMAILS: z.string(),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    AWS_REGION: z.string(),
    S3_BUCKET: z.string(),
    AWS_ACCESS_KEY: z.string().optional(),
    AWS_ACCESS_SECRET: z.string().optional(),
    DRIVE_DISK: DriveDiskSchema,
  },
  client: {},
  runtimeEnv: {
    AUTH_URL: process.env.AUTH_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    FROM_MAILER_EMAIL: process.env.FROM_MAILER_EMAIL,
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
    BETA_LIST_EMAILS: process.env.BETA_LIST_EMAILS,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    DRIVE_DISK: process.env.DRIVE_DISK,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_ACCESS_SECRET: process.env.AWS_ACCESS_SECRET,
    AWS_REGION: process.env.AWS_REGION,
    S3_BUCKET: process.env.S3_BUCKET,
  },
})
