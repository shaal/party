import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

/**
 * Get a issue data from GitHub
 * @param url - GitHub issue URL
 * @returns a issue data from GitHub
 */
export const useIssue = (
  url: string
): { issue: any; slug: string; isLoading: boolean; isError: any } => {
  const splitedURL = new URL(url).pathname.split('/')

  const { data, error } = useSWR(
    `https://api.github.com/repos/${splitedURL[1]}/${splitedURL[2]}/issues/${splitedURL[4]}`,
    fetcher
  )

  return {
    issue: data,
    slug: `${splitedURL[1]}/${splitedURL[2]}`,
    isLoading: !error && !data,
    isError: error || data?.message
  }
}
