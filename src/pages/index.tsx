import Home, { HOME_QUERY as query } from 'src/components/Home'
import { preloadQuery } from 'src/utils/apollo'

export const getServerSideProps = async (ctx: any) => {
  return preloadQuery(ctx, { query })
}

export default Home
