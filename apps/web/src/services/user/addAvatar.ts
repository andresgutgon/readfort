import path from 'path'
import { SafeUser, users } from '$/db/schema'
import Result from '$/lib/Result'
import Transaction from '$/lib/Transaction'
import disk from '$/lib/disk'
import { eq } from 'drizzle-orm'

export function generateAvatarUrl (user: SafeUser) {
  return `users/${user.id}/avatar`
}

export default async function addAvatar({
  user,
  file
}: {
  user: SafeUser
  file: File
}) {
  const extension = path.extname(file.name)
  const image = `${generateAvatarUrl(user)}/avatar.${extension}`
  const diskResult = await disk.putFile(image, file)

  if (diskResult.error) return diskResult

  return Transaction.call<SafeUser>(async (trx) => {
    const result = await trx
      .db!.update(users)
      .set({ image })
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
