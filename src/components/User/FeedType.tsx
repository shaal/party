import { CollectionIcon, ReplyIcon } from '@heroicons/react/outline'

import { User } from '~/__generated__/schema.generated'

interface Props {
  user: User
  setFeedType: any
}

const FeedType: React.FC<Props> = ({ user, setFeedType }) => {
  return (
    <div className="flex gap-3">
      <button
        className="flex items-center space-x-2 rounded-lg px-3 py-1 text-green-500 hover:bg-green-100 hover:text-green-500 dark:hover:bg-opacity-20 hover:bg-opacity-100"
        onClick={() => setFeedType('POST')}
      >
        <CollectionIcon className="h-4 w-4" />
        <div className="flex item-center space-x-2">
          <div>Posts</div>
          <div className="bg-gray-200 dark:bg-gray-800 px-2 rounded-full text-gray-800 dark:text-gray-200 font-bold">
            {user?.posts?.totalCount}
          </div>
        </div>
      </button>
      <button
        className="flex items-center space-x-2 rounded-lg px-3 py-1 text-pink-500 hover:bg-pink-100 hover:text-pink-500 dark:hover:bg-opacity-20 hover:bg-opacity-100"
        onClick={() => setFeedType('REPLY')}
      >
        <ReplyIcon className="h-4 w-4" />
        <div>Replies</div>
      </button>
    </div>
  )
}

export default FeedType
