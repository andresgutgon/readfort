import { AUTH_MAX_AGE } from '$/auth/constants'
import { isCompleted } from '$/auth/utils'
import env from '$/env'
import { pageUrl, ROUTES } from '$/lib/routes'
import NextAuth from 'next-auth'
import { getToken } from 'next-auth/jwt'
import Google from 'next-auth/providers/google'
import { NextRequest, NextResponse } from 'next/server'

/*
 * Fake auth middleware to make middleware.ts work
 * in an Edge environment where not Node.js is available
 * like Vercel Edge Network or Cloudflare Workers
 * Some examples are node:crypto
 */
const { auth } = NextAuth({
  session: { strategy: 'jwt', maxAge: AUTH_MAX_AGE },
  secret: env.AUTH_SECRET,
  providers: [Google],
})

async function getUserFromSession({ req }: { req: NextRequest }) {
  const session = await auth()

  if (!session) return { token: null, completed: false }

  const token = await getToken({
    secureCookie: true, // http(s)
    req,
    secret: env.AUTH_SECRET,
    salt: '__Secure-authjs.session-token',
  })

  const completed = isCompleted(token)

  return { token, completed }
}

export default async function (req: NextRequest) {
  const path = new URL(req.url).pathname
  const user = await getUserFromSession({ req })

  if (user?.completed && path.startsWith(ROUTES.signin.finish)) {
    return NextResponse.redirect(pageUrl({ path: ROUTES.dashboard.root }))
  }

  if (!path.startsWith('/dashboard')) {
    return NextResponse.next()
  }

  const redirect = !user.token
    ? ROUTES.signin.root
    : !user.completed
      ? ROUTES.signin.finish
      : null
  if (redirect) {
    return NextResponse.redirect(pageUrl({ path: redirect }))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
