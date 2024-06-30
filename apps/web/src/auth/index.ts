import 'next-auth/jwt'

import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { AUTH_MAX_AGE, BETA_LIST_EMAILS } from '$/auth/constants'
import { signinLink } from '$/auth/signinLinkAction'
import { AppUser, isCompleted } from '$/auth/utils'
import db from '$/db/client'
import { accounts, users, verificationTokens } from '$/db/schema'
import env from '$/env'
import { ROUTES } from '$/lib/routes'
import MagicLinkMail from '$/mailer/mailers/user/MagicLinkMail'
import generateUsername from '$/services/user/generateUsername'
import NextAuth, { type DefaultSession, type NextAuthConfig } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import type { Provider } from 'next-auth/providers'
import Google from 'next-auth/providers/google'
import Nodemailer from 'next-auth/providers/nodemailer'

declare module 'next-auth/jwt' {
  interface JWT extends AppUser {
    accessToken?: string
  }
}

declare module 'next-auth' {
  interface User extends AppUser {}
  interface Session {
    id: string
    accessToken?: string
    user: AppUser & DefaultSession['user']
  }
}

async function assignUsernameToToken(
  token: JWT,
  { username, userId }: { username: string; userId: string },
) {
  if (token.username === username) return token

  const resultUsernameUpdate = await generateUsername({
    inputUsername: username,
    userId,
  })
  token.username = resultUsernameUpdate.unwrap()

  return token
}

const providers: Provider[] = [
  Google,
  Nodemailer({
    server: MagicLinkMail.adapterOptions,
    from: MagicLinkMail.from,
    sendVerificationRequest: async (params) => {
      const { identifier, url, provider } = params
      const mail = new MagicLinkMail(
        {
          to: identifier,
          from: provider.from,
        },
        { magic: url },
      )
      const result = await mail.send()

      result.unwrap()
    },
  }),
]
export type ProviderItem = { id: string; name: string }
export const providerMap: ProviderItem[] = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider()
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})

const DBAdapter = DrizzleAdapter(db, {
  usersTable: users,
  accountsTable: accounts,
  verificationTokensTable: verificationTokens,
})

const ENABLE_DEBUG = false
const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: updateSession,
} = NextAuth({
  debug: process.env.NODE_ENV !== 'production' ? ENABLE_DEBUG : false,
  pages: {
    signIn: ROUTES.signin.root,
    verifyRequest: ROUTES.signin.verify,
    error: ROUTES.signin.error,
    newUser: ROUTES.signin.finish,
  },
  secret: env.AUTH_SECRET,
  session: { strategy: 'jwt', maxAge: AUTH_MAX_AGE },
  providers,
  adapter: {
    ...DBAdapter,
    createUser: async (user) => {
      const username = (
        await generateUsername({ inputUsername: user.email })
      ).unwrap()
      user.username = username
      return DBAdapter.createUser!(user)
    },
  },
  callbacks: {
    signIn: async ({ email, user, profile }) => {
      if (process.env.NODE_ENV === 'development') return true

      let personEmail: string | undefined

      if (profile?.email) {
        personEmail = profile?.email
      } else if (email?.verificationRequest) {
        // AdapterUser email should be always defined
        personEmail = user?.email!
      }

      return BETA_LIST_EMAILS.includes(personEmail!)
    },
    async jwt({ token, session, user }) {
      if (user?.id) {
        token.id = user.id
      }
      const name = session?.user?.name ?? user?.name
      if (name) token.name = name

      const image = session?.user?.image ?? user?.image
      const imageRemoved = session?.user?.avatarRemoved
      if (image) {
        token.image = image
      } else if (imageRemoved) {
        token.image = null
      }

      const kindle = session?.user?.kindle ?? user?.kindle
      if (kindle) token.kindle = kindle

      const username = user?.username ?? session?.user?.username
      const userId = user?.id ?? token.id ?? session?.user?.id

      if (username) {
        token = await assignUsernameToToken(token, {
          username,
          userId,
        })
      }

      token.hasCompletedOnboarding = isCompleted(token)
      return token
    },
    // Session is used to read token info in the frontend.
    session({ session, token }) {
      session.user.id = token.id
      session.user.name = token.name
      session.user.image = token.image
      session.user.username = token.username
      session.user.kindle = token.kindle
      session.user.hasCompletedOnboarding = isCompleted(token)
      return session
    },
  },
} satisfies NextAuthConfig)

export { handlers, signinLink, signIn, signOut, auth, updateSession }
