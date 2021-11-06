import { gql, useQuery } from '@apollo/client'
import { PageLoading } from '@components/UI/PageLoading'
import { GetTipsSettingsQuery, User } from '@graphql/types.generated'
import React from 'react'

import TipsSettingsForm from './Form'

export const TIPS_SETTINGS_QUERY = gql`
  query GetTipsSettings {
    me {
      id
      tip {
        id
        cash
        paypal
        github
        buymeacoffee
        bitcoin
        ethereum
        solana
      }
    }
  }
`

const TipsSettings: React.FC = () => {
  const { data, loading } = useQuery<GetTipsSettingsQuery>(TIPS_SETTINGS_QUERY)

  if (loading) {
    return <PageLoading message="Loading settings" />
  }

  return <TipsSettingsForm currentUser={data?.me as User} />
}

export default TipsSettings
