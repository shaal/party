import ViewUser, { VIEW_USER_QUERY as query } from '~/components/User/ViewUser'
import { preloadQuery } from '~/utils/apollo'

export const getServerSideProps = async (ctx: any) => {
  const yo = await preloadQuery(ctx, {
    query,
    variables: { where: { username: ctx.params!.username } }
  })

  console.log(yo)

  return yo
}

export default ViewUser
