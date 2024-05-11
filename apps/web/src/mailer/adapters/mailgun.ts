import env from '$/env'
import { type MailerOptions } from '$/mailer/adapters'
import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export type MailgunResponse = {
  status: number
  message: string
  messageId: string
}
export default function createMailgunTransport({
  transportOptions,
}: MailerOptions) {
  const domain = env.MAILGUN_DOMAIN
  const apiKey = env.MAILGUN_API_KEY

  if (!domain || !apiKey) return null

  const transport = mg({ auth: { domain, apiKey } })
  return nodemailer.createTransport<SMTPTransport.SentMessageInfo>(
    transport,
    transportOptions,
  )
}
