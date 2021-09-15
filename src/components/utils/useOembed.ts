import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export const useOembed = (url: string | null | undefined) => {
  // TODO: Disable Refresh
  const { data, error } = useSWR(`/api/oembed?url=${url}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })

  return {
    oembed: data,
    isLoading: !error && !data,
    isError: error || data?.status === 'error' || !data?.title
  }
}
