import { GetServerSidePropsContext } from 'next'

/**
 * Add cache requests to the HTTP response
 * @param context - Next.js server side props context
 * @returns add cache header to the requests
 */
export async function cacheRequest(context: GetServerSidePropsContext) {
  return context.res.setHeader(
    'Cache-Control',
    'private, s-maxage=10, stale-while-revalidate=59'
  )
}
