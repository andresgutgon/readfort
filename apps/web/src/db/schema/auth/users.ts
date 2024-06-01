import crypto from 'node:crypto'

import { Account, accounts } from '$/db/schema/auth/accounts'
import { lowercaseColumn, timestamps } from '$/db/schema/schemaHelpers'
import { KindleCountry } from '$/lib/types'
import { InferSelectModel, relations } from 'drizzle-orm'
import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core'

export const kindleCountriesEnum = pgEnum('kindle', [
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

export const users = pgTable(
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
    ...timestamps(),
  },
  (user) => ({
    emailIdx: uniqueIndex('email_idx').on(lowercaseColumn(user.email)),
    username: uniqueIndex('username_idx').on(lowercaseColumn(user.username)),
  }),
)

export const usersRelations = relations(accounts, ({ one }) => ({
  account: one(accounts),
}))

export type User = InferSelectModel<typeof users> & {
  account: Account
}

export type SafeUser = Pick<
  User,
  'id' | 'name' | 'email' | 'emailVerified' | 'image' | 'username' | 'kindle'
>
