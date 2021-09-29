import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Post } from 'src/__generated__/schema.generated'
import Web3Modal from 'web3modal'

import Market from '../../../artifacts/contracts/Market.sol/NFTMarket.json'
import NFT from '../../../artifacts/contracts/NFT.sol/NFT.json'
import { nftaddress, nftmarketaddress } from '../../../config'

type Props = {
  post: Post
}

const CreateNFT: React.FC<Props> = ({ post }) => {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({
    price: '',
    name: '',
    description: ''
  })
  const router = useRouter()

  async function createMarket() {
    const { price } = formInput
    if (!price) return
    try {
      createSale(
        'https://3000-white-rooster-o585vnwt.ws-us18.gitpod.io/posts/62e431a1-d9d4-4803-81f4-ebfe3e44f27e'
      )
    } catch (error) {
      console.log('Error uploading IPFS: ', error)
    }
  }

  async function createSale(url: string) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()

    const price = ethers.utils.parseUnits(formInput.price, 'ether')

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice
    })
    await transaction.wait()
    router.push('/')
  }

  return (
    <Card>
      <CardBody className="space-y-3">
        <input
          type="number"
          placeholder="Asset Price in ETH"
          className="border rounded-lg p-2 w-full"
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />
        <div>
          <Button onClick={createMarket}>Create Digital Asset</Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default CreateNFT
