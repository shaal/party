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
            "Update your account's contact information and email address."
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
