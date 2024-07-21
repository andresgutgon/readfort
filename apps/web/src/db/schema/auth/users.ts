import crypto from 'node:crypto'

import { Account, accounts } from '$/db/schema/auth/accounts'
import readfort from '$/db/schema/dbSchema'
import { Blob, blobs } from '$/db/schema/media/blobs'
import { lowercaseColumn, timestamps } from '$/db/schema/schemaHelpers'
import { KindleCountry } from '$/lib/types'
import { InferSelectModel, relations } from 'drizzle-orm'
import {
  AnyPgColumn,
  bigint,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core'

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
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text('name'),
    email: text('email').notNull(),
    username: varchar('username').notNull(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
    kindle: kindleCountriesEnum('kindle'),
    avatarId: bigint('avatar_id', { mode: 'bigint' }).references(
      (): AnyPgColumn => blobs.id,
      { onDelete: 'set null' },
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
  avatar: one(blobs, {
    fields: [users.avatarId],
    references: [blobs.id],
  }),
}))

export type User = InferSelectModel<typeof users> & {
  account?: Account
  avatar?: Blob
}

export type SafeUser = Pick<
  User,
  'id' | 'name' | 'email' | 'emailVerified' | 'image' | 'username' | 'kindle'
>
