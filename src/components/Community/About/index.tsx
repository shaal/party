import { useQuery } from '@apollo/client'
import Details from '@components/Community/Details'
import {
  GridItemEight,
  GridItemFour,
  GridItemTwelve,
  GridLayout
} from '@components/GridLayout'
import DevpartySEO from '@components/shared/SEO'
import { Card, CardBody } from '@components/ui/Card'
import { PageLoading } from '@components/ui/PageLoading'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Community } from 'src/__generated__/schema.generated'
import Custom404 from 'src/pages/404'

import { ViewCommunityQuery } from '../__generated__/ViewCommunity.generated'
import Rules from '../Rules'
import { VIEW_COMMUNITY_QUERY } from '../ViewCommunity'

export const COMMUNITY_ABOUT_QUERY = VIEW_COMMUNITY_QUERY

const About: React.FC = () => {
  const router = useRouter()
  const { data, loading } = useQuery<ViewCommunityQuery>(
    COMMUNITY_ABOUT_QUERY,
    {
      variables: { slug: router.query.slug },
      skip: !router.isReady
    }
  )
  const community = data?.community

  if (!router.isReady || loading)
    return <PageLoading message="Loading members" />

  if (!community) return <Custom404 />

  return (
    <>
      <DevpartySEO
        title={`${community?.slug} (${community?.name}) members · Devparty`}
        description={community?.description as string}
        image={community?.avatar as string}
        path={`/products/${community?.slug}`}
      />
      <GridLayout className="flex-grow-0 pb-0">
        <GridItemTwelve>
          <Details community={community as Community} />
        </GridItemTwelve>
      </GridLayout>
      <GridLayout className="flex-grow-0 pt-0">
        <GridItemEight>
          <Card>
            <CardBody>WIP</CardBody>
            <div className="px-5 py-2 space-y-1">
              <div className="text-lg font-bold">Rules</div>
              <div className="text-sm text-gray-500 linkify">
                These are set and enforced by Community admins and are in
                addition to{' '}
                <Link href="/terms">
                  <a href="/terms">Devparty's rules</a>
                </Link>
                .
              </div>
            </div>
            <Rules
              community={community as Community}
              showCardAndHeading={false}
            />
          </Card>
        </GridItemEight>
        <GridItemFour>
          <Rules community={community as Community} />
        </GridItemFour>
      </GridLayout>
    </>
  )
}

export default About
