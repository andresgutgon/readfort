'use server'

import { authProcedure } from '$/actions/procedures'
import { updateSession } from '$/auth'
import addAvatar from '$/services/user/addAvatar'
import { z } from 'zod'

const MAX_UPLOAD_SIZE = 400 * 1024 // 400kb
const ACCEPTED_FILE_TYPES = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif',
]

const input = z.object({
  currentRoute: z.string(),
  file: z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE
    }, 'Your avatar must be less than 400kb')
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type)
    }, 'Your avatar must be a PNG, JPEG, or GIF image'),
})

export const addAvatarAction = authProcedure
  .createServerAction()
  .input(input, { type: 'formData' })
  .output(z.string())
  .handler(async ({ input, ctx: { user } }) => {
    const result = await addAvatar({ user, file: input.file })
    const value = result.unwrap()

    await updateSession({ user: { image: value.image } })

    return value.image!
  })
