import { gql, useQuery } from '@apollo/client'
import React, { Fragment } from 'react'

import { User } from '~/__generated__/schema.generated'

import { SettingsQuery } from './__generated__/index.generated'
import SocialSettings from './SocialSettings'

export const SETTINGS_QUERY = gql`
  query SettingsQuery {
    me {
      id
      username
      email
      profile {
        id
        name
        bio
        location
        avatar
        cover
        website
        twitter
        github
        discord
      }
    }
  }
`

const Settings: React.FC = () => {
  const { data } = useQuery<SettingsQuery>(SETTINGS_QUERY)

  return (
    <Fragment>
      {/* <AccountSettings currentUser={data?.me as User} /> */}
      <SocialSettings currentUser={data?.me as User} />
    </Fragment>
  )
}

export default Settings
