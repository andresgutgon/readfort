/** @type {import('next').NextConfig} */
export default {
  transpilePackages: ['@readfort/ui'],
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  },
}
