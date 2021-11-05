import { gql, useQuery } from '@apollo/client'
import { PageLoading } from '@components/UI/PageLoading'
import { GetSocialSettingsQuery, User } from '@graphql/types.generated'
import React from 'react'

import SocialSettingsForm from './Form'

export const SOCIAL_SETTINGS_QUERY = gql`
  query GetSocialSettings {
    me {
      id
      profile {
        id
        website
        twitter
        github
        discord
      }
    }
  }
`

const SocialSettings: React.FC = () => {
  const { data, loading } = useQuery<GetSocialSettingsQuery>(
    SOCIAL_SETTINGS_QUERY
  )

  if (loading) {
    return <PageLoading message="Loading settings" />
  }

  return <SocialSettingsForm currentUser={data?.me as User} />
}

export default SocialSettings
