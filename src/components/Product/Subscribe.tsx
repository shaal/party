import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/UI/Button'
import AppContext from '@components/utils/AppContext'
import {
  Product,
  ToggleProductSubscribeMutation,
  ToggleProductSubscribeMutationVariables
} from '@graphql/types.generated'
import { Switch } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ERROR_MESSAGE } from 'src/constants'

interface Props {
  product: Product
  showText: boolean
}

const Subscribe: React.FC<Props> = ({ product, showText }) => {
  const { currentUser } = useContext(AppContext)
  const router = useRouter()
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
  const [toggleProductSubscribe] = useMutation<
    ToggleProductSubscribeMutation,
    ToggleProductSubscribeMutationVariables
  >(
    gql`
      mutation ToggleProductSubscribe($input: ToggleProductSubscribeInput!) {
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
    if (!currentUser)
      return router.push({
        pathname: '/login',
        query: { redirect: `/products/${product?.slug}` }
      })
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
