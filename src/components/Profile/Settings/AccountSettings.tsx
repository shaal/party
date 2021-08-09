import React, { useContext } from 'react'

import { User } from '~/__generated__/schema.generated'
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from '~/components/GridLayout'
import ProfileForm from '~/components/Profile/Settings/ProfileForm'
import SettingsHelper from '~/components/shared/SettingsHelper'
import { Card, CardBody } from '~/components/ui/Card'
import AppContext from '~/components/utils/AppContext'

const AccountSettings: React.FC = () => {
  const { currentUser, currentUserLoading } = useContext(AppContext)

  if (currentUserLoading) return <div>Loading...</div>

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
            <ProfileForm user={currentUser as User} />
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default AccountSettings
