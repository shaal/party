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
  const client = initializeApollo({
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

function createIsomorphLink(headers: any) {
  return new HttpLink({
    uri:
      typeof window === 'undefined'
        ? 'http://localhost:3000/api/graphql'
        : '/api/graphql',
    credentials: 'include',
    headers: headers
  })
}

function createApolloClient(headers: any) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(headers),
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

export function useApollo(initialState?: Record<string, any>) {
  const store = useMemo(
    () => initializeApollo({ initialState }),
    [initialState]
  )

  return store
}

export function initializeApollo({ initialState, headers }: ClientOptions) {
  const _apolloClient = apolloClient ?? createApolloClient(headers)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}
