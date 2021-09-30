import { gql, useQuery } from '@apollo/client'
import { PageLoading } from '@components/ui/PageLoading'
import React from 'react'
import { User } from 'src/__generated__/schema.generated'

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
        coverBg
      }
      integrations {
        ethAddress
      }
    }
  }
`

const ProfileSettings: React.FC = () => {
  const { data, loading } = useQuery<ProfileSettingsQuery>(
    PROFILE_SETTINGS_QUERY
  )

  if (loading) {
    return <PageLoading message="Loading settings" />
  }

  return <ProfileSettingsForm currentUser={data?.me as User} />
}

export default ProfileSettings
