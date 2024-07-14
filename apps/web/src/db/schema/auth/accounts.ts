import readfort from '$/db/schema/dbSchema'
import { timestamps } from '$/db/schema/schemaHelpers'
import { InferSelectModel, relations } from 'drizzle-orm'
import { integer, primaryKey, text } from 'drizzle-orm/pg-core'
import type { AdapterAccountType } from 'next-auth/adapters'

import { users, type User } from './users'

export const accounts = readfort.table(
  'accounts',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
    ...timestamps(),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
)

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))

export type Account = InferSelectModel<typeof accounts> & {
  account: User
}
