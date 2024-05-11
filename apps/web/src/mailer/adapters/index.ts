import { type Transporter, type TransportOptions } from 'nodemailer'
import HTMLToText from 'nodemailer-html-to-text'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

import createMailgunTransport from './mailgun'
import createMailpitTransport from './mailpit'

const htmlToText = HTMLToText.htmlToText

export type MailerOptions = {
  transportOptions: TransportOptions
}
type MaybeTransport = Transporter<SMTPTransport.SentMessageInfo> | null
function createAdapter() {
  const options = {
    transportOptions: { component: 'readfort_mailer' },
  }
  const isPro = process.env.NODE_ENV === 'production'
  const mailgun = createMailgunTransport(options)

  const mailpit = createMailpitTransport(options)

  const transporter: MaybeTransport = isPro ? mailgun : mailpit

  if (!transporter) {
    throw new Error('Mailgun credentials are missing')
  }

  // Middleware to convert HTML to text
  transporter.use('compile', htmlToText())

  return transporter
}

const adapter = createAdapter()

export default adapter
