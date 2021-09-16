import ViewProduct, {
  PRODUCT_QUERY as query
} from '~/components/Product/ViewProduct'
import { preloadQuery } from '@utils/apollo'

export const getServerSideProps = async (ctx: any) => {
  return preloadQuery(ctx, {
    query,
    variables: { where: { slug: ctx.params!.slug } }
  })
}

export default ViewProduct
