'use server'

import { authProcedure } from '$/actions/procedures'
import { updateSession } from '$/auth'
import deleteAvatar from '$/services/user/deleteAvatar'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const input = z.object({ currentRoute: z.string() })
export const deleteAvatarAction = authProcedure
  .createServerAction()
  .input(input)
  .handler(async ({ input, ctx: { user } }) => {
    const result = await deleteAvatar({ user })
    const value = result.unwrap()

    await updateSession({ user: { image: value.image, avatarRemoved: true } })

    revalidatePath(input.currentRoute)
  })
