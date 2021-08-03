import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import { ErrorMessage } from '../ui/ErrorMessage'
import { GridItemEight, GridItemFour, GridLayout } from '../ui/GridLayout'
import React, { Fragment } from 'react'
import Navbar from '../ui/Navbar'
import { Card, CardBody } from '../ui/Card'
import { ProfileQuery } from './__generated__/index.generated'

export const query = gql`
  query ProfileQuery($username: String!) {
    me {
      id
      username
    }
    user(username: $username) {
      id
      username
      profile {
        name
      }
    }
  }
`

export const Profile: React.FC = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery<ProfileQuery>(query, {
    variables: {
      username: router.query.username
    },
    skip: !router.isReady
  })

  return (
    <Fragment>
      <Navbar currentUser={data?.me} />
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
    </Fragment>
  )
}
