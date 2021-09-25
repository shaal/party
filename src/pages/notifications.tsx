import Notifications, { NOTIFICATIONS_QUERY } from '@components/Notification'
import { preloadQuery } from '@utils/apollo'
import { cacheRequest } from '@utils/cache'
import { authenticatedRoute } from '@utils/redirects'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const auth = await authenticatedRoute(context)
  if ('redirect' in auth) return auth
  cacheRequest(context)

  return preloadQuery(context, {
    query: NOTIFICATIONS_QUERY,
    variables: { after: null, isRead: false }
  })
}

export default Notifications
