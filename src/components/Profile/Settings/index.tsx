import { gql, useQuery } from '@apollo/client'
import React, { Fragment, useContext } from 'react'

import { User } from '~/__generated__/schema.generated'
import AppContext from '~/components/utils/AppContext'

import { SettingsQuery } from './__generated__/index.generated'
import AccountSettings from './AccountSettings'

export const query = gql`
  query SettingsQuery {
    me {
      id
      username
      email
      profile {
        name
        bio
        location
      }
    }
  }
`

const Settings: React.FC = () => {
  const { currentUser } = useContext(AppContext)
  const { data, loading } = useQuery<SettingsQuery>(query)

  if (loading) return <div>Loading...</div>
  // TODO: Redirect to 404
  if (!currentUser) return <div>Forbidden...</div>

  return (
    <Fragment>
      <AccountSettings currentUser={data?.me as User} />
    </Fragment>
  )
}

export default Settings
