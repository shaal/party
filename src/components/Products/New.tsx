import React from 'react'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import SettingsHelper from '../shared/SettingsHelper'
import { Card, CardBody } from '../ui/Card'

const NewProduct: React.FC = () => {
  return (
    <GridLayout>
      <GridItemFour>
        <SettingsHelper
          heading="New Product"
          description={'Launch your dream product in Devparty'}
        />
      </GridItemFour>
      <GridItemEight>
        <Card className="space-y-5">
          <CardBody className="space-y-4">WIP</CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default NewProduct
