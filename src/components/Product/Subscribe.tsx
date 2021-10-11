import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/ui/Button'
import { Switch } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
import mixpanel from 'mixpanel-browser'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Product } from 'src/__generated__/schema.generated'
import { ERROR_MESSAGE } from 'src/constants'

import {
  ToggleProductSubscribeMutation,
  ToggleProductSubscribeMutationVariables
} from './__generated__/Subscribe.generated'

interface Props {
  product: Product
  showText: boolean
}

const Subscribe: React.FC<Props> = ({ product, showText }) => {
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
        toast.error(ERROR_MESSAGE)
        mixpanel.track('product.toggle_subscribe.failed')
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
        mixpanel.track('product.toggle_subscribe.success')
      }
    }
  )

  useEffect(() => {
    if (product?.hasSubscribed) setIsSubscribed(product?.hasSubscribed)
  }, [product])

  const handleToggleSubscribe = () => {
    mixpanel.track('product.toggle_subscribe.click')
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
      icon={
        isSubscribed ? (
          <MinusIcon className="h-4 w-4" />
        ) : (
          <PlusIcon className="h-4 w-4" />
        )
      }
      outline
    >
      {isSubscribed ? showText && 'Unsubscribe' : showText && 'Subscribe'}
    </Switch>
  )
}

export default Subscribe
