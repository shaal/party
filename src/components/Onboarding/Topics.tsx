import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import AppContext from '@components/utils/AppContext'
import { CheckIcon } from '@heroicons/react/outline'
import React, { useContext } from 'react'

const Topics: React.FC = () => {
  const { currentUser } = useContext(AppContext)
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
          <div className="text-2xl font-bold">What are you interested in?</div>
          <div className="pt-5">WIP</div>
          <Button className="mx-auto" icon={<CheckIcon className="h-5 w-5" />}>
            Continue
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}

export default Topics
