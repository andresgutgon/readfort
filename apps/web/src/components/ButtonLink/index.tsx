import { Button as ButtonLinkPrimitive, ButtonProps } from '@readfort/ui'
import Link, { type LinkProps } from 'next/link'

type Props = ButtonProps & LinkProps & { href: string }
export default function ButtonLink({ children, href, ...rest }: Props) {
  return (
    <ButtonLinkPrimitive {...rest}>
      <Link href={href}>{children}</Link>
    </ButtonLinkPrimitive>
  )
}
