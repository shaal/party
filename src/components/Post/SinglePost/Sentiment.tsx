import React from 'react'
import { Post } from 'src/__generated__/schema.generated'
import Sentiment from 'sentiment'

interface Props {
  post: Post
}

var sentiment = new Sentiment()

const PostSentiment: React.FC<Props> = ({ post }) => {
  const analysis = sentiment.analyze(post?.body)
  return (
    <div className="font-bold text-sm">
      {analysis.score <= 0 ? (
        <div className="text-red-600">🤢 Yikes!</div>
      ) : (
        <div className="text-green-600">😇 Good</div>
      )}
    </div>
  )
}

export default PostSentiment
