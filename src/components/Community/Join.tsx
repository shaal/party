import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/ui/Button'
import { Switch } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
import mixpanel from 'mixpanel-browser'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Community } from 'src/__generated__/schema.generated'
import { ERROR_MESSAGE } from 'src/constants'

import {
  ToggleCommunityJoinMutation,
  ToggleCommunityJoinMutationVariables
} from './__generated__/Join.generated'

interface Props {
  community: Community
  showText: boolean
}

const Subscribe: React.FC<Props> = ({ community, showText }) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
  const [toggleCommunityJoin] = useMutation<
    ToggleCommunityJoinMutation,
    ToggleCommunityJoinMutationVariables
  >(
    gql`
      mutation ToggleCommunityJoinMutation($input: ToggleCommunityJoinInput!) {
        toggleCommunityJoin(input: $input) {
          id
          slug
          hasJoined
        }
      }
    `,
    {
      onError() {
        toast.error(ERROR_MESSAGE)
        mixpanel.track('product.toggle_subscribe.failed')
      },
      onCompleted(data) {
        if (data?.toggleCommunityJoin?.hasJoined) {
          toast.success(
            `Successfully subscribed to ${data?.toggleCommunityJoin?.slug}`
          )
        } else {
          toast.success(
            `Successfully unsubscribed to ${data?.toggleCommunityJoin?.slug}`
          )
        }
        mixpanel.track('product.toggle_subscribe.success')
      }
    }
  )

  useEffect(() => {
    if (community?.hasJoined) setIsSubscribed(community?.hasJoined)
  }, [community])

  const handleToggleSubscribe = () => {
    mixpanel.track('product.toggle_subscribe.click')
    toggleCommunityJoin({
      variables: {
        input: { id: community?.id }
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
      {isSubscribed ? showText && 'Leave' : showText && 'Join'}
    </Switch>
  )
}

export default Subscribe
