import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export const useGitCommit = (url: string) => {
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
