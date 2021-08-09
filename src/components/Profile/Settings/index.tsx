import { gql, useQuery } from '@apollo/client'
import dynamic from 'next/dynamic'
import React, { Fragment, useContext } from 'react'

import { User } from '~/__generated__/schema.generated'
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from '~/components/GridLayout'
import AppContext from '~/components/utils/AppContext'

import { SettingsQuery } from './__generated__/index.generated'

const AccountSettings = dynamic(() => import('./AccountSettings'), {
  // eslint-disable-next-line react/display-name
  loading: () => <Loading />
})

const SocialSettings = dynamic(() => import('./SocialSettings'), {
  // eslint-disable-next-line react/display-name
  loading: () => <Loading />
})

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

export const query = gql`
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
  const { currentUser } = useContext(AppContext)
  const { data, loading } = useQuery<SettingsQuery>(query)

  if (loading) return <div>Loading...</div>
  // TODO: Redirect to 404
  if (!currentUser) return <div>Forbidden...</div>

  return (
    <Fragment>
      <AccountSettings currentUser={data?.me as User} />
      <SocialSettings currentUser={data?.me as User} />
    </Fragment>
  )
}

export default Settings
