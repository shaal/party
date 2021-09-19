import ViewTopic, { TOPIC_QUERY as query } from '@components/Topic/ViewTopic'
import { preloadQuery } from '@utils/apollo'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return preloadQuery(ctx, {
    query,
    variables: { name: ctx.params!.topic }
  })
}

export default ViewTopic
