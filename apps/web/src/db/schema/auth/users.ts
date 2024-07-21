import crypto from 'node:crypto'

import {
  AttachableType,
  Attachment,
  attachments,
} from '$/db/schema/attachments/attachments'
import { Account, accounts } from '$/db/schema/auth/accounts'
import readfort from '$/db/schema/dbSchema'
import { lowercaseColumn, timestamps } from '$/db/schema/schemaHelpers'
import { KindleCountry } from '$/lib/types'
import { InferSelectModel, relations, sql } from 'drizzle-orm'
import { bigserial, text, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core'

export const kindleCountriesEnum = readfort.enum('kindle', [
  KindleCountry.US,
  KindleCountry.UK,
  KindleCountry.DE,
  KindleCountry.FR,
  KindleCountry.IT,
  KindleCountry.ES,
  KindleCountry.JP,
  KindleCountry.IN,
  KindleCountry.MX,
  KindleCountry.BR,
  KindleCountry.AU,
])

export const users = readfort.table(
  'users',
  {
    /* id: text('id') */
    /*   .primaryKey() */
    /*   .$defaultFn(() => crypto.randomUUID()), */
    id: bigserial('id', { mode: 'number' }).notNull().primaryKey(),
    name: text('name'),
    email: text('email').notNull(),
    username: varchar('username').notNull(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
    kindle: kindleCountriesEnum('kindle'),
    attachableType: varchar('attachable_type', { length: 256 }).default(
      sql`'${AttachableType.Users}'`,
    ),
    ...timestamps(),
  },
  (user) => ({
    emailIdx: uniqueIndex('email_idx').on(lowercaseColumn(user.email)),
    username: uniqueIndex('username_idx').on(lowercaseColumn(user.username)),
  }),
)

export const usersRelations = relations(users, ({ one }) => ({
  account: one(accounts, {
    fields: [users.id],
    references: [accounts.userId],
  }),
  avatar: one(attachments, {
    fields: [users.id, users.attachableType],
    references: [attachments.attachableId, attachments.attachableType],
  }),
}))

export type User = InferSelectModel<typeof users> & {
  account?: Account
  avatar?: Attachment
}

export type SafeUser = Pick<
  User,
  'id' | 'name' | 'email' | 'emailVerified' | 'image' | 'username' | 'kindle'
>
