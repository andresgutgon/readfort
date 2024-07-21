import { blobs } from '$/db/schema/attachments/blobs'
import readfort from '$/db/schema/dbSchema'
import { InferSelectModel, relations } from 'drizzle-orm'
import { bigserial } from 'drizzle-orm/pg-core'

export enum AttachableType {
  Users = 'users',
}
export const attachableEnum = readfort.enum('attachable_type', [
  AttachableType.Users,
])

export const attachments = readfort.table('attachments', {
  id: bigserial('id', { mode: 'number' }).notNull(),
  attachableId: bigserial('attachable_id', { mode: 'bigint' }).notNull(),
  attachableType: attachableEnum('attachable_type').notNull(),
})

export const attachmentsRelations = relations(attachments, ({ many }) => ({
  blobs: many(blobs),
}))

export type Attachment = InferSelectModel<typeof attachments> & {
  blobs: Blob[]
}
