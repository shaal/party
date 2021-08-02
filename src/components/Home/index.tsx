import { gql, useQuery } from '@apollo/client'
import { Fragment } from 'react'
import { ErrorMessage } from '../ui/ErrorMessage'
import { GridLayout } from '../ui/GridLayout'
import Navbar from '../ui/Navbar'
import { Shimmer } from '../ui/Shimmer'
import { UserInfo, UserInfoFragment } from './UserInfo'
import { HomeQuery } from './__generated__/index.generated'

export const query = gql`
  query HomeQuery {
    me {
      id
      username
      ...UserInfo_user
    }
  }

  ${UserInfoFragment}
`

export function Home() {
  const { data, loading, error } = useQuery<HomeQuery>(query)

  return (
    <Fragment>
      <Navbar currentUser={data?.me} />
      <GridLayout>
        <div className="space-y-6">
          {loading && <Shimmer />}

          <ErrorMessage
            title="Failed to load the current user."
            error={error}
          />

          {data && data.me && <UserInfo user={data?.me} />}
        </div>
      </GridLayout>
    </Fragment>
  )
}
