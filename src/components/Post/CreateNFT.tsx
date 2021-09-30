import BetaBadge from '@components/shared/BetaBadge'
import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import { Tooltip } from '@components/ui/Tooltip'
import { ethers } from 'ethers'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Post } from 'src/__generated__/schema.generated'
import Web3Modal from 'web3modal'

import Market from '../../../artifacts/contracts/Market.sol/NFTMarket.json'
import NFT from '../../../artifacts/contracts/NFT.sol/NFT.json'
import { nftaddress, nftmarketaddress } from '../../../config'

type Props = {
  post: Post
}

const CreateNFT: React.FC<Props> = ({ post }) => {
  const [formInput, updateFormInput] = useState({
    price: ''
  })

  async function createMarket() {
    const { price } = formInput
    if (!price) return
    try {
      createSale(`${process.env.BASE_URL}/posts/${post?.id}`)
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
    console.log(transaction)
    await transaction.wait()
    toast.success('Transaction completed!')
  }

  return (
    <Card>
      <CardBody className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-lg font-bold">Place a bid</div>
            <BetaBadge />
          </div>
          <div className="font-mono font-bold">
            <Tooltip content="Your Balance">0 ETH</Tooltip>
          </div>
        </div>
        <input
          type="number"
          placeholder="Asset Price in ETH"
          className="border rounded-lg p-2 w-full"
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />
        <div>Once a bid is placed, it cannot be withdrawn.</div>
        <div>
          <Button onClick={createMarket}>Create Digital Asset</Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default CreateNFT
