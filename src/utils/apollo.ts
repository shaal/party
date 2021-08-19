import {
  ApolloClient,
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
    const notFoundError = error.graphQLErrors.find((error: Error) => {
      return (error as any)?.extensions.code === 404
    })

    if (notFoundError) {
      return {
        notFound: true
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
  let nextClient = apolloClient

  if (!nextClient) {
    nextClient = new ApolloClient({
      ssrMode: typeof window === 'undefined',
      credentials: 'include',
      link: new HttpLink({
        uri:
          typeof window === 'undefined'
            ? 'http://localhost:3000/api/graphql'
            : '/api/graphql',
        headers: headers
      }),
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              posts: relayStylePagination(),
              homeFeed: relayStylePagination(),
              replies: relayStylePagination()
            }
          },
          Topic: {
            fields: {
              posts: relayStylePagination()
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
  if (typeof window === 'undefined') return nextClient
  if (!apolloClient) apolloClient = nextClient

  return nextClient
}
