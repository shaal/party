import Settings, {
  PRODUCT_SETTINGS_QUERY as query
} from '@components/Product/Settings'
import { preloadQuery } from '@utils/apollo'
import { cacheRequest } from '@utils/cache'
import { db } from '@utils/prisma'
import { resolveSession } from '@utils/sessions'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await resolveSession(context)
  const product = await db.product.findUnique({
    where: { slug: context.params!.slug as string }
  })

  if (session?.userId !== product?.ownerId) {
    return {
      redirect: {
        destination: `/products/${product?.slug}`,
        permanent: false
      }
    }
  }
  cacheRequest(context)

  return preloadQuery(context, { query })
}

export default Settings
