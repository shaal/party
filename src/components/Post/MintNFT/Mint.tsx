import { Button } from '@components/UI/Button'
import { Input } from '@components/UI/Input'
import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Web3Modal from 'web3modal'

import Market from '../../../../artifacts/contracts/Market.sol/NFTMarket.json'
import NFT from '../../../../artifacts/contracts/NFT.sol/NFT.json'
import { nftaddress, nftmarketaddress } from '../../../../config'

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
})

const Mint: React.FC = () => {
  const [ethPrice, setEthPrice] = useState<string>('0')

  async function createMarket() {
    try {
      const added = await client.add(
        JSON.stringify({
          name: "Yogi's Friend",
          description: "Yogi's best friend is filiptronicek",
          post: 'https://devparty.io/posts/fufu',
          image: 'ipfs://QmboHvNcxqH4TPTFe1t1fwgFFj9KrECHvBbp7WpsVmfwDp/nft.jpg'
        })
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      createSale(url)
    } catch (error) {
      console.log('Error uploading metadata: ', error)
    }
  }

  async function createSale(url: string) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    // next, create the item
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()

    const price = ethers.utils.parseUnits(ethPrice, 'ether')

    // then list the item for sale on the marketplace
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice
    })
    await transaction.wait()
    toast.success('🎉🎉🎉🎉🎉')
  }

  return (
    <div className="px-5 py-3.5 space-y-5">
      <div>
        <div className="font-bold text-lg">Type of NFT</div>
        <div>WIP</div>
      </div>
      <div>
        <div className="font-bold text-lg">Sale Status and Price</div>
        <div>
          <Input
            type="number"
            placeholder="Asset Price in ETH"
            onChange={(e) => setEthPrice(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div className="font-bold text-lg">Unlockable Content</div>
        <div>WIP</div>
      </div>
      <Button onClick={createMarket}>Mint NFT</Button>
    </div>
  )
}

export default Mint
