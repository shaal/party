import { gql, useQuery } from '@apollo/client'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import PostShimmer from '@components/shared/Shimmer/PostShimmer'
import UserProfileShimmer from '@components/shared/Shimmer/UserProfileShimmer'
import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { CubeIcon } from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'

import { CommunitiesQuery } from './__generated__/Communities.generated'

const Footer = dynamic(() => import('@components/shared/Footer'))

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
    <GridLayout>
      <GridItemEight>
        <Card>
          <CardBody className="space-y-6">
            <ErrorMessage title="Failed to load communities" error={error} />
            WIP
          </CardBody>
        </Card>
      </GridItemEight>
      <GridItemFour>
        <Card>
          <CardBody className="space-y-3">
            <div>
              Launch a new community to Devparty and socialize with your
              favorite developers
            </div>
            <Link href="/communities/new" passHref>
              <Button icon={<CubeIcon className="h-4 w-4" />}>
                <div>Create new community</div>
              </Button>
            </Link>
          </CardBody>
        </Card>
        <Footer />
      </GridItemFour>
    </GridLayout>
  )
}

export default Communities
