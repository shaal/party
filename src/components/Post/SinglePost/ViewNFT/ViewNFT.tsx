import { GridItemSix, GridLayout } from '@components/GridLayout'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { Spinner } from '@components/UI/Spinner'
import { useNFT } from '@components/utils/hooks/useNFT'
import { imagekitURL } from '@components/utils/imagekitURL'
import { Nft } from 'src/__generated__/schema.generated'
import { ERROR_MESSAGE } from 'src/constants'

interface Props {
  nft: Nft
}

const ViewNFT: React.FC<Props> = ({ nft }) => {
  const {
    nft: fetchedNft,
    isLoading,
    isError
  } = useNFT(nft?.address, nft?.tokenId)

  if (isLoading)
    return (
      <div className="p-5 font-bold text-center space-y-2">
        <Spinner size="md" className="mx-auto" />
        <div>Loading NFT</div>
      </div>
    )

  if (isError)
    return (
      <div className="p-5">
        <ErrorMessage
          title={ERROR_MESSAGE}
          error={{
            name: 'The NFT is distributing accross the network, please try again after sometime!',
            message:
              'The NFT is distributing accross the network, please try again! after sometime'
          }}
        />
      </div>
    )

  const metadata = JSON.parse(fetchedNft?.metadata)

  return (
    <div className="px-5 py-3.5 space-y-3">
      <GridLayout className="!p-0">
        <GridItemSix>
          <div className="aspect-w-16 aspect-h-12">
            <img
              className="rounded-lg object-cover bg-gray-100 dark:bg-gray-800 border dark:border-gray-800"
              src={imagekitURL(metadata?.image)}
              alt={fetchedNft?.token_address}
            />
          </div>
        </GridItemSix>
        <GridItemSix className="space-y-3">
          <div className="text-xl font-bold">{metadata?.name}</div>
        </GridItemSix>
      </GridLayout>
    </div>
  )
}

export default ViewNFT
