import { GetServerSideProps } from 'next'
import { Posts, query } from '~/components/Posts'
import { preloadQuery } from '~/utils/apollo'

// If you don't want to pre-load the data on the server, you can also just use
// the authenticated route helper to simply redirect if the user is not logged
// in, and load the data on the client.
// import { authenticatedRoute } from '~/utils/redirects';
// export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  preloadQuery(ctx, { query })

export default Posts
