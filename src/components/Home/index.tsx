import { gql, useQuery } from '@apollo/client'
import React, { Fragment } from 'react'
import { Card, CardBody } from '../ui/Card'
import { ErrorMessage } from '../ui/ErrorMessage'
import { GridItemEight, GridItemFour, GridLayout } from '../ui/GridLayout'
import Navbar from '../ui/Navbar'
import { Shimmer } from '../ui/Shimmer'
import { HomeQuery } from './__generated__/index.generated'

export const query = gql`
  query HomeQuery {
    me {
      id
      username
    }
  }
`

export const Home: React.FC = () => {
  const { data, loading, error } = useQuery<HomeQuery>(query)

  return (
    <Fragment>
      <Navbar currentUser={data?.me} />
      <GridLayout>
        <GridItemEight>
          <Card>
            <CardBody>
              <div className="space-y-6">
                {loading && <Shimmer />}

                <ErrorMessage
                  title="Failed to load the current user."
                  error={error}
                />
              </div>
            </CardBody>
          </Card>
        </GridItemEight>
        <GridItemFour>
          <Card>
            <CardBody>WIP</CardBody>
          </Card>
        </GridItemFour>
      </GridLayout>
    </Fragment>
  )
}
