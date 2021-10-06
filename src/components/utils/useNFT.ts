import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export const useNFT = (address: string, tokenId: string) => {
  const { data, error } = useSWR(
    `/api/nft?address=${address}&tokenId=${tokenId}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      isPaused: () => {
        return !address
      }
    }
  )

  return {
    nft: data,
    isLoading: !error && !data,
    isError: error
  }
}
