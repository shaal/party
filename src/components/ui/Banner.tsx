const Banner: React.FC = () => {
  return (
    <div className="py-12 sm:py-14 px-8 sm:px-10 text-left bg-gradient-to-r from-blue-400 to-purple-400">
      <div className="max-w-screen-2xl sm:px-3 mx-auto w-full">
        <div className="flex flex-row mx-3 text-white">
          <div className="flex-1">
            <div className="text-xl sm:text-2xl dark:text-black mb-4">
              Discover & Showcase
            </div>
            <div className="text-3xl sm:text-5xl dark:text-black">
              The only developers
            </div>
            <div className="text-3xl sm:text-5xl dark:text-black">
              Social platform.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
