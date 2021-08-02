import { NextSeo } from 'next-seo'
import { Container } from '~/components/ui/Container'
import { Link } from '~/components/ui/Link'

export default function Custom404() {
  return (
    <Container title="404: Page Not Found">
      <NextSeo title="Page Not Found" />
      <div className="mb-2">This page could not be found.</div>
      <Link href="/">Go home.</Link>
    </Container>
  )
}
