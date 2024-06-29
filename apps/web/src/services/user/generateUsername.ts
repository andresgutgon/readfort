import db from '$/db/client'
import { users } from '$/db/schema'
import Result from '$/lib/Result'
import { and, eq, ne } from 'drizzle-orm'
import slugify from 'slugify'

const MAX_ATTEMPTS = 3
const MAX_RANDOM = 4294967295

const getRandomInt = (min = 0, max = MAX_RANDOM) =>
  (Math.random() * ((max | 0) - (min | 0) + 1.0) + (min | 0)) | 0
function buildSlug({ input, random }: { input: string; random?: number }) {
  let slug = input.split('@')[0] ?? Math.random().toString(36).substring(7)
  slug = random !== undefined ? `${slug}-${random}` : slug
  return slugify(slug, { lower: true })
}

function condition({
  username,
  userId,
}: {
  username: string
  userId?: string
}) {
  if (!userId) {
    return eq(users.username, username)
  }

  return and(eq(users.username, username), ne(users.id, userId))
}

export async function findUserWithUsername({
  username,
  userId,
}: {
  username: string
  userId?: string
}) {
  return db
    .select({ id: users.id })
    .from(users)
    .where(condition({ username, userId }))
    .limit(1)
}

export default async function generateUsername({
  inputUsername,
  attempt = 0,
  userId,
}: {
  inputUsername: string
  attempt?: number
  userId?: string
}) {
  if (!inputUsername) {
    return Result.error(new Error('Username is required'))
  }
  if (attempt > MAX_ATTEMPTS) {
    return Result.error(new Error('Could not generate a unique username'))
  }

  const username = buildSlug({ input: inputUsername })

  const foundUsers = await findUserWithUsername({ username, userId })

  if (foundUsers.length === 0) return Result.ok(username)

  return generateUsername({
    inputUsername: buildSlug({
      input: inputUsername,
      random: getRandomInt(),
    }),
    attempt: attempt + 1,
  })
}
