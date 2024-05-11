import SMTPTransport from 'nodemailer/lib/smtp-transport'

declare module 'nodemailer-mailgun-transport' {
  export default function mailgun<T extends unknown>(
    _o: T,
  ): SMTPTransport.Options
}
