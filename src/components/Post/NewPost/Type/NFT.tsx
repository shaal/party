import { Button } from '@components/ui/Button'
import React, { useState } from 'react'
import Web3 from 'web3'
import Web3Modal from 'web3modal'

const NFTType: React.FC = () => {
  const [ethAddress, setEthAddress] = useState<string>()

  const connectWallet = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const web3 = new Web3(connection)

    // @ts-ignore
    setEthAddress(web3?.currentProvider?.selectedAddress)
  }

  return (
    <div className="space-y-2">
      <div>
        Put some text here! Put some text here! Put some text here! Put some
        text here! Put some text here! Put some text here! Put some text here!
        Put some text here! Put some text here!
      </div>
      {!ethAddress && (
        <Button type="button" onClick={connectWallet}>
          Load NFTs
        </Button>
      )}
    </div>
  )
}

export default NFTType
