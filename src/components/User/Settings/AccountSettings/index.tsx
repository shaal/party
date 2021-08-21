import { Card, CardBody } from '@components/ui/Card'
import React from 'react'

import { User } from '../../../../__generated__/schema.generated'
import { GridItemEight, GridItemFour, GridLayout } from '../../../GridLayout'
import SettingsHelper from '../../../shared/SettingsHelper'
import AccountSettingsForm from './Form'

interface Props {
  currentUser: User
}

const AccountSettings: React.FC<Props> = ({ currentUser }) => {
  return (
    <GridLayout>
      <GridItemFour>
        <SettingsHelper
          heading="Account settings"
          description={
            "Update your account's contact information and email address."
          }
        />
      </GridItemFour>
      <GridItemEight>
        <Card>
          <CardBody>
            <AccountSettingsForm user={currentUser as User} />
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default AccountSettings
