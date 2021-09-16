import { gql, useQuery } from '@apollo/client'
import AppContext from '@components/utils/AppContext'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { Fragment, useState } from 'react'
import { useContext } from 'react'
import { Product } from 'src/__generated__/schema.generated'

import { SelectProductQuery } from './__generated__/SelectProduct.generated'

export const SELECT_PRODUCT_QUERY = gql`
  query SelectProductQuery($username: ID!) {
    user(username: $username) {
      ownedProducts {
        edges {
          node {
            id
            name
            slug
            avatar
          }
        }
      }
    }
  }
`

interface Props {
  setSelectedProduct: any
}

const SelectProduct: React.FC<Props> = ({ setSelectedProduct }) => {
  const [product, setProduct] = useState<Product | null>()
  const { currentUser } = useContext(AppContext)
  const { data } = useQuery<SelectProductQuery>(SELECT_PRODUCT_QUERY, {
    variables: { username: currentUser?.username }
  })
  const products = data?.user?.ownedProducts?.edges?.map((edge) => edge?.node)

  const handleSelectProduct = (product: Product) => {
    setProduct(product)
    setSelectedProduct(product?.id)
  }

  return (
    <Listbox value={product} onChange={handleSelectProduct}>
      {({ open }) => (
        <div className="">
          <Listbox.Button className="flex items-center justify-between bg-white dark:bg-gray-900 relative w-full border border-gray-300 dark:border-gray-800 rounded-lg px-3 py-0.5 cursor-default focus:outline-none text-sm">
            <span className="w-16 block truncate dark:text-gray-400 flex-1 text-left font-medium">
              {product ? product?.name : 'Product'}
            </span>
            <ChevronDownIcon className="h-4 w-4" />
          </Listbox.Button>

          <Transition show={open} as={Fragment}>
            <Listbox.Options
              static
              className="z-10 absolute mt-1 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md rounded-lg py-1 px-2 text-base focus:outline-none sm:text-sm"
            >
              {products?.map((product: any) => (
                <Listbox.Option
                  key={product?.id}
                  className={({ active }) =>
                    clsx(
                      { 'bg-gray-100 dark:bg-gray-800': active },
                      'block px-3 py-1.5 my-1 text-sm text-gray-700 dark:text-gray-200 rounded-lg cursor-pointer'
                    )
                  }
                  value={product}
                >
                  <div className="flex items-center gap-2">
                    <img
                      className="h-5 w-5 rounded-md"
                      src={product?.avatar}
                      alt={`#${product?.slug}'s avatar`}
                    />
                    <div className="block truncate font-medium">
                      {product?.name}
                    </div>
                  </div>
                </Listbox.Option>
              ))}
              <Listbox.Option
                className={({ active }) =>
                  clsx(
                    { 'bg-gray-100 dark:bg-gray-800': active },
                    'block px-3 py-1.5 my-1 text-sm text-red-500 rounded-lg cursor-pointer'
                  )
                }
                value={null}
              >
                <span className="block truncate font-medium">Reset</span>
              </Listbox.Option>
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}

export default SelectProduct
