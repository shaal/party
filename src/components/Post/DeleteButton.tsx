import { gql, useMutation } from '@apollo/client'
import { TrashIcon } from '@heroicons/react/outline'
import React from 'react'

import { Post } from '~/__generated__/schema.generated'

import {
  DeletePostMutation,
  DeletePostMutationVariables
} from './__generated__/DeleteButton.generated'

type Props = {
  refreshQuery: any
  entity: Post
}

const DeleteButton: React.FC<Props> = ({ entity, refreshQuery }) => {
  const [deleteNote, deleteNoteResult] = useMutation<
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
      refetchQueries: [{ query: refreshQuery }]
    }
  )

  return (
    <button
      className="text-red-500 hover:text-red-400 flex items-center space-x-2"
      onClick={() => deleteNote({ variables: { input: { id: entity?.id } } })}
    >
      <TrashIcon className="h-5 w-5" />
    </button>
  )
}

export default DeleteButton
