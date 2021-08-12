import Profile, { PROFILE_QUERY as query } from 'src/components/Profile'
import { preloadQuery } from 'src/utils/apollo'

export const getServerSideProps = async (ctx: any) => {
  return preloadQuery(ctx, {
    query,
    variables: {
      username: ctx.params!.username
    }
  })
}

export default Profile
