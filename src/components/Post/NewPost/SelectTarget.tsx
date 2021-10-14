import { gql, useQuery } from '@apollo/client'
import { Button } from '@components/ui/Button'
import AppContext from '@components/utils/AppContext'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, GlobeIcon } from '@heroicons/react/outline'
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
            avatar
            subscribers {
              totalCount
            }
          }
        }
      }
      communities {
        edges {
          node {
            id
            name
            avatar
            members {
              totalCount
            }
          }
        }
      }
    }
  }
`

interface Props {
  setSelectedTarget: React.Dispatch<React.SetStateAction<any>>
}

const SelectTarget: React.FC<Props> = ({ setSelectedTarget }) => {
  const [product, setProduct] = useState<Product | null>()
  const { currentUser } = useContext(AppContext)
  const { data } = useQuery<SelectTargetQuery>(SELECT_TARGET_QUERY, {
    variables: { username: currentUser?.username }
  })
  const products = data?.user?.ownedProducts?.edges?.map((edge) => edge?.node)
  const communities = data?.user?.communities?.edges?.map((edge) => edge?.node)

  const handleSelectTarget = (product: Product) => {
    setProduct(product)
    setSelectedTarget(product?.id)
  }

  return (
    <div className="w-full max-w-sm px-2">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button
              as={Button}
              className="text-sm flex items-center space-x-2"
              size="sm"
              icon={<ChevronDownIcon className="h-4 w-4" />}
              outline
            >
              <div>Everywhere</div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 mt-2 w-screen max-w-[14rem]">
                <div className="overflow-hidden rounded-lg shadow-md border">
                  <div className="relative bg-white p-4 space-y-2">
                    <div className="font-bold">Where to post?</div>
                    <button className="flex items-center space-x-2 text-sm">
                      <GlobeIcon className="h-5 w-5 text-brand-500" />
                      <div>Everywhere</div>
                    </button>
                    <div className="space-y-2">
                      <div className="font-bold">My Products</div>
                      <div className="space-y-2">
                        {products?.map((product: any) => (
                          <div key={product?.name}>
                            <button className="flex items-center space-x-2">
                              <img
                                className="h-8 w-8 rounded"
                                src={product?.avatar}
                                alt={`#${product?.name}'s avatar'`}
                              />
                              <div className="text-left">
                                <div className="font-bold">{product?.name}</div>
                                <div className="text-sm">
                                  <b>{product?.subscribers?.totalCount}</b>{' '}
                                  subscribers
                                </div>
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2 pt-2">
                      <div className="font-bold">My Communities</div>
                      <div className="space-y-2">
                        {communities?.map((community: any) => (
                          <div key={community?.name}>
                            <button className="flex items-center space-x-2">
                              <img
                                className="h-8 w-8 rounded"
                                src={community?.avatar}
                                alt={`${community?.name}'s avatar'`}
                              />
                              <div className="text-left">
                                <div className="font-bold">
                                  {community?.name}
                                </div>
                                <div className="text-sm">
                                  <b>{community?.members?.totalCount}</b>{' '}
                                  members
                                </div>
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
