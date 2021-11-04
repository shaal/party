import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

/**
 * Get a issue data from GitHub
 * @param url - GitHub issue URL
 * @returns a issue data from GitHub
 */
export const useIssue = (
  url: string
): { issue: any; isLoading: boolean; isError: any } => {
  const splitedURL = new URL(url).pathname.split('/')

  const { data, error } = useSWR(
    `/api/utils/getIssue?owner=${splitedURL[1]}&repo=${splitedURL[2]}&id=${splitedURL[4]}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  return {
    issue: data,
    isLoading: !error && !data,
    isError: error || data?.message
  }
}
