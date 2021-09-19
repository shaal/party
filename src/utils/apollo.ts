import {
  ApolloClient,
  ApolloError,
  HttpLink,
  InMemoryCache,
  QueryOptions
} from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { useMemo } from 'react'

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
  const client = useMemo(
    () => createApolloClient({ initialState }),
    [initialState]
  )

  return client
}

export function createApolloClient({ initialState, headers }: ClientOptions) {
  const ssrMode = typeof window === 'undefined'
  let nextClient = apolloClient

  console.log(!nextClient)

  if (!nextClient) {
    nextClient = new ApolloClient({
      ssrMode,
      credentials: 'include',
      link: new HttpLink({
        uri: ssrMode ? 'http://localhost:3000/api/graphql' : '/api/graphql',
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

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    const existingCache = nextClient.extract()
    nextClient.cache.restore({ ...existingCache, ...initialState })
  }

  // For SSG and SSR always create a new Apollo Client
  if (ssrMode) return nextClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = nextClient

  return nextClient
}
