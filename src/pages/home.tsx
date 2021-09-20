import { CURRENT_USER_QUERY } from '@components/DefaultLayout'
import Home from '@components/Home'
import { preloadQuery } from '@utils/apollo'
import { authenticatedRoute } from '@utils/redirects'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const auth = await authenticatedRoute(context)
  if ('redirect' in auth) return auth

  return preloadQuery(context, { query: CURRENT_USER_QUERY })
}

export default Home
