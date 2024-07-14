/** @type {import('next').NextConfig} */
export default {
  serverExternalPackages: ['sequelize'],
  webpack: (config) => {
    // NOTE: There's a native NextJS option in
    // experimental.serverComponentsExternalPackages but it doesn't work
    // in monorepos. This is a workaround.
    // https://github.com/vercel/next.js/issues/43433
    config.externals.push({
      'nodemailer-mailgun-transport': 'commonjs nodemailer-mailgun-transport',
    })

    return config
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  },
}
