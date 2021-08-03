import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import { ErrorMessage } from '../ui/ErrorMessage'
import { GridItemEight, GridItemFour, GridLayout } from '../ui/GridLayout'
import { Fragment } from 'react'
import Navbar from '../ui/Navbar'
import { Card, CardBody } from '../ui/Card'
import { ProfileQuery } from './__generated__/index.generated'

export const query = gql`
  query ProfileQuery($id: ID!) {
    me {
      id
      username
    }
    user(id: $id) {
      id
      username
      profile {
        name
      }
    }
  }
`

export function Profile() {
  const router = useRouter()
  const { data, loading, error } = useQuery<ProfileQuery>(query, {
    variables: {
      id: router.query.postId
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
