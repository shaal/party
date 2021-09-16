import { gql, useMutation } from '@apollo/client'
import { TrashIcon } from '@heroicons/react/outline'
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
        deletePost(input: $input) {
          id
        }
      }
    `,
    {
      onCompleted() {
        window.location.replace('/')
      }
    }
  )

  return (
    <button
      className="text-red-500 hover:text-red-400 flex items-center space-x-2"
      onClick={() => deletePost({ variables: { input: { id: post?.id } } })}
    >
      <TrashIcon className="h-5 w-5" />
    </button>
  )
}

export default DeleteButton
