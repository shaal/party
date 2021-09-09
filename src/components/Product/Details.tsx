import Linkify from 'linkifyjs/react'
import Link from 'next/link'
import { Fragment, useContext } from 'react'

import { Product } from '~/__generated__/schema.generated'
import { Button } from '~/components/ui/Button'
import AppContext from '~/components/utils/AppContext'

import ProductMod from './Mod'

interface Props {
  product: Product
}

const Details: React.FC<Props> = ({ product }) => {
  const { currentUser, staffMode } = useContext(AppContext)

  return (
    <Fragment>
      <div className="px-5 sm:px-0 space-y-5">
        <img
          src={product?.avatar as string}
          className="rounded-lg h-28 w-28 sm:h-40 sm:w-40 ring-8 ring-gray-50 dark:ring-black"
          alt={`#${product?.slug}'s avatar`}
        />
        <div>
          <div className="text-2xl font-bold flex items-center gap-1.5">
            {product?.name}
          </div>
          <div className="text-xl">{product?.slug}</div>
        </div>
        {currentUser?.id !== product?.user?.id ? (
          <div>Follow</div>
        ) : (
          <Link href={`/products/${product?.slug}/settings`} passHref>
            <Button size="md" variant="success">
              Edit Product
            </Button>
          </Link>
        )}
        {product?.description && (
          <div className="linkify">
            <Linkify>{product?.description}</Linkify>
          </div>
        )}
      </div>
      {currentUser?.isStaff && staffMode && <ProductMod product={product} />}
    </Fragment>
  )
}

export default Details
