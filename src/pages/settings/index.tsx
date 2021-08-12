import Settings, {
  SETTINGS_QUERY as query
} from 'src/components/Profile/Settings'
import { preloadQuery } from 'src/utils/apollo'
import { authenticatedRoute } from 'src/utils/redirects'

export const getServerSideProps = async (ctx: any) => {
  const auth = await authenticatedRoute(ctx)
  if ('redirect' in auth) {
    return auth
  }

  return preloadQuery(ctx, { query })
}

export default Settings
