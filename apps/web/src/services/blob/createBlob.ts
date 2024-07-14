import { blobs, type Blob } from '$/db/schema'
import Result from '$/lib/Result'
import Transaction from '$/lib/Transaction'

export type CreateBlobColumns = Pick<
  typeof blobs.$inferInsert,
  'key' | 'contentType' | 'contentLength' | 'etag'
>

export async function createBlob({ data }: { data: CreateBlobColumns }) {
  return Transaction.call<Blob>(async (trx) => {
    const result = await trx
      .db!.insert(blobs)
      .values({
        etag: data.etag,
        key: data.key,
        contentType: data.contentType,
        contentLength: data.contentLength,
      })
      .returning({
        id: blobs.id,
        key: blobs.key,
        etag: blobs.etag,
        contentLength: blobs.contentLength,
        contentType: blobs.contentType,
        createdAt: blobs.createdAt,
        updatedAt: blobs.updatedAt,
      })

    return Result.ok(result[0]!)
  })
}
