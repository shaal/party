import { TrashIcon } from '@heroicons/react/outline'
import React from 'react'

import { Post } from '~/__generated__/schema.generated'

type Props = {
  entity: Post
}

const DeleteButton: React.FC<Props> = ({ entity }) => {
  return (
    <button
      className="text-red-500 hover:text-red-400 flex items-center space-x-2"
      onClick={() => console.log('WIP')}
    >
      <TrashIcon className="h-5 w-5" />
    </button>
  )
}

export default DeleteButton
