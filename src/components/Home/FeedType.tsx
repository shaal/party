import {
  CheckCircleIcon,
  CollectionIcon,
  GlobeIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/outline'
import clsx from 'clsx'
import mixpanel from 'mixpanel-browser'
import React from 'react'

interface Props {
  setFeedType: React.Dispatch<React.SetStateAction<string>>
  feedType: string
}

const FeedType: React.FC<Props> = ({ setFeedType, feedType }) => {
  return (
    <div className="flex gap-3 px-2 sm:px-0">
      <button
        className={clsx(
          {
            'text-blue-500 bg-blue-100 dark:bg-opacity-20 bg-opacity-100':
              feedType === 'ALL'
          },
          'flex items-center space-x-2 rounded-lg px-3 py-1 text-blue-500 hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-opacity-20 hover:bg-opacity-100'
        )}
        onClick={() => {
          mixpanel.track('home.feed.type.all.click')
          setFeedType('ALL')
        }}
      >
        <GlobeIcon className="h-4 w-4" />
        <div className={feedType === 'ALL' ? '' : `hidden sm:block`}>All</div>
      </button>
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
        <div className={feedType === 'POST' ? '' : `hidden sm:block`}>
          Posts
        </div>
      </button>
      <button
        className={clsx(
          {
            'text-pink-500 bg-pink-100 dark:bg-opacity-20 bg-opacity-100':
              feedType === 'TASK'
          },
          'flex items-center space-x-2 rounded-lg px-3 py-1 text-pink-500 hover:bg-pink-100 hover:text-pink-500 dark:hover:bg-opacity-20 hover:bg-opacity-100'
        )}
        onClick={() => setFeedType('TASK')}
      >
        <CheckCircleIcon className="h-4 w-4" />
        <div className={feedType === 'TASK' ? '' : `hidden sm:block`}>
          Tasks
        </div>
      </button>
      <button
        className={clsx(
          {
            'text-purple-500 bg-purple-100 dark:bg-opacity-20 bg-opacity-100':
              feedType === 'QUESTION'
          },
          'flex items-center space-x-2 rounded-lg px-3 py-1 text-purple-500 hover:bg-purple-100 hover:text-purple-500 dark:hover:bg-opacity-20 hover:bg-opacity-100'
        )}
        onClick={() => setFeedType('QUESTION')}
      >
        <QuestionMarkCircleIcon className="h-4 w-4" />
        <div className={feedType === 'QUESTION' ? '' : `hidden sm:block`}>
          Question
        </div>
      </button>
    </div>
  )
}

export default FeedType
