import ViewUser, { VIEW_USER_QUERY as query } from '@components/User/ViewUser'
import { preloadQuery } from '@utils/apollo'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return preloadQuery(context, {
    query,
    variables: { username: context.params!.username }
  })
}

export default ViewUser
