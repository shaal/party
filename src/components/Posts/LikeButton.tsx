import { Switch } from '@headlessui/react'
import { HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'

import { Post, Reply } from '../../__generated__/schema.generated'

type Props = {
  entity: Post | Reply
  handleLike: any
  loading: boolean
}

const LikeButton: React.FC<Props> = ({ entity, handleLike, loading }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false)

  useEffect(() => {
    if (entity?.hasLiked) setIsLiked(entity?.hasLiked)
  }, [entity])

  return (
    <Switch
      checked={entity?.hasLiked}
      onChange={() => {
        setIsLiked(!isLiked)
        handleLike(entity)
      }}
      className="text-pink-500 hover:text-pink-400 flex items-center gap-2"
      disabled={loading}
    >
      {isLiked ? (
        <HeartIconSolid className="h-5 w-5" />
      ) : (
        <HeartIcon className="h-5 w-5" />
      )}
      {(entity?.likesCount as number) > 0 && (
        <div className="text-xs">{entity?.likesCount}</div>
      )}
    </Switch>
  )
}

export default LikeButton
