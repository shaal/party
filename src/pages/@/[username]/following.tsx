import Following, {
  USER_FOLLOWING_QUERY as query
} from '@components/User/Following'
import { preloadQuery } from '@utils/apollo'
import { cacheRequest } from '@utils/cache'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  cacheRequest(context)
  return preloadQuery(context, {
    query,
    variables: { username: context.params!.username }
  })
}

export default Following
