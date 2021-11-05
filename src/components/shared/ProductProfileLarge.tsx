import { imagekitURL } from '@components/utils/imagekitURL'
import { Product } from '@graphql/types.generated'
import Link from 'next/link'
import React from 'react'

import Slug from './Slug'

interface Props {
  product: Product
}

const ProductProfileLarge: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-3 items-center">
        <img
          src={imagekitURL(product?.avatar as string, 100, 100)}
          className="h-16 w-16 rounded-lg bg-gray-200"
          alt={`#${product?.slug}`}
        />
        <div>
          <div className="flex items-center gap-1.5">
            <Link href={`/products/${product?.slug}`}>
              <a
                href={`/products/${product?.slug}`}
                className="font-bold cursor-pointer"
              >
                {product?.name}
              </a>
            </Link>
          </div>
          <Slug slug={product?.slug} />
          {product?.description && (
            <div className="mt-2 text-gray-600 dark:text-gray-300">
              {product?.description}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductProfileLarge
