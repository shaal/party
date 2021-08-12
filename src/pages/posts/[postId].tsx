import ViewPost, { POST_QUERY as query } from '../../components/Posts/ViewPost'
import { preloadQuery } from '../../utils/apollo'

export const getServerSideProps = async (ctx: any) => {
  return preloadQuery(ctx, {
    query,
    variables: {
      id: ctx.params!.postId
    }
  })
}

export default ViewPost
