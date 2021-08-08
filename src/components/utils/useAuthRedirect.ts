import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'

export const useAuthRedirect = () => {
  const client = useApolloClient()
  const router = useRouter()

  return () => {
    client.resetStore()
    router.push((router.query.redirect as string) ?? '/')
  }
}
