import { gql, useQuery } from '@apollo/client'
import { Fragment } from 'react'
import { Container } from '../ui/Container'
import { ErrorMessage } from '../ui/ErrorMessage'
import { Link } from '../ui/Link'
import Navbar from '../ui/Navbar'
import { Shimmer } from '../ui/Shimmer'
import { SignedOut } from './SignedOut'
import { UserInfo, UserInfoFragment } from './UserInfo'
import { HomeQuery } from './__generated__/index.generated'

export const query = gql`
  query HomeQuery {
    me {
      id
      name
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
      <Container>
        <div className="space-y-6">
          {loading && <Shimmer />}

          <ErrorMessage
            title="Failed to load the current user."
            error={error}
          />

          {data && (data.me ? <UserInfo user={data?.me} /> : <SignedOut />)}
        </div>
      </Container>
    </Fragment>
  )
}
