import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import { Card, CardBody } from '@components/ui/Card'
import React from 'react'

const Messages: React.FC = () => {
  return (
    <GridLayout>
      <GridItemFour>
        <Card>
          <CardBody>WIP</CardBody>
        </Card>
      </GridItemFour>
      <GridItemEight>
        <Card>
          <CardBody>WIP</CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default Messages
