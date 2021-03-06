interface Props {
  showFollow?: boolean
}

const UserProfileLargeShimmer: React.FC<Props> = ({ showFollow = false }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-3 items-center">
        <div className="shimmer h-14 w-14 rounded-full" />
        <div className="space-y-2">
          <div className="shimmer h-3 w-40 rounded-md" />
          <div className="shimmer h-3 w-20 rounded-md" />
          <div className="pt-2">
            <div className="shimmer h-3 w-60 rounded-md" />
          </div>
        </div>
      </div>
      {showFollow && <div className="shimmer h-8 w-24 rounded-md" />}
    </div>
  )
}

export default UserProfileLargeShimmer
