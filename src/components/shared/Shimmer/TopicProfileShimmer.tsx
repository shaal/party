interface Props {
  showStar?: boolean
}

const TopicProfileShimmer: React.FC<Props> = ({ showStar = false }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-3 items-center">
        <div className="space-y-2">
          <div className="shimmer h-3 w-44 rounded-md" />
          <div className="pt-2 flex items-center space-x-3">
            <div className="shimmer h-3 w-10 rounded-md" />
            <div className="shimmer h-3 w-10 rounded-md" />
          </div>
        </div>
      </div>
      {showStar && <div className="shimmer h-7 w-10 rounded-md" />}
    </div>
  )
}

export default TopicProfileShimmer
