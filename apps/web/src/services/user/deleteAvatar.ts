import { SafeUser, users } from '$/db/schema'
import Result from '$/lib/Result'
import Transaction from '$/lib/Transaction'
import { eq } from 'drizzle-orm'

export default async function deleteAvatar({ user }: { user: SafeUser }) {
  return Transaction.call<SafeUser>(async (trx) => {
    // TODO: Use Disk to remove the image
    //
    const result = await trx
      .db!.update(users)
      .set({ image: null })
      .where(eq(users.id, user.id))
      .returning({
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
