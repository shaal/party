import Link from 'next/link'
import React from 'react'

import { Product } from '~/__generated__/schema.generated'

interface Props {
  product: Product
}

const SelectedProduct: React.FC<Props> = ({ product }) => {
  return (
    <div className="text-sm flex items-center space-x-2 ml-auto">
      <div>Posted in</div>
      <Link href={`/products/${product?.slug}`} passHref>
        <a className="flex items-center space-x-1 cursor-pointer">
          <img
            className="h-4 w-4 rounded"
            src={product?.avatar as string}
            alt={`#${product?.slug}'s avatar'`}
          />
          <div className="font-bold text-gray-600 dark:text-gray-200">
            {product?.name}
          </div>
        </a>
      </Link>
    </div>
  )
}

export default SelectedProduct
