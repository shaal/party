import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import { Card, CardBody } from '../ui/Card'
import { ErrorMessage } from '../ui/ErrorMessage'
import { TopicQuery } from './__generated__/ViewTopic.generated'
import TopicFeed from './Feed'

export const TOPIC_QUERY = gql`
  query TopicQuery($name: String!) {
    topic(name: $name) {
      id
      name
    }
  }
`

const ViewTopic: React.FC = () => {
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
            <ErrorMessage title="Failed to load post" error={error} />
            {data?.topic?.name}
          </CardBody>
        </Card>
      </GridItemFour>
    </GridLayout>
  )
}

export default ViewTopic
