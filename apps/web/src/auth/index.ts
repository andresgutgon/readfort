import 'next-auth/jwt'

import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { signinLink } from '$/auth/signinLinkAction'
import db from '$/db/client'
import { accounts, users, verificationTokens } from '$/db/schema'
import env from '$/env'
import MagicLinkMail from '$/mailer/mailers/user/MagicLinkMail'
import NextAuth, { type NextAuthConfig } from 'next-auth'
import type { Provider } from 'next-auth/providers'
import Google from 'next-auth/providers/google'
import Nodemailer from 'next-auth/providers/nodemailer'

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
  }
}

declare module 'next-auth' {
  interface Session {
    accessToken?: string
  }
}

export const SIGNIN_URL = '/signin'
export const SIGNIN_VERIFY_URL = `${SIGNIN_URL}/verify`
export const SIGNIN_ERROR_URL = `${SIGNIN_URL}/error`
export const BETA_LIST_EMAILS = env.BETA_LIST_EMAILS.split(',')
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

const { handlers, signIn, signOut, auth } = NextAuth({
  debug: process.env.NODE_ENV !== 'production' ? true : false,
  pages: {
    signIn: SIGNIN_URL,
    verifyRequest: SIGNIN_VERIFY_URL,
    error: SIGNIN_ERROR_URL,
  },
  secret: env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  providers,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    verificationTokensTable: verificationTokens,
  }),
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
  },
} satisfies NextAuthConfig)

export { handlers, signinLink, signIn, signOut, auth }
