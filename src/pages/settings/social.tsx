import SocialSettings, {
  SOCIAL_SETTINGS_QUERY as query
} from '@components/User/Settings/Social'
import { preloadQuery } from '@utils/apollo'
import { authenticatedRoute } from '@utils/redirects'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const auth = await authenticatedRoute(ctx)
  if ('redirect' in auth) return auth

  return preloadQuery(ctx, { query })
}

export default SocialSettings
