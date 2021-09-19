import StaffToolsDashboard, {
  STAFF_TOOLS_DASHBOARD_QUERY as query
} from '@components/StaffTools'
import { preloadQuery } from '@utils/apollo'
import { staffRoute } from '@utils/redirects'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const staff = await staffRoute(context)
  if ('redirect' in staff) return staff

  return preloadQuery(context, { query })
}

export default StaffToolsDashboard
