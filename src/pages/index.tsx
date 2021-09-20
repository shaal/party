import { CURRENT_USER_QUERY } from '@components/DefaultLayout'
import Landing from '@components/Landing'
import { preloadQuery } from '@utils/apollo'
import { unauthenticatedRoute } from '@utils/redirects'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const auth = await unauthenticatedRoute(context)
  if ('redirect' in auth) return auth

  return preloadQuery(context, { query: CURRENT_USER_QUERY })
}

export default Landing
