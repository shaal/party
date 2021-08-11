import { gql, useQuery } from '@apollo/client'
import dynamic from 'next/dynamic'
import React, { Fragment } from 'react'

import { User } from '~/__generated__/schema.generated'
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from '~/components/GridLayout'

import { SettingsQuery } from './__generated__/index.generated'

const AccountSettings = dynamic(() => import('./AccountSettings'), {
  // eslint-disable-next-line react/display-name
  loading: () => <Loading />
})

const SocialSettings = dynamic(() => import('./SocialSettings'))

const Loading = () => (
  <GridLayout>
    <GridItemFour>
      <div className="shimmer rounded-lg h-10"></div>
    </GridItemFour>
    <GridItemEight>
      <div className="shimmer rounded-lg h-10"></div>
    </GridItemEight>
  </GridLayout>
)

export const SETTINGS_QUERY = gql`
  query SettingsQuery {
    me {
      id
      username
      email
      profile {
        name
        bio
        location
        avatar
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

  return (
    <Fragment>
      <AccountSettings currentUser={data?.me as User} />
      <SocialSettings currentUser={data?.me as User} />
    </Fragment>
  )
}

export default Settings
