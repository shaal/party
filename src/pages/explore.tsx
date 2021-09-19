import Explore, { GET_EXPLORE_USER_QUERY as query } from '@components/Explore'
import { preloadQuery } from '@utils/apollo'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return preloadQuery(context, { query })
}

export default Explore
