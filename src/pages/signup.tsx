import Signup from '@components/Auth/Signup'
import { CURRENT_USER_QUERY } from '@components/SiteLayout'
import { preloadQuery } from '@utils/apollo'
import { cacheRequest } from '@utils/cache'
import { unauthenticatedRoute } from '@utils/redirects'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const auth = await unauthenticatedRoute(context)
  if ('redirect' in auth) return auth
  cacheRequest(context)

  return preloadQuery(context, { query: CURRENT_USER_QUERY })
}

export default Signup
