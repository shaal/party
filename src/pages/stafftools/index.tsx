import StaffToolsDashboard, {
  STAFF_TOOLS_DASHBOARD_QUERY as query
} from '@components/StaffTools'
import { preloadQuery } from '@utils/apollo'
import { staffRoute } from '@utils/redirects'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const staff = await staffRoute(ctx)
  if ('redirect' in staff) return staff

  return preloadQuery(ctx, { query })
}

export default StaffToolsDashboard
