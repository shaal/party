import { Button } from '@components/UI/Button'
import { Card, CardBody } from '@components/UI/Card'
import { ProgressBar } from '@components/UI/ProgressBar'
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Follow: React.FC = () => {
  const router = useRouter()

  const handleContinue = () => {
    router.push('/onboarding/follow')
  }

  return (
    <div className="onboarding-bg page-center">
      <Card className="w-full sm:max-w-xl border-2 shadow-lg">
        <CardBody className="linkify space-y-2">
          <div className="flex items-center mb-5 space-x-5">
            <Link href="/onboarding/profile" passHref>
              <Button
                className="mx-auto rounded-full"
                size="lg"
                variant="secondary"
                icon={<ArrowLeftIcon className="h-4 w-4" />}
                outline
              />
            </Link>
            <ProgressBar percentage={100} />
            <Button
              className="mx-auto"
              icon={<CheckCircleIcon className="h-4 w-4" />}
              onClick={handleContinue}
            >
              Finish
            </Button>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold">Suggested people to follow</div>
            <div className="text-gray-500">
              Follow users to get their updates on your feed
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

export default Follow
