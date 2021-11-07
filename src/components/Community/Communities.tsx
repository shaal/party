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
import { Button } from '@components/UI/Button'
import { Card, CardBody } from '@components/UI/Card'
import { GetCommunitiesQuery } from '@graphql/types.generated'
import { CubeIcon, FireIcon, TrendingUpIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'

export const GET_COMMUNITIES_QUERY = gql`
  query GetCommunities {
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
  const { loading } = useQuery<GetCommunitiesQuery>(GET_COMMUNITIES_QUERY)

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
              <Link href="/communities/new">
                <a href="/communities/new">
                  <Button icon={<CubeIcon className="h-4 w-4" />}>
                    <div>New community</div>
                  </Button>
                </a>
              </Link>
            </CardBody>
          </Card>
        </GridItemTwelve>
      </GridLayout>
      <GridLayout className="flex-grow-0">
        <GridItemSix>
          <Card>
            <CardBody className="space-y-3">
              <Card forceRounded>
                <CardBody className="space-y-2">
                  <div className="text-xl flex items-center space-x-2">
                    <TrendingUpIcon className="h-6 w-6" />
                    <div>Fastest Growing</div>
                  </div>
                  <div className="text-gray-500">
                    Up-and-coming communities whose membership counts grew
                    highest percentage in the past week.
                  </div>
                </CardBody>
              </Card>
              <div>WIP</div>
            </CardBody>
          </Card>
        </GridItemSix>
        <GridItemSix>
          <Card>
            <CardBody className="space-y-3">
              <Card forceRounded>
                <CardBody className="space-y-2">
                  <div className="text-xl flex items-center space-x-2">
                    <FireIcon className="h-6 w-6" />
                    <div>Most Popular</div>
                  </div>
                  <div className="text-gray-500">
                    Extremely active communities with the most people making
                    posts and comments in the past week.
                  </div>
                </CardBody>
              </Card>
              <div>WIP</div>
            </CardBody>
          </Card>
        </GridItemSix>
      </GridLayout>
    </>
  )
}

export default Communities
