import SessionsSettings, {
  SESSION_SETTINGS_QUERY as query
} from '@components/User/Settings/Sessions'
import { preloadQuery } from '@utils/apollo'
import { authenticatedRoute } from '@utils/redirects'

export const getServerSideProps = async (ctx: any) => {
  const auth = await authenticatedRoute(ctx)
  if ('redirect' in auth) return auth

  return preloadQuery(ctx, { query })
}

export default SessionsSettings
