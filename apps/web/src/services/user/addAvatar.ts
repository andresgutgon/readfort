import path from 'path'

import { SafeUser, users } from '$/db/schema'
import disk from '$/lib/disk'
import Result from '$/lib/Result'
import Transaction from '$/lib/Transaction'
import { eq } from 'drizzle-orm'

export default async function addAvatar({
  user,
  file,
}: {
  user: SafeUser
  file: File
}) {
  const extension = path.extname(file.name)
  const imageName = `users/${user.id}/avatars/avatar${extension}`
  const diskResult = await disk.putFile(imageName, file)

  if (diskResult.error) return diskResult

  return Transaction.call<SafeUser>(async (trx) => {
    const result = await trx
      .db!.update(users)
      .set({ image: imageName })
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
