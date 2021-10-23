import { Button } from '@components/UI/Button'
import { Card, CardBody } from '@components/UI/Card'
import AppContext from '@components/utils/AppContext'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

const Onboarding: React.FC = () => {
  const { currentUser } = useContext(AppContext)
  const router = useRouter()

  const handleContinue = () => {
    router.push('/onboarding/topics')
  }

  return (
    <div
      className="flex justify-center items-center h-[90vh]"
      style={{
        backgroundImage:
          'url(https://ik.imagekit.io/devparty/tr:w-,h-/https://assets.devparty.io/images/patterns/1.svg)'
      }}
    >
      <Card className="w-full sm:max-w-xl border-2 shadow-lg">
        <div className="bg-black rounded-t-none sm:rounded-t-lg py-8 px-5 text-white space-y-5">
          <img className="h-10 w-10" src="/white.svg" alt="Logo" />
          <div className="text-3xl font-bold space-y-1.5">
            <div>@{currentUser?.username} — welcome to</div>
            <div>Devparty!</div>
          </div>
          <div>A social network for developers and creators.</div>
        </div>
        <CardBody className="linkify space-y-2">
          <div className="flex items-center space-x-2">
            <input id="acceptCOC" type="checkbox" />
            <label htmlFor="acceptCOC">
              You agree to uphold our <a href="/">Code of Conduct</a>
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="acceptCOC" type="checkbox" />
            <label htmlFor="acceptCOC">
              You agree to our <a href="/">Terms and Conditions</a>
            </label>
          </div>
          <div className="pt-5">
            <Button
              className="mx-auto"
              icon={<ArrowRightIcon className="h-5 w-5" />}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Onboarding
