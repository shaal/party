import ViewTopic, {
  TOPIC_QUERY as query
} from '../../components/Topics/ViewTopic'
import { preloadQuery } from '../../utils/apollo'

export const getServerSideProps = async (ctx: any) => {
  return preloadQuery(ctx, {
    query,
    variables: {
      name: ctx.params!.topic
    }
  })
}

export default ViewTopic
