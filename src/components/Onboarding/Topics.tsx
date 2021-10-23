import { Button } from '@components/UI/Button'
import { Card, CardBody } from '@components/UI/Card'
import { ProgressBar } from '@components/UI/ProgressBar'
import { ArrowRightIcon } from '@heroicons/react/outline'
import React from 'react'

const Topics: React.FC = () => {
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
          <ProgressBar className="mb-5" percentage={25} />
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
          <Button
            className="mx-auto"
            icon={<ArrowRightIcon className="h-4 w-4" />}
          >
            Continue
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}

export default Topics
