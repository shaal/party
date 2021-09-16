import { Modal } from '@components/ui/Modal'
import React from 'react'

interface Props {
  showModal: boolean
  setShowModal: any
}

const Waitlist: React.FC<Props> = ({ showModal, setShowModal }) => {
  return (
    <Modal
      onClose={() => setShowModal(!showModal)}
      title="You are in the waitlist 🎉"
      show={showModal}
    >
      <div className="p-5 text-center space-y-5">
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
    </Modal>
  )
}

export default Waitlist
