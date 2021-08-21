import { preloadQuery } from '@utils/apollo'

import ViewProduct, {
  PRODUCT_QUERY as query
} from '../../components/Product/ViewProduct'

export const getServerSideProps = async (ctx: any) => {
  return preloadQuery(ctx, {
    query,
    variables: {
      slug: ctx.params!.slug
    }
  })
}

export default ViewProduct
