import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'

export function useAuthRedirect() {
  const client = useApolloClient()
  const router = useRouter()

  return () => {
    client.resetStore()
    router.push((router.query.redirect as string) ?? '/')
  }
}
