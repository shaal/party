import { gql, useQuery } from '@apollo/client'
import React, { Fragment } from 'react'

import { SettingsQuery } from './__generated__/index.generated'

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

  return <Fragment>WIP</Fragment>
}

export default Settings
