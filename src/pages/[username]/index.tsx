import { GetServerSideProps } from 'next'
import { Profile, query } from '@components/Profile'
import { preloadQuery } from '@utils/apollo'

export const getServerSideProps: GetServerSideProps<
  {},
  {
    username: string
  }
> = async (ctx) => {
  return preloadQuery(ctx, {
    query,
    variables: {
      id: ctx.params!.username
    }
  })
}

export default Profile
