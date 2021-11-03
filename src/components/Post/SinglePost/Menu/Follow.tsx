import { gql, useMutation } from '@apollo/client'
import {
  ToggleFollowMutation,
  ToggleFollowMutationVariables
} from '@components/User/__generated__/Follow.generated'
import AppContext from '@components/utils/AppContext'
import { Menu } from '@headlessui/react'
import { UserAddIcon, UserRemoveIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { User } from 'src/__generated__/schema.generated'

interface Props {
  user: User
}

const Follow: React.FC<Props> = ({ user }) => {
  const { currentUser } = useContext(AppContext)
  const router = useRouter()
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
      onError(error) {
        toast.error(error.message)
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
    <Menu.Item
      as="div"
      className={({ active }: { active: boolean }) =>
        clsx(
          { 'bg-gray-100 dark:bg-gray-800': active },
          'block px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200 m-2 rounded-lg cursor-pointer'
        )
      }
      onClick={handleToggleFollow}
    >
      <div className="flex items-center space-x-2">
        {user?.hasFollowed ? (
          <UserRemoveIcon className="h-4 w-4" />
        ) : (
          <UserAddIcon className="h-4 w-4" />
        )}
        <div className="truncate">
          {user?.hasFollowed ? 'Unfollow' : 'Follow'} @{user?.username}
        </div>
      </div>
    </Menu.Item>
  )
}

export default Follow
