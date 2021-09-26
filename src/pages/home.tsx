import Home from '@components/Home'
import { HOME_FEED_QUERY } from '@components/Home/Feed'
import { preloadQuery } from '@utils/apollo'
import { authenticatedRoute } from '@utils/redirects'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const auth = await authenticatedRoute(context)
  if ('redirect' in auth) return auth

  return preloadQuery(context, {
    query: HOME_FEED_QUERY,
    variables: { after: null, type: 'ALL' }
  })
}

export default Home
