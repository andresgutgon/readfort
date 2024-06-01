import getCurrentUser from '$/services/user/getCurrentUser'
import { createServerActionProcedure } from 'zsa'

/**
 * Procedures allow you to add additional context to a set of server actions,
 * such as the userId of the caller.
 * Docs: https://zsa.vercel.app/docs/procedures
 */
export const authProcedure = createServerActionProcedure().handler(async () => {
  const user = (await getCurrentUser()).unwrap()
  return { user }
})
