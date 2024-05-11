import { timestamps } from '$/db/schema/schemaHelpers'
import { pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core'

export const verificationTokens = pgTable(
  'verificationTokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
    ...timestamps(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
)
