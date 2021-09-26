import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'

let apolloClient: ApolloClient<any>

interface ClientOptions {
  headers?: Record<string, string>
  initialState?: Record<string, any>
}

export function useApollo(initialState?: Record<string, any>) {
  const client = createApolloClient({ initialState })

  return client
}

export function createApolloClient({ initialState, headers }: ClientOptions) {
  let nextClient = apolloClient
  const ssrMode = typeof window === 'undefined'

  const httpLink = new HttpLink({
    uri: ssrMode
      ? process.env.VERCEL
        ? `https://${process.env.VERCEL_URL}/api/graphql`
        : `http://localhost:3000/api/graphql`
      : '/api/graphql',
    headers: headers,
    credentials: 'include'
  })

  if (!nextClient) {
    nextClient = new ApolloClient({
      ssrMode,
      link: httpLink,
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              posts: relayStylePagination([]),
              users: relayStylePagination([]),
              homeFeed: relayStylePagination(['type']),
              exploreFeed: relayStylePagination([]),
              replies: relayStylePagination([]),
              notifications: relayStylePagination(['isRead'])
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
