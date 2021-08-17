import React from 'react'

import { User } from '../../../../__generated__/schema.generated'
import { GridItemEight, GridItemFour, GridLayout } from '../../../GridLayout'
import SettingsHelper from '../../../shared/SettingsHelper'
import { Card, CardBody } from '../../../ui/Card'
import ChangePasswordForm from './Form'

interface Props {
  currentUser: User
}

const ChangePassword: React.FC<Props> = ({ currentUser }) => {
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
