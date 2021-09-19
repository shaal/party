import ViewUser, { VIEW_USER_QUERY as query } from '@components/User/ViewUser'
import { preloadQuery } from '@utils/apollo'

export const getServerSideProps = async (ctx: any) => {
  return preloadQuery(ctx, {
    query,
    variables: { username: ctx.params!.username }
  })
}

export default ViewUser
