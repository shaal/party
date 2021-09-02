import { CollectionIcon } from '@heroicons/react/outline'

interface Props {
  setFeedType: any
}

const FeedType: React.FC<Props> = ({ setFeedType }) => {
  return (
    <div className="flex gap-3">
      <button
        className="flex items-center space-x-2 rounded-lg px-3 py-1 text-green-500 hover:bg-green-100 hover:text-green-500 dark:hover:bg-opacity-20 hover:bg-opacity-100"
        onClick={() => setFeedType('POST')}
      >
        <CollectionIcon className="h-4 w-4" />
        <div>Posts</div>
      </button>
    </div>
  )
}

export default FeedType
