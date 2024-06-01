import { auth } from '$/auth'
import db from '$/db/client'
import { users } from '$/db/schema'
import { UnauthorizedError } from '$/lib/errors'
import Result from '$/lib/Result'
import { eq } from 'drizzle-orm'

export default async function getCurrentUser() {
  const session = await auth()

  if (!session) {
    return Result.error(
      new UnauthorizedError('Looks like you are not logged in!'),
    )
  }

  const allUsers = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      image: users.image,
      username: users.username,
      emailVerified: users.emailVerified,
      kindle: users.kindle,
    })
    .from(users)
    .where(eq(users.id, String(session.user?.id ?? 'no-id')))
    .limit(1)

  const user = allUsers[0]

  if (!user) {
    return Result.error(new UnauthorizedError('Session is not valid!'))
  }

  return Result.ok(user)
}
