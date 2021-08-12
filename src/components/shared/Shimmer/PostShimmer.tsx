import { Card, CardBody } from '../../ui/Card'
import UserProfileShimmer from './UserProfileShimmer'

const PostShimmer: React.FC = () => {
  return (
    <Card>
      <CardBody className="space-y-4">
        <div className="flex justify-between items-center">
          <UserProfileShimmer />
          <div className="shimmer h-3 w-20 rounded-md"></div>
        </div>
        <div className="space-y-2">
          <div className="shimmer h-3 w-96 rounded-md"></div>
          <div className="shimmer h-3 w-60 rounded-md"></div>
        </div>
      </CardBody>
      <div className="flex gap-7 p-3 border-t dark:border-gray-800">
        <div className="shimmer h-5 w-5 rounded-md"></div>
        <div className="shimmer h-5 w-5 rounded-md"></div>
        <div className="shimmer h-5 w-5 rounded-md"></div>
      </div>
    </Card>
  )
}

export default PostShimmer
