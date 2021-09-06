import Link from 'next/link'
import React from 'react'

import { Product } from '~/__generated__/schema.generated'

import Slug from './Slug'

interface Props {
  product: Product
}

const ProductProfileLarge: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-3 items-center">
        <img
          src={product?.avatar as string}
          className="h-16 w-16 rounded-lg bg-gray-200"
          alt={`#${product?.slug}'s avatar`}
        />
        <div>
          <div className="flex items-center gap-1.5">
            <Link href={`/products/${product?.slug}`} passHref>
              <a className="font-bold cursor-pointer">{product?.name}</a>
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
