import getWeb3Modal from '@components/utils/getWeb3Modal'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { Nft } from 'src/__generated__/schema.generated'
import { NFT_MARKET_ADDRESS } from 'src/constants'

import Market from '../../../../artifacts/contracts/Market.sol/NFTMarket.json'

interface Props {
  nft: Nft
}

const ViewNFT: React.FC<Props> = ({ nft }) => {
  const [nftData, setNftData] = useState()
  useEffect(() => {
    loadNFTs()
  }, [])

  async function loadNFTs() {
    const web3Modal = getWeb3Modal()
    const web3 = new ethers.providers.Web3Provider(await web3Modal.connect())
    const signer = await web3.getSigner()

    const marketContract = new ethers.Contract(
      NFT_MARKET_ADDRESS as string,
      Market.abi,
      signer
    )
    const data = await marketContract.findOneMarketItem(
      nft?.address,
      nft?.tokenId
    )
    setNftData(data)
  }

  return <div className="border-t">{JSON.stringify(nftData, null, 2)}</div>
}

export default ViewNFT
