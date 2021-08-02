import { GetServerSideProps } from 'next'
import { ViewPost, query } from '~/components/Posts/ViewPost'
import { authenticatedRoute } from '~/utils/redirects'
import { preloadQuery } from '~/utils/apollo'

export const getServerSideProps: GetServerSideProps<
  {},
  {
    postId: string
  }
> = async (ctx) => {
  const auth = await authenticatedRoute(ctx)
  if ('redirect' in auth) {
    return auth
  }

  return preloadQuery(ctx, {
    query,
    variables: {
      id: ctx.params!.postId
    }
  })
}

export default ViewPost
