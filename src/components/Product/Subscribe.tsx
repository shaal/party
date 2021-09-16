import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/ui/Button'
import AppContext from '@components/utils/AppContext'
import { Switch } from '@headlessui/react'
import { UserAddIcon, UserRemoveIcon } from '@heroicons/react/outline'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Product } from 'src/__generated__/schema.generated'

import {
  ToggleProductSubscribeMutation,
  ToggleProductSubscribeMutationVariables
} from './__generated__/Subscribe.generated'

interface Props {
  product: Product
  showText: boolean
}

const Subscribe: React.FC<Props> = ({ product, showText }) => {
  const { currentUser } = useContext(AppContext)
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
  const [toggleProductSubscribe] = useMutation<
    ToggleProductSubscribeMutation,
    ToggleProductSubscribeMutationVariables
  >(
    gql`
      mutation ToggleProductSubscribeMutation(
        $input: ToggleProductSubscribeInput!
      ) {
        toggleProductSubscribe(input: $input) {
          id
          slug
          hasSubscribed
        }
      }
    `,
    {
      onError() {
        toast.error('Something went wrong!')
      },
      onCompleted(data) {
        if (data?.toggleProductSubscribe?.hasSubscribed) {
          toast.success(
            `Successfully subscribed to ${data?.toggleProductSubscribe?.slug}`
          )
        } else {
          toast.success(
            `Successfully unsubscribed to ${data?.toggleProductSubscribe?.slug}`
          )
        }
      }
    }
  )

  useEffect(() => {
    if (product?.hasSubscribed) setIsSubscribed(product?.hasSubscribed)
  }, [product])

  const handleToggleSubscribe = () => {
    toggleProductSubscribe({
      variables: {
        input: { id: product?.id }
      }
    })
  }

  return (
    <Switch
      as={Button}
      checked={isSubscribed}
      onChange={() => {
        setIsSubscribed(!isSubscribed)
        handleToggleSubscribe()
      }}
      variant={isSubscribed ? 'danger' : 'success'}
      outline
    >
      {isSubscribed ? (
        <div className="flex items-center space-x-1">
          <UserRemoveIcon className="h-4 w-4" />
          {showText && <div>Unsubscribe</div>}
        </div>
      ) : (
        <div className="flex items-center space-x-1">
          <UserAddIcon className="h-4 w-4" />
          {showText && <div>Subscribe</div>}
        </div>
      )}
    </Switch>
  )
}

export default Subscribe
