import React from 'react'

import { Product } from '../../../__generated__/schema.generated'

interface Props {
  product: Product
}

const SelectedProduct: React.FC<Props> = ({ product }) => {
  return (
    <div className="text-sm flex items-center space-x-2 ml-auto">
      <div>Posted in</div>
      <div className="flex items-center space-x-1">
        <img
          className="h-4 w-4 rounded"
          src={product?.avatar as string}
          alt={`#${product?.slug}'s avatar'`}
        />
        <div className="font-bold text-gray-600 dark:text-gray-200">
          {product?.name}
        </div>
      </div>
    </div>
  )
}

export default SelectedProduct
