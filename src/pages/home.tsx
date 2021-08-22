import Home, { HOME_QUERY as query } from '~/components/Home'
import { preloadQuery } from '~/utils/apollo'

export const getServerSideProps = async (ctx: any) => {
  return preloadQuery(ctx, { query })
}

export default Home
