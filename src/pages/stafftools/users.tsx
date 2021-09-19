import StaffToolsUsers, {
  STAFF_TOOLS_USERS_QUERY as query
} from '@components/StaffTools/Users'
import { preloadQuery } from '@utils/apollo'
import { staffRoute } from '@utils/redirects'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const staff = await staffRoute(ctx)
  if ('redirect' in staff) {
    return staff
  }

  return preloadQuery(ctx, { query })
}

export default StaffToolsUsers
