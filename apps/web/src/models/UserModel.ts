import db from '$/db/client'
import * as schema from '$/db/schema'
import { BaseModel } from '$/models/BaseModel'
import { eq } from 'drizzle-orm'

export const UserModel = new BaseModel({
  identifier: schema.users.id,
  tableName: schema.users._.name,
})

async function getFoo() {
  const user = await UserModel.findOne({
    with: { avatar: true },
    where: eq(UserModel.identifier, '1'),
  })

  const foo = await db.query.users.findFirst({
    with: { avatar: true },
    where: eq(schema.users.id, '1'),
  })

  return foo?.avatar?.contentType
}

