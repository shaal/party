import Products, { PRODUCTS_QUERY as query } from '@components/Product/Products'
import { preloadQuery } from '@utils/apollo'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return preloadQuery(context, { query })
}

export default Products
