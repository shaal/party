import React from 'react'

const Waitlist: React.FC = () => {
  return (
    <div className="text-center space-y-5 p-5">
      <img
        className="mx-auto"
        src="https://assets.devparty.io/images/emojis/unicorn.png"
        alt="Unicorn emoji"
      />
      <div className="text-2xl font-bold">
        You're on out waitlist my friend!
      </div>
      <div className="text-xl">
        We'll send you an email as soon as we are ready, See you soon ✌
      </div>
      <div className="text-[#1DA1F2]">
        Follow @devpartyio on{' '}
        <a
          className="font-bold underline"
          href="https://twitter.com/devpartyio"
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </a>{' '}
        for updates
      </div>
    </div>
  )
}

export default Waitlist
