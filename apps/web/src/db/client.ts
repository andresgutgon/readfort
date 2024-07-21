import env from '$/env'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import pg from 'pg'

import * as schema from './schema'

const { Pool } = pg

const testEnv = process.env.NODE_ENV === 'test'
const connectionString = testEnv ? env.TEST_DATABASE_URL : env.DATABASE_URL

const pool = new Pool({ connectionString })
export type Database = NodePgDatabase<typeof schema>
export type Schema = typeof schema
const db = drizzle(pool, { schema })

export default db
