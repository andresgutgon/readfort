import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id'),
  name: text('name'),
  email: text('email'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})
