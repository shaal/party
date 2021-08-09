import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'

import { User } from '~/__generated__/schema.generated'
import Posts from '~/pages/posts'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import { ErrorMessage } from '../ui/ErrorMessage'
import { ProfileQuery } from './__generated__/index.generated'
import Details from './Details'

export const query = gql`
  query ProfileQuery($username: String!) {
    user(username: $username) {
      id
      username
      profile {
        avatar
        name
        bio
        location
        website
        twitter
        github
        discord
      }
    }
  }
`

const Profile: React.FC = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery<ProfileQuery>(query, {
    variables: {
      username: router.query.username
    },
    skip: !router.isReady
  })

  if (loading) return <div>Loading...</div>

  return (
    <Fragment>
      <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-60 w-full" />
      <GridLayout>
        <GridItemFour>
          <ErrorMessage title="Failed to load post" error={error} />
          <Details user={data?.user as User} />
        </GridItemFour>
        <GridItemEight>
          <Posts user={data?.user as User} />
        </GridItemEight>
      </GridLayout>
    </Fragment>
  )
}

export default Profile
