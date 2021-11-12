import { gql, useQuery } from '@apollo/client'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import DevpartySEO from '@components/shared/SEO'
import { Card, CardBody } from '@components/UI/Card'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { PageLoading } from '@components/UI/PageLoading'
import Details from '@components/User/Details'
import { imagekitURL } from '@components/utils/imagekitURL'
import {
  GetProfileReadmeQuery,
  GetUserQuery,
  User
} from '@graphql/types.generated'
import Markdown from 'markdown-to-jsx'
import { useRouter } from 'next/router'
import React from 'react'
import Custom404 from 'src/pages/404'

import PageType from '../PageType'
import { GET_USER_QUERY } from '../ViewUser'

export const GET_PROFILE_README_QUERY = gql`
  query GetProfileReadme($username: String!) {
    user(username: $username) {
      profile {
        readme
      }
    }
  }
`

const Readme: React.FC = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery<GetUserQuery>(GET_USER_QUERY, {
    variables: { username: router.query.username },
    skip: !router.isReady
  })
  const {
    data: readmeData,
    loading: readmeLoading,
    error: readmeError
  } = useQuery<GetProfileReadmeQuery>(GET_PROFILE_README_QUERY, {
    variables: { username: router.query.username },
    skip: !router.isReady
  })
  const user = data?.user

  if (!router.isReady || loading)
    return <PageLoading message="Loading README" />

  if (!user) return <Custom404 />

  return (
    <>
      <DevpartySEO
        title={`${user?.username} (${user?.profile?.name}) / README · Devparty`}
        description={user?.profile?.bio as string}
        image={user?.profile?.avatar as string}
        path={`/u/${user?.username}`}
      />
      <div
        className="h-64"
        style={{
          backgroundImage: `url(${imagekitURL(
            user?.profile?.cover as string
          )})`,
          backgroundColor: `#${user?.profile?.coverBg}`,
          backgroundSize: '60%'
        }}
      />
      <GridLayout>
        <GridItemFour>
          <ErrorMessage title="Failed to load post" error={error} />
          <Details user={user as User} />
        </GridItemFour>
        <GridItemEight className="space-y-5">
          <PageType user={user as User} />
          <Card>
            <CardBody>
              {readmeLoading ? (
                <div className="shimmer h-10 w-full rounded-lg" />
              ) : readmeData?.user?.profile?.readme ? (
                <div className="prose">
                  <Markdown options={{ wrapper: 'article' }}>
                    {readmeData?.user?.profile?.readme}
                  </Markdown>
                </div>
              ) : (
                <div>No README</div>
              )}
            </CardBody>
          </Card>
        </GridItemEight>
      </GridLayout>
    </>
  )
}

export default Readme
