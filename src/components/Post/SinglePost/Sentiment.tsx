import { Tooltip } from '@components/ui/Tooltip'
import React from 'react'
import Sentiment from 'sentiment'
import { Post } from 'src/__generated__/schema.generated'

interface Props {
  post: Post
}

var sentiment = new Sentiment()

const PostSentiment: React.FC<Props> = ({ post }) => {
  const score = sentiment.analyze(post?.body).score
  return (
    <div className="font-bold text-sm ml-3">
      <Tooltip content={`Score: ${score}`}>
        <div>
          {score < -5 && <div className="text-red-600">🤮 Yikes</div>}
          {score >= -5 && score < 0 && (
            <div className="text-red-600">🤢 Bad</div>
          )}
          {score >= 0 && score < 5 && (
            <div className="text-green-600">😇 Good</div>
          )}
          {score > 5 && <div className="text-green-600">😇 Very Good</div>}
        </div>
      </Tooltip>
    </div>
  )
}

export default PostSentiment
