import Following, {
  USER_FOLLOWING_QUERY as query
} from '~/components/User/Following'
import { preloadQuery } from '~/utils/apollo'

export const getServerSideProps = async (ctx: any) => {
  if (ctx.params!.username.startsWith('@')) {
    const username = ctx.params!.username.slice(1)
    return preloadQuery(ctx, {
      query,
      variables: { username }
    })
  } else {
    return {
      notFound: true
    }
  }
}

export default Following