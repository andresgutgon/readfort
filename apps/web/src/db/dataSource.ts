import 'reflect-metadata'

import { DataSource, DataSourceOptions } from 'typeorm'

import env from '../env'

export function getConfig() {
  return {
    type: 'postgres',
    host: env.DB_HOST,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    schema: 'readfort',
    database: env.DB_DATABASE,
    port: env.DB_PORT,
    entities: ['src/db/models/*.model.{ts,js}'],
    migrations: ['src/db/migrations/*.{ts,js}'],
    migrationsRun: false, // Run migrations manually
    logging: false,
  } as DataSourceOptions
}

const datasource = new DataSource(getConfig())

export const getDBConnection = async (): Promise<DataSource> => {
  if (!datasource.isInitialized) {
    await datasource.initialize()
  }
  return datasource
}
