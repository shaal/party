import { gql, useQuery } from '@apollo/client'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import Footer from '@components/shared/Footer'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import AppContext from '@components/utils/AppContext'
import React, { useContext } from 'react'
import { User } from 'src/__generated__/schema.generated'

import { GetExploreUserQuery } from './__generated__/index.generated'
import ExploreFeed from './Feed'
import Topics from './Topics'

export const GET_EXPLORE_USER_QUERY = gql`
  query GetExploreUserQuery($username: String!) {
    user(username: $username) {
      id
      username
      profile {
        id
        name
        avatar
      }
    }
  }
`

const Explore: React.FC = () => {
  const { currentUser } = useContext(AppContext)
  const { data, loading, error } = useQuery<GetExploreUserQuery>(
    GET_EXPLORE_USER_QUERY,
    {
      variables: { username: currentUser?.username },
      skip: !currentUser
    }
  )

  return (
    <GridLayout>
      <GridItemEight>
        <div className="space-y-3">
          <ExploreFeed />
          <ErrorMessage
            title="Failed to load the current user."
            error={error}
          />
        </div>
      </GridItemEight>
      <GridItemFour>
        <Topics currentUser={currentUser} user={data?.user as User} />
        <Footer />
      </GridItemFour>
    </GridLayout>
  )
}

export default Explore
