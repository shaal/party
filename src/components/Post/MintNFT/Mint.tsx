import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Web3Modal from 'web3modal'

import Market from '../../../../artifacts/contracts/Market.sol/NFTMarket.json'
import NFT from '../../../../artifacts/contracts/NFT.sol/NFT.json'
import { nftaddress, nftmarketaddress } from '../../../../config'

const Mint: React.FC = () => {
  const [formInput, updateFormInput] = useState({
    price: '',
    name: '',
    description: ''
  })
  const router = useRouter()

  async function createMarket() {
    const { name, description, price } = formInput
    if (!name || !description || !price) return
    try {
      const added = await fetch('https://ipfs.infura.io:5001/api/v0/add', {
        method: 'post',
        body: JSON.stringify({
          name,
          description,
          post: 'https://devparty.io',
          image: 'https://devparty.io'
        })
      })
      const { Hash }: { Hash: string } = await added.json()
      const url = `https://ipfs.infura.io/ipfs/${Hash}`
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
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
    <div className="px-5 py-3.5 space-y-5">
      <div>
        <div className="font-bold text-lg">Type of NFT</div>
        <div>WIP</div>
      </div>
      <div>
        <div className="font-bold text-lg">Sale Status and Price</div>
        <div className="flex justify-center">
          <div className="w-1/2 flex flex-col pb-12">
            <input
              placeholder="Asset Name"
              className="mt-8 border rounded p-4"
              onChange={(e) =>
                updateFormInput({ ...formInput, name: e.target.value })
              }
            />
            <textarea
              placeholder="Asset Description"
              className="mt-2 border rounded p-4"
              onChange={(e) =>
                updateFormInput({ ...formInput, description: e.target.value })
              }
            />
            <input
              placeholder="Asset Price in Eth"
              className="mt-2 border rounded p-4"
              onChange={(e) =>
                updateFormInput({ ...formInput, price: e.target.value })
              }
            />
            <button
              onClick={createMarket}
              className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
            >
              Create Digital Asset
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="font-bold text-lg">Unlockable Content</div>
        <div>WIP</div>
      </div>
    </div>
  )
}

export default Mint
