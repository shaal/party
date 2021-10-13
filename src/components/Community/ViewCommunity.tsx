import { gql, useQuery } from '@apollo/client'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import DevpartySEO from '@components/shared/SEO'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { PageLoading } from '@components/ui/PageLoading'
import { useRouter } from 'next/router'
import React from 'react'
import { Community } from 'src/__generated__/schema.generated'
import Custom404 from 'src/pages/404'

import { CommunityQuery } from './__generated__/ViewCommunity.generated'
import Details from './Details'

export const COMMUNITY_QUERY = gql`
  query CommunityQuery($slug: String!) {
    community(slug: $slug) {
      id
      name
      slug
      avatar
      description
      hasJoined
      owner {
        id
        username
        profile {
          id
          avatar
        }
      }
      members {
        totalCount
      }
    }
  }
`

const ViewCommunity: React.FC = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery<CommunityQuery>(COMMUNITY_QUERY, {
    variables: { slug: router.query.slug },
    skip: !router.isReady
  })
  const community = data?.community

  if (!router.isReady || loading)
    return <PageLoading message="Loading community" />

  if (!community) return <Custom404 />

  return (
    <GridLayout>
      <DevpartySEO
        title={`${community?.slug} (${community?.name}) · Devparty`}
        description={community?.description as string}
        image={community?.avatar as string}
        path={`/products/${community?.slug}`}
      />
      <GridItemFour>
        <Details community={community as Community} />
      </GridItemFour>
      <GridItemEight>
        <div className="space-y-5">
          <ErrorMessage title="Failed to load post" error={error} />
        </div>
      </GridItemEight>
    </GridLayout>
  )
}

export default ViewCommunity
