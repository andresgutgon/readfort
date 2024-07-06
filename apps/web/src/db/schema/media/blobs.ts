import { timestamps } from '$/db/schema/schemaHelpers'
import { InferSelectModel } from 'drizzle-orm'
import {
  bigserial,
  index,
  numeric,
  pgTable,
  varchar,
} from 'drizzle-orm/pg-core'

export const blobs = pgTable(
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

export type Blob = InferSelectModel<typeof blobs>
