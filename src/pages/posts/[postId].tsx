import ViewPost, { POST_QUERY as query } from 'src/components/Post/ViewPost'
import { preloadQuery } from 'src/utils/apollo'

export const getServerSideProps = async (ctx: any) => {
  return preloadQuery(ctx, {
    query,
    variables: {
      id: ctx.params!.postId
    }
  })
}

export default ViewPost
