import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

/**
 * Get a single NFT from opensea
 * @param address - NFT's hash address
 * @param tokenId - NFT's Token ID
 * @returns a NFT from opensea
 */
export const useNFT = (address: string, tokenId: string): {nft: error;
isLoading: boolean;
isError: any;
}  => {
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
    isError: error || data?.detail
  }
}
