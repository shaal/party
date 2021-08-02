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
      <Navbar />
      <Container>
        <div className="space-y-6">
          <div className="text-8xl font-bold italic text-center">
            <span className="bg-clip-text">Devparty</span>
          </div>

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
