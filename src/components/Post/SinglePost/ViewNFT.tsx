import { Button } from '@components/UI/Button'
import getWeb3Modal from '@components/utils/getWeb3Modal'
import { ethers } from 'ethers'
import { Nft } from 'src/__generated__/schema.generated'
import { NFT_ADDRESS, NFT_MARKET_ADDRESS } from 'src/constants'

import Market from '../../../../artifacts/contracts/Market.sol/NFTMarket.json'

interface Props {
  nft: Nft
}

const ViewNFT: React.FC<Props> = ({ nft }) => {
  async function buyNft() {
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

  return (
    <div className="p-5 border-t">
      <Button onClick={buyNft}>Buy</Button>
    </div>
  )
}

export default ViewNFT
