import { gql, useQuery } from '@apollo/client'
import React, { Fragment } from 'react'

import { User } from '~/__generated__/schema.generated'
import { PageLoading } from '~/components/ui/PageLoading'

import { SocialSettingsQuery } from './__generated__/social.generated'
import SocialSettings from './SocialSettings'

export const SOCIAL_SETTINGS_QUERY = gql`
  query SocialSettingsQuery {
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
  const { data, loading } = useQuery<SocialSettingsQuery>(SOCIAL_SETTINGS_QUERY)

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
