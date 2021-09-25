import Explore from '@components/Explore'
import { EXPLORE_FEED_QUERY } from '@components/Explore/Feed'
import { preloadQuery } from '@utils/apollo'
import { cacheRequest } from '@utils/cache'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  cacheRequest(context)
  return preloadQuery(context, {
    query: EXPLORE_FEED_QUERY,
    variables: { after: null }
  })
}

export default Explore
