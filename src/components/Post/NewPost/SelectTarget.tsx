import { gql, useQuery } from '@apollo/client'
import AppContext from '@components/utils/AppContext'
import { Popover, Transition } from '@headlessui/react'
import { GlobeIcon } from '@heroicons/react/outline'
import { Fragment, useState } from 'react'
import { useContext } from 'react'
import { Product } from 'src/__generated__/schema.generated'

import { SelectTargetQuery } from './__generated__/SelectTarget.generated'

export const SELECT_TARGET_QUERY = gql`
  query SelectTargetQuery($username: String!) {
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
  setSelectedProduct: React.Dispatch<React.SetStateAction<string>>
}

const SelectTarget: React.FC<Props> = ({ setSelectedProduct }) => {
  const [product, setProduct] = useState<Product | null>()
  const { currentUser } = useContext(AppContext)
  const { data } = useQuery<SelectTargetQuery>(SELECT_TARGET_QUERY, {
    variables: { username: currentUser?.username }
  })
  const products = data?.user?.ownedProducts?.edges?.map((edge) => edge?.node)

  const handleSelectTarget = (product: Product) => {
    setProduct(product)
    setSelectedProduct(product?.id)
  }

  return (
    <div className="w-full max-w-sm px-4">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button>Everywhere</Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 px-0 mt-2">
                <div className="overflow-hidden rounded-lg shadow-md border">
                  <div className="relative bg-white p-3 space-y-2">
                    <div className="font-bold">Where to post?</div>
                    <button className="flex items-center space-x-2 text-sm">
                      <GlobeIcon className="h-5 w-5 text-brand-500" />
                      <div>Everywhere</div>
                    </button>
                    <div className="space-y-2">
                      <div className="text-sm font-bold">My Products</div>
                      <div className="space-y-2 text-sm">
                        {products?.map((product: any) => (
                          <div key={product?.name}>
                            <button className="flex space-x-2">
                              <img
                                className="h-8 w-8 rounded"
                                src={product?.avatar}
                                alt={`#${product?.slug}'s avatar'`}
                              />
                              <div>
                                <div>{product?.name}</div>
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

export default SelectTarget
