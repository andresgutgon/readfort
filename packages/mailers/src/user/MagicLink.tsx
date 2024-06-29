import { Link } from '@react-email/components'

import Layout, { type Env } from '../_components/Layout'

type Props = {
  magic?: string
  env: Env
}
export default function MagicLink({ env, magic }: Props) {
  return (
    <Layout env={env} title='Login' previewText='Log in with this magic link'>
      <Link
        href={magic}
        target='_blank'
        className='text-blue-500 font-medium text-normal mb-4 underline'
      >
        Click here to log in
      </Link>
    </Layout>
  )
}

MagicLink.PreviewProps = {
  magic: 'https://example.com/fake-magic-link',
  env: 'development',
} as Props
