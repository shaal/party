import React, { useContext } from 'react'

import { User } from '~/__generated__/schema.generated'
import ProfileForm from '~/components/EditProfile/ProfileForm'
import { GridLayout } from '~/components/GridLayout'
import AppContext from '~/components/utils/AppContext'

const AccountSettings: React.FC = () => {
  const { currentUser, currentUserLoading } = useContext(AppContext)

  if (currentUserLoading) return <div>Loading...</div>

  return (
    <GridLayout>
      <ProfileForm user={currentUser as User} />
    </GridLayout>
  )
}

export default AccountSettings
