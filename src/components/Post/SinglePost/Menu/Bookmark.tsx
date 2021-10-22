import { gql, useMutation } from '@apollo/client'
import AppContext from '@components/utils/AppContext'
import { Menu } from '@headlessui/react'
import { BookmarkIcon } from '@heroicons/react/outline'
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/solid'
import clsx from 'clsx'
import mixpanel from 'mixpanel-browser'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { Post } from 'src/__generated__/schema.generated'

import {
  ToggleBookmarkMutation,
  ToggleBookmarkMutationVariables
} from './__generated__/Bookmark.generated'

interface Props {
  post: Post
}

const Bookmark: React.FC<Props> = ({ post }) => {
  const { currentUser } = useContext(AppContext)
  const router = useRouter()
  const [toggleBookmark] = useMutation<
    ToggleBookmarkMutation,
    ToggleBookmarkMutationVariables
  >(
    gql`
      mutation ToggleBookmarkMutation($input: ToggleBookmarkInput!) {
        toggleBookmark(input: $input) {
          id
          hasBookmarked
        }
      }
    `,
    {
      onError(error) {
        toast.error(error.message)
        mixpanel.track('post.bookmark.failed')
      },
      onCompleted(data) {
        if (data?.toggleBookmark?.hasBookmarked) {
          toast.success('Successfully bookmarked the post')
          mixpanel.track('post.bookmark.success')
        } else {
          toast.success('Successfully removed the bookmark')
          mixpanel.track('post.remove_bookmark.success')
        }
      }
    }
  )

  const handleToggleFollow = () => {
    if (!currentUser)
      return router.push({
        pathname: '/login',
        query: { redirect: `/posts/${post?.id}` }
      })
    mixpanel.track('user.toggle_follow.click')
    toggleBookmark({
      variables: { input: { id: post?.id } }
    })
  }

  return (
    <Menu.Item
      as="div"
      className={({ active }: any) =>
        clsx(
          { 'bg-gray-100 dark:bg-gray-800': active },
          'block px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200 m-2 rounded-lg cursor-pointer'
        )
      }
      onClick={handleToggleFollow}
    >
      <div className="flex items-center space-x-2">
        {post?.hasBookmarked ? (
          <BookmarkIconSolid className="h-4 w-4" />
        ) : (
          <BookmarkIcon className="h-4 w-4" />
        )}
        <div>{post?.hasBookmarked ? 'Remove Bookmark' : 'Bookmark'}</div>
      </div>
    </Menu.Item>
  )
}

export default Bookmark
