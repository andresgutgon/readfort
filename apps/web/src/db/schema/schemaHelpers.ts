import { SQL, sql } from 'drizzle-orm'
import { AnyPgColumn, timestamp } from 'drizzle-orm/pg-core'

export function timestamps() {
  return {
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdateFn(() => new Date()),
  }
}

/**
 * Case-insensitive column for use in unique indexes.
 */
export function lowercaseColumn(column: AnyPgColumn): SQL {
  return sql`lower(${column})`
}
