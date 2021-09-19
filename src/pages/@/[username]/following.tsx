import Following, {
  USER_FOLLOWING_QUERY as query
} from '@components/User/Following'
import { preloadQuery } from '@utils/apollo'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return preloadQuery(ctx, {
    query,
    variables: { username: ctx.params!.username }
  })
}

export default Following
