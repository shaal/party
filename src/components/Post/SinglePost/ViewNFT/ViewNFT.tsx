import { GridItemSix, GridLayout } from '@components/GridLayout'
import { Button } from '@components/UI/Button'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { Spinner } from '@components/UI/Spinner'
import getWeb3Modal from '@components/utils/getWeb3Modal'
import { useNFT } from '@components/utils/hooks/useNFT'
import { imagekitURL } from '@components/utils/imagekitURL'
import { ethers } from 'ethers'
import { Nft } from 'src/__generated__/schema.generated'
import { ERROR_MESSAGE, NFT_ADDRESS, NFT_MARKET_ADDRESS } from 'src/constants'

import Market from '../../../../../artifacts/contracts/Market.sol/NFTMarket.json'

interface Props {
  nft: Nft
}

const ViewNFT: React.FC<Props> = ({ nft }) => {
  const {
    nft: fetchedNft,
    isLoading,
    isError
  } = useNFT(nft?.address, nft?.tokenId)

  const buyNft = async () => {
    const web3Modal = getWeb3Modal()
    const web3 = new ethers.providers.Web3Provider(await web3Modal.connect())
    const signer = await web3.getSigner()

    const contract = new ethers.Contract(
      NFT_MARKET_ADDRESS as string,
      Market.abi,
      signer
    )

    const price = ethers.utils.parseUnits('1.0', 'ether')
    const transaction = await contract.createMarketSale(
      NFT_ADDRESS as string,
      nft.tokenId,
      { value: price }
    )
    await transaction.wait()
  }

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
          <Button onClick={buyNft}>Buy now</Button>
        </GridItemSix>
      </GridLayout>
    </div>
  )
}

export default ViewNFT
