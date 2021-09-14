import Followers, {
  USER_FOLLOWERS_QUERY as query
} from '~/components/User/Followers'
import { preloadQuery } from '~/utils/apollo'

export const getServerSideProps = async (ctx: any) => {
  return preloadQuery(ctx, {
    query,
    variables: { where: { username: ctx.params!.username } }
  })
}

export default Followers
