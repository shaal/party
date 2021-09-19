import Notifications, {
  NOTIFICATIONS_QUERY as query
} from '@components/Notification'
import { preloadQuery } from '@utils/apollo'
import { authenticatedRoute } from '@utils/redirects'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const auth = await authenticatedRoute(ctx)
  if ('redirect' in auth) return auth

  return preloadQuery(ctx, { query })
}

export default Notifications
