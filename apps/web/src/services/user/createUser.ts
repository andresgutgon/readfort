import { SafeUser, users } from '$/db/schema'
import Result from '$/lib/Result'
import Transaction from '$/lib/Transaction'

export type CreateUserColumns = Pick<
  typeof users.$inferInsert,
  | 'name'
  | 'username'
  | 'kindle'
  | 'email'
  | 'image'
  | 'emailVerified'
  | 'avatarId'
>

export async function createUser({ data }: { data: CreateUserColumns }) {
  return Transaction.call<SafeUser>(async (trx) => {
    const result = await trx.db!.insert(users).values(data).returning({
      id: users.id,
      name: users.name,
      username: users.username,
      email: users.email,
      image: users.image,
      kindle: users.kindle,
      emailVerified: users.emailVerified,
    })

    return Result.ok(result[0]!)
  })
}
