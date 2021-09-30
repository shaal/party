import axios from 'axios'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { Post } from 'src/__generated__/schema.generated'
import Web3Modal from 'web3modal'

import Market from '../../../artifacts/contracts/Market.sol/NFTMarket.json'
import NFT from '../../../artifacts/contracts/NFT.sol/NFT.json'
import { nftaddress, nftmarketaddress } from '../../../config'

type Props = {
  post: Post
}

const BuyNFT: React.FC<Props> = ({ post }) => {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider()
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      provider
    )
    const data = await marketContract.fetchMarketItems()

    const items = await Promise.all(
      data.map(async (i: any) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image
        }
        return item
      })
    )
    setNfts(items as any)
    setLoadingState('loaded')
  }
  async function buyNft(nft: any) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.tokenId,
      {
        value: price
      }
    )
    await transaction.wait()
    loadNFTs()
  }
  if (loadingState === 'loaded' && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft: any, i) => (
            <div key={i} className="p-4 bg-black">
              <p className="text-2xl mb-4 font-bold text-white">
                {nft.price} ETH
              </p>
              <button onClick={() => buyNft(nft)}>Buy</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BuyNFT
