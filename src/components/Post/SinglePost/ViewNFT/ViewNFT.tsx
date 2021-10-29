import { Button } from '@components/UI/Button'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import getWeb3Modal from '@components/utils/getWeb3Modal'
import { useNFT } from '@components/utils/hooks/useNFT'
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

  if (isLoading) return <div>Loading NFT...</div>

  const metadata = JSON.parse(fetchedNft?.metadata)

  return (
    <div className="px-5 py-3.5 space-y-3">
      <ErrorMessage title={ERROR_MESSAGE} error={isError} />
      {JSON.stringify(metadata, null, 2)}
      <Button onClick={buyNft}>Buy now</Button>
    </div>
  )
}

export default ViewNFT
