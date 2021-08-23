import React from 'react'

import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from '~/components/GridLayout'
import SettingsHelper from '~/components/shared/SettingsHelper'
import { Card, CardBody } from '~/components/ui/Card'

import ChangePasswordForm from './Form'

const ChangePassword: React.FC = () => {
  return (
    <GridLayout>
      <GridItemFour>
        <SettingsHelper
          heading="Change password"
          description={
            'After a successful password update, you will be redirected to the login page where you can log in with your new password.'
          }
        />
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
