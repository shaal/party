import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export const useOembed = (url: string | null | undefined) => {
  const { data, error } = useSWR(`/api/oembed?url=${url}`, fetcher)

  return {
    oembed: data,
    isLoading: !error && !data,
    isError: error
  }
}
