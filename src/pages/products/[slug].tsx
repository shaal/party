import Product, {
  PRODUCT_QUERY as query
} from '../../components/Products/Product'
import { preloadQuery } from '../../utils/apollo'

export const getServerSideProps = async (ctx: any) => {
  return preloadQuery(ctx, {
    query,
    variables: {
      slug: ctx.params!.slug
    }
  })
}

export default Product
