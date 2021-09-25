import ViewPost, { POST_QUERY as query } from '@components/Post/ViewPost'
import { preloadQuery } from '@utils/apollo'
import { cacheRequest } from '@utils/cache'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  cacheRequest(context)
  return preloadQuery(context, {
    query,
    variables: { id: context.params!.postId }
  })
}

export default ViewPost
