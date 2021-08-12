import { gql, useMutation } from '@apollo/client'
import { Switch } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
import { useContext, useEffect, useState } from 'react'
import { User } from 'src/__generated__/schema.generated'

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
  const [toggleFollow, toggleFollowResult] = useMutation<
    ToggleFollowMutation,
    ToggleFollowMutationVariables
  >(
    gql`
      mutation ToggleFollowMutation($input: ToggleFollowInput!) {
        toggleFollow(input: $input) {
          id
          hasFollowed
          followersCount
          followingCount
        }
      }
    `
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
          className="py-2"
          variant={isFollowed ? 'danger' : 'success'}
          outline
        >
          {isFollowed ? (
            <div className="flex items-center gap-1">
              <MinusIcon className="h-4 w-4" />
              {showText && <div>Unfollow</div>}
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <PlusIcon className="h-4 w-4" />
              {showText && <div>Follow</div>}
            </div>
          )}
        </Switch>
      )}
    </>
  )
}

export default Follow
