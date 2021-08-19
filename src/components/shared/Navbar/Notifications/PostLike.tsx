import Link from 'next/link'

import { Notification } from '../../../../__generated__/schema.generated'

interface Props {
  notification: Notification
}

const PostLike: React.FC<Props> = ({ notification }) => {
  return (
    <div className="flex space-x-1.5">
      <Link href={`/${notification?.dispatcher?.username}`}>
        {notification?.dispatcher?.profile?.name}
      </Link>
      <span className="linkify text-gray-500">
        liked your <Link href={`/posts/${notification?.entityId}`}>post</Link>
      </span>
    </div>
  )
}

export default PostLike
