const isPro = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

const options = {
  dialect: 'postgres',
  schema: 'readfort',
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  models: [],
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
}

if (isPro) {
  options.dialectOptions.ssl = {
    require: true,
    rejectUnauthorized: true,
  }
}

export { options }

export default {
  development: options,
  test: options,
  production: options,
}
