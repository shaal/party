import { Card, CardBody } from '@components/UI/Card'
import { Post } from '@graphql/types.generated'
import { HashtagIcon } from '@heroicons/react/outline'

interface Props {
  post: Post
}

const PostMod: React.FC<Props> = ({ post }) => {
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
      </CardBody>
    </Card>
  )
}

export default PostMod
