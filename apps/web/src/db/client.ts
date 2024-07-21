import env from '$/env'
import { and, eq, getTableColumns } from 'drizzle-orm'
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

export async function getAvatarSql() {
  const columns = getTableColumns(schema.blobs)
  const result = db
    .select(columns)
    .from(schema.attachments)
    .leftJoin(
      schema.blobs,
      eq(schema.attachments.id, schema.blobs.attachmentId),
    )
    .where(
      and(
        eq(schema.attachments.attachableType, schema.AttachableType.Users),
        eq(schema.attachments.attachableId, 1n),
      ),
    ).toSQL()

  return result.sql
}

export default db
