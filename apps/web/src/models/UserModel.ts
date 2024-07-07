import * as schema from '$/db/schema'
import { BaseModel } from '$/models/BaseModel'
import { eq } from 'drizzle-orm'

export const UserModel = new BaseModel({
  identifier: schema.users.id,
  tableName: schema.users._.name,
})

const user = await UserModel.find({
  with: {
    avatar: {
      columns: { key: true },
    },
  },
  where: eq(schema.users.id, '1'),
})

user?.emailVerified
