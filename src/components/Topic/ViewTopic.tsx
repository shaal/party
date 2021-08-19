import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import { Topic } from '../../__generated__/schema.generated'
import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import Slug from '../shared/Slug'
import { Card, CardBody } from '../ui/Card'
import { ErrorMessage } from '../ui/ErrorMessage'
import AppContext from '../utils/AppContext'
import { TopicQuery } from './__generated__/ViewTopic.generated'
import TopicFeed from './Feed'
import TopicMod from './Mod'

export const TOPIC_QUERY = gql`
  query TopicQuery($name: String!) {
    topic(name: $name) {
      id
      name
      image
      description
      postsCount
    }
  }
`

const ViewTopic: React.FC = () => {
  const { currentUser, staffMode } = useContext(AppContext)
  const router = useRouter()
  const { data, error } = useQuery<TopicQuery>(TOPIC_QUERY, {
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
                <Slug slug={data?.topic?.name} prefix="#" className="text-xl" />
                <div className="text-gray-600 dark:text-gray-300">
                  {data?.topic?.postsCount} Posts
                </div>
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
