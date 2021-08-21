import { preloadQuery } from '@utils/apollo'

import Products, {
  PRODUCTS_QUERY as query
} from '../../components/Product/Products'

export const getServerSideProps = async (ctx: any) => {
  return preloadQuery(ctx, { query })
}

export default Products
