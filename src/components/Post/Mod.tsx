import { Card, CardBody } from '@components/ui/Card'
import { HashtagIcon } from '@heroicons/react/outline'
import Sentiment from 'sentiment'
import { Post } from 'src/__generated__/schema.generated'

var sentiment = new Sentiment()

interface Props {
  post: Post
}

const PostMod: React.FC<Props> = ({ post }) => {
  const score = sentiment.analyze(post?.body).score

  return (
    <Card className="mt-5 border-yellow-400 !bg-yellow-300 !bg-opacity-20">
      <CardBody>
        <div className="font-bold text-lg">Details</div>
        <div className="space-y-1 mt-3 text-sm">
          <div className="flex items-center gap-1">
            <HashtagIcon className="h-4 w-4" />
            <span className="font-mono font-bold">{post?.id}</span>
          </div>
        </div>
        <div className="border-t border-yellow-400 my-3"></div>
        <div className="font-bold text-lg">Flags</div>
        <div className="space-y-1.5 mt-3 text-sm font-bold">
          <div className="space-x-2">
            <span>Toxicity:</span>
            {score < -5 && <span className="text-red-600">🤮 Yikes</span>}
            {score >= -5 && score < 0 && (
              <span className="text-red-600">🤢 Bad</span>
            )}
            {score >= 0 && score < 5 && (
              <span className="text-green-600">😇 Good</span>
            )}
            {score > 5 && <span className="text-green-600">😇 Very Good</span>}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default PostMod
