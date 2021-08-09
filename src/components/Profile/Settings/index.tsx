import React, { Fragment, useContext } from 'react'

import AppContext from '~/components/utils/AppContext'

import AccountSettings from './AccountSettings'

const Settings: React.FC = () => {
  const { currentUser, currentUserLoading } = useContext(AppContext)

  return (
    <Fragment>
      <AccountSettings />
    </Fragment>
  )
}

export default Settings
