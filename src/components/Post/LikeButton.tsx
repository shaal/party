import AppContext from '@components/utils/AppContext'
import { Switch } from '@headlessui/react'
import { HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Post } from 'src/__generated__/schema.generated'

type Props = {
  entity: Post
  handleLike: any
  loading: boolean
}

const LikeButton: React.FC<Props> = ({ entity, handleLike, loading }) => {
  const { currentUser } = useContext(AppContext)
  const router = useRouter()
  const [likesCount, setLikesCount] = useState<number>(
    entity?.likes?.totalCount
  )
  const [isLiked, setIsLiked] = useState<boolean>(false)

  useEffect(() => {
    if (entity?.hasLiked) setIsLiked(entity?.hasLiked)
  }, [entity])

  const toggleLike = () => {
    if (!currentUser)
      return router.push({
        pathname: '/login',
        query: { redirect: `/posts/${entity?.id}` }
      })
    setIsLiked(!isLiked)
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
    handleLike(entity)
  }

  return (
    <Switch
      checked={entity?.hasLiked}
      onChange={toggleLike}
      className="text-pink-500 hover:text-pink-400 flex items-center space-x-2"
      disabled={loading}
    >
      {isLiked ? (
        <HeartIconSolid className="h-5 w-5" />
      ) : (
        <HeartIcon className="h-5 w-5" />
      )}
      {likesCount > 0 && <div className="text-xs">{likesCount}</div>}
    </Switch>
  )
}

export default LikeButton
