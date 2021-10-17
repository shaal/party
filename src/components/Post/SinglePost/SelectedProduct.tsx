import { Tooltip } from '@components/ui/Tooltip'
import { imagekitURL } from '@components/utils/imagekitURL'
import { CubeIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import React from 'react'
import { Product } from 'src/__generated__/schema.generated'

interface Props {
  product: Product
}

const SelectedProduct: React.FC<Props> = ({ product }) => {
  return (
    <div className="text-sm flex items-center space-x-2">
      <Tooltip content="Product">
        <CubeIcon className="h-4 w-4 text-gray-500" />
      </Tooltip>
      <Link href={`/products/${product?.slug}`}>
        <a
          href={`/products/${product?.slug}`}
          className="flex items-center space-x-1 cursor-pointer"
        >
          <img
            className="h-4 w-4 rounded"
            src={imagekitURL(product?.avatar as string, 50, 50)}
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
