import { gql, useQuery } from '@apollo/client'
import { PageLoading } from '@components/UI/PageLoading'
import { GetProfileSettingsQuery, User } from '@graphql/types.generated'
import React from 'react'

import ProfileSettingsForm from './Form'

export const PROFILE_SETTINGS_QUERY = gql`
  query GetProfileSettings {
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
  const { data, loading } = useQuery<GetProfileSettingsQuery>(
    PROFILE_SETTINGS_QUERY
  )

  if (loading) {
    return <PageLoading message="Loading settings" />
  }

  return <ProfileSettingsForm currentUser={data?.me as User} />
}

export default ProfileSettings
