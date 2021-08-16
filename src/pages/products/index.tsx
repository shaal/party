import Products, { PRODUCTS_QUERY as query } from '../../components/Product'
import { preloadQuery } from '../../utils/apollo'

export const getServerSideProps = async (ctx: any) => {
  return preloadQuery(ctx, { query })
}

export default Products
