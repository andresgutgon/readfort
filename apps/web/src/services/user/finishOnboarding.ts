import { SafeUser, users } from '$/db/schema'
import Result from '$/lib/Result'
import Transaction from '$/lib/Transaction'
import { KindleCountry } from '$/lib/types'
import { eq } from 'drizzle-orm'

export default async function finishOnboarding({
  user,
  data: { name, username, kindle },
}: {
  user: SafeUser
  data: { name: string; username: string; kindle: KindleCountry }
}) {
  return Transaction.call<SafeUser>(async (trx) => {
    const result = await trx
      .db!.update(users)
      .set({ name, username, kindle })
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
