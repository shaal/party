import StaffToolsUsers, {
  STAFF_TOOLS_USERS_QUERY as query
} from '@components/StaffTools/Users'
import { preloadQuery } from '@utils/apollo'
import { staffRoute } from '@utils/redirects'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const staff = await staffRoute(context)
  if ('redirect' in staff) {
    return staff
  }

  return preloadQuery(context, { query })
}

export default StaffToolsUsers
