const DetailsShimmer: React.FC = () => {
  return (
    <div className="space-y-5 w-96">
      <div className="bg-gray-200 ring-gray-50 dark:ring-black -mt-24 ring-8 rounded-full h-40 w-40"></div>
      <div className="space-y-3">
        <div className="shimmer h-7 w-52 rounded-lg"></div>
        <div className="shimmer h-6 w-32 rounded-lg"></div>
      </div>
      <div className="flex gap-5">
        <div className="space-y-2">
          <div className="shimmer h-6 w-6 rounded-lg"></div>
          <div className="shimmer h-6 w-20 rounded-lg"></div>
        </div>
        <div className="space-y-2">
          <div className="shimmer h-6 w-6 rounded-lg"></div>
          <div className="shimmer h-6 w-20 rounded-lg"></div>
        </div>
      </div>
      <div className="shimmer h-5 w-full rounded-lg"></div>
      <div className="shimmer h-5 w-36 rounded-lg"></div>
    </div>
  )
}

export default DetailsShimmer
