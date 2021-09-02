import { gql, useQuery } from '@apollo/client'
import React, { Fragment } from 'react'

import { User } from '~/__generated__/schema.generated'
import { PageLoading } from '~/components/ui/PageLoading'

import { ProfileSettingsQuery } from './__generated__/index.generated'
import ProfileSettingsForm from './Form'

export const PROFILE_SETTINGS_QUERY = gql`
  query ProfileSettingsQuery {
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
      }
      invite {
        id
        code
        usedTimes
      }
    }
  }
`

const ProfileSettings: React.FC = () => {
  const { data, loading } = useQuery<ProfileSettingsQuery>(
    PROFILE_SETTINGS_QUERY
  )

  if (loading) {
    return <PageLoading message="Loading settings..." />
  }

  return (
    <Fragment>
      <ProfileSettingsForm currentUser={data?.me as User} />
    </Fragment>
  )
}

export default ProfileSettings
