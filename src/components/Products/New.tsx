import React from 'react'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import { Button } from '../ui/Button'
import { Card, CardBody } from '../ui/Card'

const NewProduct: React.FC = () => {
  return (
    <GridLayout>
      <GridItemEight>
        <Card className="space-y-5">
          <CardBody className="space-y-4">Hello</CardBody>
        </Card>
      </GridItemEight>
      <GridItemFour>
        <Card>
          <CardBody>
            <Button>Create new Product</Button>
          </CardBody>
        </Card>
      </GridItemFour>
    </GridLayout>
  )
}

export default NewProduct
