import { preloadQuery } from '~/utils/apollo'

import Home, { HOME_QUERY as query } from '../components/Home'

export const getServerSideProps = async (ctx: any) => {
  return preloadQuery(ctx, { query })
}

export default Home
