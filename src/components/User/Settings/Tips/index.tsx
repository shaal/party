import { gql, useQuery } from '@apollo/client'
import { PageLoading } from '@components/UI/PageLoading'
import React from 'react'
import { User } from 'src/__generated__/schema.generated'

import { TipsSettingsQuery } from './__generated__/index.generated'
import TipsSettingsForm from './Form'

export const TIPS_SETTINGS_QUERY = gql`
  query TipsSettingsQuery {
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
      }
    }
  }
`

const TipsSettings: React.FC = () => {
  const { data, loading } = useQuery<TipsSettingsQuery>(TIPS_SETTINGS_QUERY)

  if (loading) {
    return <PageLoading message="Loading settings" />
  }

  return <TipsSettingsForm currentUser={data?.me as User} />
}

export default TipsSettings
