import Explore, { EXPLORE_QUERY as query } from '~/components/Explore'
import { preloadQuery } from '@utils/apollo'

export const getServerSideProps = async (ctx: any) => {
  return preloadQuery(ctx, { query })
}

export default Explore
