interface Props {
  showFollow?: boolean
}

const UserProfileShimmer: React.FC<Props> = ({ showFollow = false }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-3 items-center">
        <div className="shimmer h-11 w-11 rounded-full" />
        <div className="space-y-3">
          <div className="shimmer h-3 w-40 rounded-md" />
          <div className="shimmer h-3 w-20 rounded-md" />
        </div>
      </div>
      {showFollow && <div className="shimmer h-7 w-10 rounded-md" />}
    </div>
  )
}

export default UserProfileShimmer
