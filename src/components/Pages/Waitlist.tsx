import DevpartySEO from '@components/shared/SEO'
import Link from 'next/link'
import { STATIC_ASSETS } from 'src/constants'

const Waitlist: React.FC = () => {
  return (
    <>
      <DevpartySEO title="You are in Waitlist! · Devparty" />
      <div className="flex flex-col h-full justify-start pt-10 items-center">
        <img src={`${STATIC_ASSETS}/emojis/unicorn.png`} alt="Unicorn emoji" />
        <div className="py-10 text-center">
          <h1 className="text-3xl mb-4 font-bold">You are on our Waitlist!</h1>
          <div className="mb-4">
            Hang tight - you’re currently on the waitlist. We will onboard you
            ASAP!
          </div>
          <div className="flex max-w-sm mx-auto mt-10 mb-4 justify-center bg-gray-200 dark:bg-gray-800 rounded-full">
            <span className="px-5 py-4 truncate">joe@hey.com</span>
          </div>
          <Link href={`https://twitter.com/devpartyio`}>
            <a className="text-blue-500" rel="noreferrer" target="_blank">
              Follow @devpartyio on twitter for more updates
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Waitlist
