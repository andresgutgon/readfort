import { ReactNode } from 'react'

import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

const ASSETS_BASE = 'http://localhost:3006'
export default function Layout({
  children,
  title,
  previewText,
}: {
  children: ReactNode
  title: string
  previewText: string
}) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily='Roboto'
          fallbackFontFamily='Verdana'
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle='normal'
        />
      </Head>
      <Preview>{previewText}</Preview>
      <Body className='bg-white'>
        <Tailwind>
          <Container className='mx-auto px-4'>
            <Heading
              as='h1'
              className='text-gray-900 text-2xl font-bold mb-4 p-0'
            >
              {title}
            </Heading>
            {children}
            <Section>
              <Row className='pt-4'>
                <Hr className='border-gray-200 mt-8 mb-4' />
                <Img
                  src={`${ASSETS_BASE}/static/logo.png`}
                  width='32'
                  height='32'
                  alt="Readfort's Logo"
                />
                <Text className='text-base text-gray-300 mb-6'>
                  If you didn&apos;t try to login, you can safely ignore this
                  email.
                </Text>
                <Text className='text-gray-400 text-base mt-4 mb-1'>
                  <Link
                    href='https://readfort.com'
                    className='underline text-base text-gray-500'
                    target='_blank'
                  >
                    readfort.com
                  </Link>
                  &nbsp;Get the most out of your{' '}
                  <strong className='font-bold text-gray-900'>reading</strong>.
                </Text>
                <Text className='text-base text-gray-400 m-0 mb-8'>
                  Import your <strong className='text-[#FFA00A]'>Kindle</strong>{' '}
                  highlights and link them in your{' '}
                  <strong className='font-bold text-gray-900'>writings</strong>.
                </Text>
              </Row>
            </Section>
          </Container>
        </Tailwind>
      </Body>
    </Html>
  )
}
