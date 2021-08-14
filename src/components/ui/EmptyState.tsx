import React from 'react'

import { Card, CardBody } from './Card'

interface Props {
  message: React.ReactNode
  icon: React.ReactNode
}

export const EmptyState: React.FC<Props> = ({ message, icon }) => {
  return (
    <Card>
      <CardBody>
        <div className="grid justify-items-center space-y-2">
          <div>{icon}</div>
          <div>{message}</div>
        </div>
      </CardBody>
    </Card>
  )
}
