import { gql, useQuery } from '@apollo/client'
import { GlobeIcon } from '@heroicons/react/outline'
import { Community, Product } from 'src/__generated__/schema.generated'

import { SelectTargetQuery } from './__generated__/Targets.generated'

export const SELECT_TARGET_QUERY = gql`
  query SelectTargetQuery {
    me {
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
  setSelected: React.Dispatch<React.SetStateAction<any>>
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Targets: React.FC<Props> = ({
  setSelectedTarget,
  setSelected,
  setShowModal
}) => {
  const { data } = useQuery<SelectTargetQuery>(SELECT_TARGET_QUERY)

  const products = data?.me?.ownedProducts?.edges?.map((edge) => edge?.node)
  const communities = data?.me?.communities?.edges?.map((edge) => edge?.node)

  const handleSelectTarget = (
    target: Product | Community,
    type: 'Product' | 'Community'
  ) => {
    setSelected(target)
    setSelectedTarget({ targetId: target?.id, targetType: type })
    setShowModal(false)
  }

  return (
    <div className="px-2">
      <div className="relative bg-white p-4 space-y-2">
        <div className="font-bold">Where to post?</div>
        <button type="button" className="flex items-center space-x-2 text-sm">
          <GlobeIcon className="h-5 w-5 text-brand-500" />
          <div>Everywhere</div>
        </button>
        <div className="space-y-2">
          <div className="font-bold">My Products</div>
          <div className="space-y-2">
            {products?.map((product: any) => (
              <div key={product?.name}>
                <button
                  type="button"
                  className="flex items-center space-x-2"
                  onClick={() => handleSelectTarget(product, 'Product')}
                >
                  <img
                    className="h-8 w-8 rounded"
                    src={product?.avatar}
                    alt={`#${product?.name}'s avatar'`}
                  />
                  <div className="text-left">
                    <div className="font-bold">{product?.name}</div>
                    <div className="text-sm">
                      <b>{product?.subscribers?.totalCount}</b> subscribers
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
                <button
                  type="button"
                  className="flex items-center space-x-2"
                  onClick={() => handleSelectTarget(community, 'Community')}
                >
                  <img
                    className="h-8 w-8 rounded"
                    src={community?.avatar}
                    alt={`${community?.name}'s avatar'`}
                  />
                  <div className="text-left">
                    <div className="font-bold">{community?.name}</div>
                    <div className="text-sm">
                      <b>{community?.members?.totalCount}</b> members
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Targets
