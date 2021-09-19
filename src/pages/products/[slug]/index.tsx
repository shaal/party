import ViewProduct, {
  PRODUCT_QUERY as query
} from '@components/Product/ViewProduct'
import { preloadQuery } from '@utils/apollo'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return preloadQuery(context, {
    query,
    variables: { slug: context.params!.slug }
  })
}

export default ViewProduct
