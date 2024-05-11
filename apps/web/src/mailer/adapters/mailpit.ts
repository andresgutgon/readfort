import { type MailerOptions } from '$/mailer/adapters'
import nodemailer from 'nodemailer'

export default function createMailtrapTransport({
  transportOptions,
}: MailerOptions) {
  return nodemailer.createTransport(
    {
      port: 1025,
      auth: {
        user: 'readfort',
        pass: 'secret',
      },
    },
    transportOptions,
  )
}
