import Notifications, {
  NOTIFICATIONS_QUERY as query
} from '~/components/Notification'
import { preloadQuery } from '~/utils/apollo'
import { authenticatedRoute } from '~/utils/redirects'

export const getServerSideProps = async (ctx: any) => {
  const auth = await authenticatedRoute(ctx)
  if ('redirect' in auth) {
    return auth
  }

  return preloadQuery(ctx, { query })
}

export default Notifications
