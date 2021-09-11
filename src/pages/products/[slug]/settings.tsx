import Settings, {
  PRODUCT_SETTINGS_QUERY as query
} from '~/components/Product/Settings'
import { preloadQuery } from '~/utils/apollo'
import { db } from '~/utils/prisma'
import { resolveSession } from '~/utils/sessions'

export const getServerSideProps = async (ctx: any) => {
  const session = await resolveSession(ctx)
  const product = await db.product.findUnique({
    where: { slug: ctx.params!.slug as string }
  })

  if (session?.userId !== product?.userId) {
    return {
      redirect: {
        destination: `/products/${product?.slug}`,
        permanent: false
      }
    }
  }

  return preloadQuery(ctx, { query })
}

export default Settings
