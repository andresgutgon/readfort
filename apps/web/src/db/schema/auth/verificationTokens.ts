import { users, type User } from '$/db/schema/auth/users'
import readfort from '$/db/schema/dbSchema'
import { timestamps } from '$/db/schema/schemaHelpers'
import { InferSelectModel, relations } from 'drizzle-orm'
import { primaryKey, text, timestamp } from 'drizzle-orm/pg-core'

export const verificationTokens = readfort.table(
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

export const verificationTokensRelations = relations(
  verificationTokens,
  ({ one }) => ({
    user: one(users, {
      fields: [verificationTokens.identifier],
      references: [users.id],
    }),
  }),
)

export type VerificationToken = InferSelectModel<typeof users> & {
  user: User
}
