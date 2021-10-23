import { Button } from '@components/UI/Button'
import { Card, CardBody } from '@components/UI/Card'
import { ProgressBar } from '@components/UI/ProgressBar'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Topics: React.FC = () => {
  const router = useRouter()

  const handleContinue = () => {
    router.push('/onboarding/profile')
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
        <CardBody className="linkify space-y-2">
          <div className="flex items-center mb-5 space-x-5">
            <Link href="/onboarding" passHref>
              <Button
                className="mx-auto rounded-full"
                size="lg"
                variant="secondary"
                icon={<ArrowLeftIcon className="h-4 w-4" />}
                outline
              />
            </Link>
            <ProgressBar percentage={33} />
            <Button
              className="mx-auto"
              icon={<ArrowRightIcon className="h-4 w-4" />}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold">
              What are you interested in?
            </div>
            <div className="text-gray-500">
              Star tags to customize your feed
            </div>
          </div>
          <div className="pt-5 max-h-[50vh] overflow-y-auto">
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Topics
