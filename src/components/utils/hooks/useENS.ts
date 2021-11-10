import { User } from '@graphql/types.generated'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

/**
 * Get a issue data from GitHub
 * @param url - GitHub issue URL
 * @returns a issue data from GitHub
 */
export const useENS = (user: User): { name: any } => {
  const { data } = useSWR(
    `/api/utils/getENS?address=${user?.integrations?.ethAddress}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      isPaused: () => {
        return !user?.integrations?.ethAddress
      }
    }
  )

  return { name: data?.name }
}
