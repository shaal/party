import { gql, useMutation } from '@apollo/client'
import { Switch } from '@headlessui/react'
import { UserAddIcon, UserRemoveIcon } from '@heroicons/react/outline'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { User } from '../../__generated__/schema.generated'
import { Button } from '../ui/Button'
import AppContext from '../utils/AppContext'
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
          followersCount
          followingCount
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
        input: {
          userId: user?.id
        }
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
          size="md"
          variant={isFollowed ? 'danger' : 'success'}
          outline
        >
          {isFollowed ? (
            <div className="flex items-center space-x-1">
              <UserRemoveIcon className="h-4 w-4" />
              {showText && <div>Unfollow</div>}
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <UserAddIcon className="h-4 w-4" />
              {showText && <div>Follow</div>}
            </div>
          )}
        </Switch>
      )}
    </>
  )
}

export default Follow
