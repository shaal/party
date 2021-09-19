import ViewTopic, { TOPIC_QUERY as query } from '@components/Topic/ViewTopic'
import { preloadQuery } from '@utils/apollo'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return preloadQuery(context, {
    query,
    variables: { name: context.params!.topic }
  })
}

export default ViewTopic
