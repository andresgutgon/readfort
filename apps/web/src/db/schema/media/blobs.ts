import readfort from '$/db/schema/dbSchema'
import { timestamps } from '$/db/schema/schemaHelpers'
import { InferSelectModel, relations } from 'drizzle-orm'
import { bigserial, index, numeric, varchar } from 'drizzle-orm/pg-core'

export const blobs = readfort.table(
  'blobs',
  {
    id: bigserial('id', { mode: 'bigint' }).notNull().primaryKey(),
    key: varchar('key', { length: 256 }).notNull(),
    contentType: varchar('content_type', { length: 256 }).notNull(),
    contentLength: numeric('content_length').notNull(),
    etag: varchar('etag', { length: 256 }).notNull(),
    ...timestamps(),
  },
  (blobs) => ({
    blobKeyIdx: index('blob_key_idx').on(blobs.key),
  }),
)
export const blobsRelations = relations(blobs, () => ({}))

export type Blob = InferSelectModel<typeof blobs>
