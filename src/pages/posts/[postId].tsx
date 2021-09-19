import ViewPost, { POST_QUERY as query } from '@components/Post/ViewPost'
import { preloadQuery } from '@utils/apollo'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return preloadQuery(ctx, {
    query,
    variables: { id: ctx.params!.postId }
  })
}

export default ViewPost
