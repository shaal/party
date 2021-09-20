import {
  ApolloClient,
  ApolloError,
  HttpLink,
  InMemoryCache,
  QueryOptions
} from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

let apolloClient: ApolloClient<any>

interface ClientOptions {
  headers?: Record<string, string>
  initialState?: Record<string, any>
}

export async function preloadQuery(
  context: GetServerSidePropsContext,
  ...queries: QueryOptions[]
): Promise<GetServerSidePropsResult<{}>> {
  const client = createApolloClient({
    headers: context.req.headers as Record<string, string>
  })

  try {
    await Promise.all(queries.map((queryOptions) => client.query(queryOptions)))

    return {
      props: {
        initialClientState: client.cache.extract()
      }
    }
  } catch (error: any) {
    if (error instanceof ApolloError) {
      const notFoundError = error.graphQLErrors.find((error: Error) => {
        return (error as any)?.extensions.code === 404
      })

      if (notFoundError) {
        return { notFound: true }
      }
    }

    return { props: {} }
  }
}

export function useApollo(initialState?: Record<string, any>) {
  const client = createApolloClient({ initialState })

  return client
}

export function createApolloClient({ initialState, headers }: ClientOptions) {
  let nextClient = apolloClient
  const ssrMode = typeof window === 'undefined'

  if (!nextClient) {
    nextClient = new ApolloClient({
      ssrMode,
      credentials: 'include',
      link: new HttpLink({
        uri: ssrMode
          ? process.env.VERCEL
            ? `https://${process.env.VERCEL_URL}/api/graphql`
            : `http://localhost:3000/api/graphql`
          : '/api/graphql',
        headers: headers
      }),
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              posts: relayStylePagination([]),
              users: relayStylePagination([]),
              homeFeed: relayStylePagination(['type']),
              exploreFeed: relayStylePagination([]),
              replies: relayStylePagination([]),
              notifications: relayStylePagination([])
            }
          },
          Topic: {
            fields: {
              posts: relayStylePagination()
            }
          },
          User: {
            fields: {
              posts: relayStylePagination([]),
              following: relayStylePagination([]),
              followers: relayStylePagination([])
            }
          },
          Product: {
            fields: {
              posts: relayStylePagination([])
            }
          },
          Post: {
            fields: {
              replies: relayStylePagination([])
            }
          }
        }
      })
    })
  }

  if (initialState) {
    const existingCache = nextClient.extract()
    nextClient.cache.restore({ ...existingCache, ...initialState })
  }

  if (ssrMode) return nextClient

  if (!apolloClient) apolloClient = nextClient

  return nextClient
}
