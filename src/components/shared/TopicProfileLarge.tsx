import Star from '@components/Topic/Star'
import Link from 'next/link'
import React from 'react'
import { Topic } from 'src/__generated__/schema.generated'

interface Props {
  topic: Topic
  showStar?: boolean
}

const TopicProfileLarge: React.FC<Props> = ({ topic, showStar = false }) => {
  return (
    <div className="flex justify-between items-center space-x-5">
      <div className="space-y-2">
        <div>
          <div className="flex items-center gap-1.5">
            <Link href={`/topics/${topic?.name}`}>
              <a
                href={`/topics/${topic?.name}`}
                className="font-bold cursor-pointer flex items-center space-x-1"
              >
                <div>#{topic?.name}</div>
              </a>
            </Link>
          </div>
        </div>
        <div>{topic?.description}</div>
      </div>
      {showStar && showStar && <Star topic={topic} />}
    </div>
  )
}

export default TopicProfileLarge
