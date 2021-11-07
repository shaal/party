import DevpartySEO from '@components/shared/SEO'
import React, { Fragment } from 'react'
import { STATIC_ASSETS } from 'src/constants'

const Waitlist: React.FC = () => {
  return (
    <>
      {/* TODO: Update this page */}
      <DevpartySEO title="You are in Waitlist! · Devparty" />
      <div className="flex flex-col h-full justify-start pt-10 items-center">
        <img src={`${STATIC_ASSETS}/emojis/unicorn.png`} alt="Unicorn emoji" />
        <div className="py-10 text-center">
          <h1 className="text-3xl mb-4 font-bold">You are in Waitlist!</h1>
          <div className="mb-4">
            Hang tight - you’re currently on the waitlist. We will onboard you
            ASAP!
          </div>
        </div>
      </div>
    </>
  )
}

export default Waitlist
