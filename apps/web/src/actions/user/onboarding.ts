'use server'

import { authProcedure } from '$/actions/procedures'
import { updateSession } from '$/auth'
import { ROUTES } from '$/lib/routes'
import { KindleCountry } from '$/lib/types'
import finishOnboarding from '$/services/user/finishOnboarding'
import { findUserWithUsername } from '$/services/user/generateUsername'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const KINDLE = z.nativeEnum(KindleCountry, { message: 'Select a country' })
export const onboarding = authProcedure
  .createServerAction({ persistedDataWhenError: true })
  .output(z.object({ name: z.string(), username: z.string(), kindle: KINDLE }))
  .input(
    async ({ ctx }) => {
      return z.object({
        name: z.string().min(3),
        kindle: KINDLE,
        username: z
          .string()
          .min(3, { message: 'Username must be at least 3 characters long.' })
          .max(20, { message: 'Username cannot be longer than 20 characters.' })
          .regex(/^[a-zA-Z0-9_\-.]*$/, {
            message:
              'Invalid characters in username. Only leters, numbers and "-" without spaces. No accents.',
          })
          .refine(
            async (username) => {
              return (
                (
                  await findUserWithUsername({
                    username,
                    userId: ctx.user.id,
                  })
                ).length === 0
              )
            },
            { message: 'Username is already taken.' },
          ),
      })
    },
    { type: 'formData' },
  )
  .handler(async ({ input, ctx: { user } }) => {
    const result = await finishOnboarding({ user, data: input })
    const value = result.unwrap()

    // NOTE: This ends in JWT callback in auth/index.ts
    await updateSession({
      user: {
        name: value.name,
        username: value.username,
        kindle: value.kindle,
      },
    })

    redirect(ROUTES.dashboard.root)
  })
