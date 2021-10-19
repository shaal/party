import { gql, useMutation } from '@apollo/client'
import { Menu } from '@headlessui/react'
import { TrashIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import mixpanel from 'mixpanel-browser'
import React from 'react'
import { Post } from 'src/__generated__/schema.generated'

import {
  DeletePostMutation,
  DeletePostMutationVariables
} from './__generated__/DeleteButton.generated'

type Props = {
  post: Post
}

const DeleteButton: React.FC<Props> = ({ post }) => {
  const [deletePost] = useMutation<
    DeletePostMutation,
    DeletePostMutationVariables
  >(
    gql`
      mutation DeletePostMutation($input: DeletePostInput!) {
        deletePost(input: $input)
      }
    `,
    {
      onError() {
        mixpanel.track('post.delete.failed')
      },
      onCompleted() {
        window.location.replace('/')
        mixpanel.track('post.delete.success')
      }
    }
  )

  return (
    <Menu.Item
      as="div"
      className={({ active }: any) =>
        clsx(
          { 'bg-gray-100 dark:bg-gray-800': active },
          'block px-4 py-1.5 text-sm text-red-500 m-2 rounded-lg cursor-pointer'
        )
      }
      onClick={() => {
        mixpanel.track('post.delete.click')
        deletePost({ variables: { input: { id: post?.id } } })
      }}
    >
      <div className="flex items-center space-x-2">
        <TrashIcon className="h-4 w-4" />
        <div>Delete</div>
      </div>
    </Menu.Item>
  )
}

export default DeleteButton
