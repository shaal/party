import { GetServerSidePropsContext } from 'next'

export async function cacheRequest(context: GetServerSidePropsContext) {
  return context.res.setHeader(
    'Cache-Control',
    'private, s-maxage=10, stale-while-revalidate=59'
  )
}
