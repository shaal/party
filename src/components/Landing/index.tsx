import React from 'react'

const Landing: React.FC = () => {
  return (
    <div className="flex flex-grow items-center justify-center">
      <div className="max-w-md w-full">
        <h2 className="text-center text-3xl font-extrabold">
          <img className="mx-auto h-14" src="/logo.svg" alt="Devparty" />
          <div className="mt-5 font-serif">The social media for developers</div>
        </h2>
      </div>
    </div>
  )
}

export default Landing
