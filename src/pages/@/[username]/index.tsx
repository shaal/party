import ViewUser, { VIEW_USER_QUERY as query } from '~/components/User/ViewUser'
import { preloadQuery } from '@utils/apollo'

export const getServerSideProps = async (ctx: any) => {
  return await preloadQuery(ctx, {
    query,
    variables: { where: { username: ctx.params!.username } }
  })
}

export default ViewUser
