import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/ui/Button'
import AppContext from '@components/utils/AppContext'
import { Switch } from '@headlessui/react'
import { UserAddIcon, UserRemoveIcon } from '@heroicons/react/outline'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { User } from 'src/__generated__/schema.generated'

import {
  ToggleFollowMutation,
  ToggleFollowMutationVariables
} from './__generated__/Follow.generated'

interface Props {
  user: User
  showText: boolean
}

const Follow: React.FC<Props> = ({ user, showText }) => {
  const { currentUser } = useContext(AppContext)
  const [isFollowed, setIsFollowed] = useState<boolean>(false)
  const [toggleFollow] = useMutation<
    ToggleFollowMutation,
    ToggleFollowMutationVariables
  >(
    gql`
      mutation ToggleFollowMutation($input: ToggleFollowInput!) {
        toggleFollow(input: $input) {
          id
          username
          hasFollowed
        }
      }
    `,
    {
      onError() {
        toast.error('Something went wrong!')
      },
      onCompleted(data) {
        if (data?.toggleFollow?.hasFollowed) {
          toast.success(
            `Successfully followed @${data?.toggleFollow?.username}`
          )
        } else {
          toast.success(
            `Successfully unfollowed @${data?.toggleFollow?.username}`
          )
        }
      }
    }
  )

  useEffect(() => {
    if (user?.hasFollowed) setIsFollowed(user?.hasFollowed)
  }, [user])

  const handleToggleFollow = () => {
    toggleFollow({
      variables: {
        input: { userId: user?.id }
      }
    })
  }

  return (
    <>
      {currentUser?.id !== user?.id && (
        <Switch
          as={Button}
          checked={isFollowed}
          onChange={() => {
            setIsFollowed(!isFollowed)
            handleToggleFollow()
          }}
          variant={isFollowed ? 'danger' : 'success'}
          icon={
            isFollowed ? (
              <UserRemoveIcon className="h-4 w-4" />
            ) : (
              <UserAddIcon className="h-4 w-4" />
            )
          }
          outline
        >
          {isFollowed ? showText && 'Unfollow' : showText && 'Follow'}
        </Switch>
      )}
    </>
  )
}

export default Follow
