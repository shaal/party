import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/UI/Button'
import AppContext from '@components/utils/AppContext'
import {
  ToggleFollowMutation,
  ToggleFollowMutationVariables,
  User
} from '@graphql/types.generated'
import { Switch } from '@headlessui/react'
import { UserAddIcon, UserRemoveIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
  user: User
  showText: boolean
  showToast?: boolean
}

const Follow: React.FC<Props> = ({ user, showText, showToast = true }) => {
  const { currentUser } = useContext(AppContext)
  const router = useRouter()
  const [isFollowed, setIsFollowed] = useState<boolean>(false)
  const [toggleFollow] = useMutation<
    ToggleFollowMutation,
    ToggleFollowMutationVariables
  >(
    gql`
      mutation ToggleFollow($input: ToggleFollowInput!) {
        toggleFollow(input: $input) {
          id
          username
          hasFollowed
        }
      }
    `,
    {
      onError(error) {
        toast.error(error.message)
      },
      onCompleted(data) {
        if (showToast) {
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
    }
  )

  useEffect(() => {
    if (user?.hasFollowed) setIsFollowed(user?.hasFollowed)
  }, [user])

  const handleToggleFollow = () => {
    if (!currentUser)
      return router.push({
        pathname: '/login',
        query: { redirect: `/u/${user?.username}` }
      })
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
          className="text-sm"
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
