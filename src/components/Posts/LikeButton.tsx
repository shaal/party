import { Switch } from '@headlessui/react'
import { HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'

import { Post } from '~/__generated__/schema.generated'

type Props = {
  entity: Post
  handleLike: any
  loading: boolean
}

const LikeButton: React.FC<Props> = ({ entity, handleLike, loading }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false)

  useEffect(() => {
    if (entity?.hasLiked) setIsLiked(entity?.hasLiked)
  }, [])

  return (
    <Switch
      checked={entity?.hasLiked}
      onChange={() => {
        setIsLiked(!isLiked)
        handleLike(entity)
      }}
      className="text-pink-500 hover:text-pink-400 flex items-center space-x-2"
      disabled={loading}
    >
      {isLiked ? (
        <HeartIconSolid className="h-5 w-5" />
      ) : (
        <HeartIcon className="h-5 w-5" />
      )}
    </Switch>
  )
}

export default LikeButton
