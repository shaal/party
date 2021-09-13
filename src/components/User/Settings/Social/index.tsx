import { gql, useQuery } from '@apollo/client'
import React from 'react'

import { User } from '~/__generated__/schema.generated'
import { PageLoading } from '~/components/ui/PageLoading'

import { SocialSettingsQuery } from './__generated__/index.generated'
import SocialSettingsForm from './Form'

export const SOCIAL_SETTINGS_QUERY = gql`
  query SocialSettingsQuery {
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
  const { data, loading } = useQuery<SocialSettingsQuery>(SOCIAL_SETTINGS_QUERY)

  if (loading) {
    return <PageLoading message="Loading settings" />
  }

  return <SocialSettingsForm currentUser={data?.me as User} />
}

export default SocialSettings
