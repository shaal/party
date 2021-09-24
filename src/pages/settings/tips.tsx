import TipsSettings, {
  TIPS_SETTINGS_QUERY as query
} from '@components/User/Settings/Tips'
import { preloadQuery } from '@utils/apollo'
import { authenticatedRoute } from '@utils/redirects'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const auth = await authenticatedRoute(context)
  if ('redirect' in auth) return auth

  return preloadQuery(context, { query })
}

export default TipsSettings
