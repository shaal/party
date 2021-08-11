import Profile, { PROFILE_QUERY as query } from '~/components/Profile'
import { preloadQuery } from '~/utils/apollo'

export const getServerSideProps = async (ctx: any) => {
  const test = await preloadQuery(ctx, {
    query,
    variables: {
      id: ctx.params!.username
    }
  })

  console.log(test)

  return test
}

export default Profile
