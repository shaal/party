import ViewProduct, {
  PRODUCT_QUERY as query
} from '@components/Product/ViewProduct'
import { preloadQuery } from '@utils/apollo'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return preloadQuery(ctx, {
    query,
    variables: { slug: ctx.params!.slug }
  })
}

export default ViewProduct
