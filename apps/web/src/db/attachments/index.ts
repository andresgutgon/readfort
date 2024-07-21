import db, { type Schema } from '$/db/client'
import * as schema from '$/db/schema'
import { type Blob } from '$/db/schema'
import { AttachmentFactory } from '$/lib/attachments'

const factory = AttachmentFactory<Blob, typeof schema>({
  dbSchema: schema,
  orm: db,
})
const users = factory.build<Schema['users']>({
  table: schema['users'],
  attachments: [{ relation: 'avatar' }],
})

export default { users }
