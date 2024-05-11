import { Link } from '@react-email/components'

import Layout from '../_components/Layout'

type Props = {
  magic?: string
}
export default function MagicLink({ magic }: Props) {
  return (
    <Layout title='Login' previewText='Log in with this magic link'>
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
} as Props
