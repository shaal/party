import {
  CheckCircleIcon,
  CollectionIcon,
  GlobeIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/outline'

interface FeedTypeProps {
  setFeedType: any
}

const FeedType: React.FC<FeedTypeProps> = ({ setFeedType }) => {
  return (
    <div className="flex mb-4 gap-3">
      <button
        className="flex items-center space-x-2 rounded-lg px-3 py-1 text-blue-500 hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-opacity-20 hover:bg-opacity-100"
        onClick={() => setFeedType('ALL')}
      >
        <GlobeIcon className="h-4 w-4" />
        <div>All</div>
      </button>
      <button
        className="flex items-center space-x-2 rounded-lg px-3 py-1 text-green-500 hover:bg-green-100 hover:text-green-500 dark:hover:bg-opacity-20 hover:bg-opacity-100"
        onClick={() => setFeedType('POST')}
      >
        <CollectionIcon className="h-4 w-4" />
        <div>Posts</div>
      </button>
      <button
        className="flex items-center space-x-2 rounded-lg px-3 py-1 text-pink-500 hover:bg-pink-100 hover:text-pink-500 dark:hover:bg-opacity-20 hover:bg-opacity-100"
        onClick={() => setFeedType('TASK')}
      >
        <CheckCircleIcon className="h-4 w-4" />
        <div>Tasks</div>
      </button>
      <button
        className="flex items-center space-x-2 rounded-lg px-3 py-1 text-purple-500 hover:bg-purple-100 hover:text-purple-500 dark:hover:bg-opacity-20 hover:bg-opacity-100"
        onClick={() => setFeedType('QUESTION')}
      >
        <QuestionMarkCircleIcon className="h-4 w-4" />
        <div>Question</div>
      </button>
    </div>
  )
}

export default FeedType
