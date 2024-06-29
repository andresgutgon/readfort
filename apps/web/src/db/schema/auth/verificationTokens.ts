import { users, type User } from '$/db/schema/auth/users'
import { timestamps } from '$/db/schema/schemaHelpers'
import { InferSelectModel, relations } from 'drizzle-orm'
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

export const verificationRelations = relations(
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
