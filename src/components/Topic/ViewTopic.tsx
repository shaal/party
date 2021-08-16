import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import { Topic } from '../../__generated__/schema.generated'
import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
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
            <ErrorMessage title="Failed to load post" error={error} />
            {data?.topic?.name}
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
