import { render } from '@react-email/components'
import Template from '@readfort/mailers/src/user/MagicLink'
import { TypedResult } from '$/lib/Result'
import Mailer from '$/mailer/Mailer'
import Mail from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export default class MagicLinkMail extends Mailer {
  magic: string
  constructor(options: Mail.Options, { magic }: { magic: string }) {
    super(options)
    this.magic = magic
  }
  send(): Promise<TypedResult<SMTPTransport.SentMessageInfo, Error>> {
    return this.sendMail({
      to: this.options.to,
      from: this.options.from,
      subject: 'Sign in to Readfort',
      html: render(Template({ magic: this.magic })),
    })
  }
}
