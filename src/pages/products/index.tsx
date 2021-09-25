import Products, { PRODUCTS_QUERY as query } from '@components/Product/Products'
import { preloadQuery } from '@utils/apollo'
import { cacheRequest } from '@utils/cache'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  cacheRequest(context)
  return preloadQuery(context, { query })
}

export default Products
