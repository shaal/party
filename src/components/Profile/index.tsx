import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import { Card, CardBody } from '../ui/Card'
import { ErrorMessage } from '../ui/ErrorMessage'
import { ProfileQuery } from './__generated__/index.generated'

export const query = gql`
  query ProfileQuery($username: String!) {
    user(username: $username) {
      id
      username
      profile {
        name
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

  return (
    <GridLayout>
      <GridItemFour>
        <ErrorMessage title="Failed to load post" error={error} />
        {data?.user?.username}
      </GridItemFour>
      <GridItemEight>
        <Card>
          <CardBody>WIP</CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default Profile
