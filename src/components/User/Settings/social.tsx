import { gql, useQuery } from '@apollo/client'
import React, { Fragment } from 'react'

import { User } from '~/__generated__/schema.generated'
import { PageLoading } from '~/components/ui/PageLoading'

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

const SocialSettingsPage: React.FC = () => {
  const { data, loading } = useQuery<SettingsQuery>(SETTINGS_QUERY)

  if (loading) {
    return <PageLoading message="Loading settings..." />
  }

  return (
    <Fragment>
      <SocialSettings currentUser={data?.me as User} />
    </Fragment>
  )
}

export default SocialSettingsPage
