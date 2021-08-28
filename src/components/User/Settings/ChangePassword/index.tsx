import React from 'react'

import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from '~/components/GridLayout'
import { Card, CardBody } from '~/components/ui/Card'

import Sidebar from '../Sidebar'
import ChangePasswordForm from './Form'

const ChangePassword: React.FC = () => {
  return (
    <GridLayout>
      <GridItemFour>
        <Sidebar />
      </GridItemFour>
      <GridItemEight>
        <Card>
          <CardBody>
            <ChangePasswordForm />
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default ChangePassword
