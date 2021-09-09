import { CollectionIcon, ReplyIcon } from '@heroicons/react/outline'
import clsx from 'clsx'

interface Props {
  setFeedType: any
  feedType: string
}

const FeedType: React.FC<Props> = ({ setFeedType, feedType }) => {
  return (
    <div className="flex gap-3 px-2 sm:px-0">
      <button
        className={clsx(
          {
            'text-green-500 bg-green-100 dark:bg-opacity-20 bg-opacity-100':
              feedType === 'POST'
          },
          'flex items-center space-x-2 rounded-lg px-3 py-1 text-green-500 hover:bg-green-100 hover:text-green-500 dark:hover:bg-opacity-20 hover:bg-opacity-100'
        )}
        onClick={() => setFeedType('POST')}
      >
        <CollectionIcon className="h-4 w-4" />
        <div>Posts</div>
      </button>
      <button
        className={clsx(
          {
            'text-pink-500 bg-pink-100 dark:bg-opacity-20 bg-opacity-100':
              feedType === 'REPLY'
          },
          'flex items-center space-x-2 rounded-lg px-3 py-1 text-pink-500 hover:bg-pink-100 hover:text-pink-500 dark:hover:bg-opacity-20 hover:bg-opacity-100'
        )}
        onClick={() => setFeedType('REPLY')}
      >
        <ReplyIcon className="h-4 w-4" />
        <div>Replies</div>
      </button>
    </div>
  )
}

export default FeedType
