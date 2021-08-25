import { User } from '~/__generated__/schema.generated'

interface Props {
  user: User
}

const Followerings: React.FC<Props> = ({ user }) => {
  return (
    <div className="flex gap-5">
      <div>
        <div className="text-xl">{user?.followingCount}</div>
        <div className="text-gray-500">Following</div>
      </div>
      <div>
        <div className="text-xl">{user?.followers?.totalCount}</div>
        <div className="text-gray-500">Followers</div>
      </div>
    </div>
  )
}

export default Followerings
