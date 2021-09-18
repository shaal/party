import Following, {
  USER_FOLLOWING_QUERY as query
} from '@components/User/Following'
import { preloadQuery } from '@utils/apollo'

export const getServerSideProps = async (ctx: any) => {
  return preloadQuery(ctx, {
    query,
    variables: { username: ctx.params!.username }
  })
}

export default Following
