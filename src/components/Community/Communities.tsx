import { gql, useQuery } from '@apollo/client'
import {
  GridItemEight,
  GridItemFour,
  GridItemSix,
  GridItemTwelve,
  GridLayout
} from '@components/GridLayout'
import PostShimmer from '@components/shared/Shimmer/PostShimmer'
import UserProfileShimmer from '@components/shared/Shimmer/UserProfileShimmer'
import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import { CubeIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'

import { CommunitiesQuery } from './__generated__/Communities.generated'

export const COMMUNITIES_QUERY = gql`
  query CommunitiesQuery {
    products {
      edges {
        node {
          id
          name
          slug
          avatar
          description
        }
      }
    }
  }
`

const Communities: React.FC = () => {
  const { loading, error } = useQuery<CommunitiesQuery>(COMMUNITIES_QUERY)

  if (loading)
    return (
      <GridLayout>
        <GridItemEight>
          <PostShimmer />
        </GridItemEight>
        <GridItemFour>
          <Card>
            <CardBody>
              <UserProfileShimmer showFollow />
            </CardBody>
          </Card>
        </GridItemFour>
      </GridLayout>
    )

  return (
    <>
      <GridLayout className="flex-grow-0 pb-0">
        <GridItemTwelve>
          <Card>
            <CardBody className="space-y-3">
              <Link href="/communities/new" passHref>
                <Button icon={<CubeIcon className="h-4 w-4" />}>
                  <div>New community</div>
                </Button>
              </Link>
            </CardBody>
          </Card>
        </GridItemTwelve>
      </GridLayout>
      <GridLayout className="flex-grow-0">
        <GridItemSix>
          <Card>
            <CardBody className="space-y-3">WIP</CardBody>
          </Card>
        </GridItemSix>
        <GridItemSix>
          <Card>
            <CardBody className="space-y-3">WIP</CardBody>
          </Card>
        </GridItemSix>
      </GridLayout>
    </>
  )
}

export default Communities
