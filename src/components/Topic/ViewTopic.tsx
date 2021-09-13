import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import { Topic } from '~/__generated__/schema.generated'
import Slug from '~/components/shared/Slug'
import { Card, CardBody } from '~/components/ui/Card'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import AppContext from '~/components/utils/AppContext'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import { TopicQuery } from './__generated__/ViewTopic.generated'
import TopicFeed from './Feed'
import TopicMod from './Mod'
import Star from './Star'

export const TOPIC_QUERY = gql`
  query TopicQuery($name: String!) {
    topic(name: $name) {
      id
      name
      image
      description
      postsCount
      hasStarted
    }
  }
`

const ViewTopic: React.FC = () => {
  const { currentUser, staffMode } = useContext(AppContext)
  const router = useRouter()
  const { data, loading, error } = useQuery<TopicQuery>(TOPIC_QUERY, {
    variables: {
      name: router.query.topic
    },
    skip: !router.isReady
  })

  return (
    <GridLayout>
      <GridItemEight>
        <TopicFeed topic={data?.topic?.name as string} />
      </GridItemEight>
      <GridItemFour>
        <Card>
          <CardBody>
            <div className="space-y-3">
              <ErrorMessage title="Failed to load post" error={error} />
              {data?.topic?.image && (
                <img
                  src={data?.topic?.image}
                  alt={data?.topic?.name}
                  className="h-20 w-20 rounded-lg"
                />
              )}
              <div>
                {loading ? (
                  <div className="shimmer h-6 w-full rounded-md" />
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <Slug
                        slug={data?.topic?.name}
                        prefix="#"
                        className="text-xl"
                      />
                      <Star topic={data?.topic as Topic} />
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {data?.topic?.postsCount} Posts
                    </div>
                  </>
                )}
              </div>
              {data?.topic?.description && (
                <div>{data?.topic?.description}</div>
              )}
            </div>
          </CardBody>
        </Card>
        {currentUser?.isStaff && staffMode && (
          <TopicMod topic={data?.topic as Topic} />
        )}
      </GridItemFour>
    </GridLayout>
  )
}

export default ViewTopic
