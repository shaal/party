import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export const useNFT = (address: string, tokenId: string) => {
  const { data, error } = useSWR(
    `https://testnets-api.opensea.io/api/v1/asset/${address}/${tokenId}`,
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
