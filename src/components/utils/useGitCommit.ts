import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

/**
 * Get a commit data from GitHub
 * @param url - Git commit URL
 * @returns a commit data from GitHub
 */
export const useGitCommit = (url: string): {commit: error;
slug: string;
isLoading: boolean;
isError: any;
}  => {
  const splitedURL = new URL(url).pathname.split('/')

  const { data, error } = useSWR(
    `https://api.github.com/repos/${splitedURL[1]}/${splitedURL[2]}/commits/${splitedURL[4]}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  return {
    commit: data,
    slug: `${splitedURL[1]}/${splitedURL[2]}`,
    isLoading: !error && !data,
    isError: error || data?.message
  }
}
