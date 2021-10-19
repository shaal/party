import React from 'react'

import { Card, CardBody } from './Card'

interface Props {
  message: React.ReactNode
  icon: React.ReactNode
  hideCard?: boolean
}

export const EmptyState: React.FC<Props> = ({
  message,
  icon,
  hideCard = false
}) => {
  return (
    <Card className={hideCard ? 'border-0 !shadow-none' : ''}>
      <CardBody className={hideCard ? 'p-0' : ''}>
        <div className="grid justify-items-center space-y-2">
          <div>{icon}</div>
          <div>{message}</div>
        </div>
      </CardBody>
    </Card>
  )
}
