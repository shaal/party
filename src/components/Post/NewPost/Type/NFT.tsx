import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import React, { useState } from 'react'
import useSWR from 'swr'
import Web3 from 'web3'
import Web3Modal from 'web3modal'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const NFTType: React.FC = () => {
  const [ethAddress, setEthAddress] = useState<string>()
  const { data, error } = useSWR(
    `https://${
      process.env.NODE_ENV === 'production' ? 'testnets-api' : 'testnets-api'
    }.opensea.io/api/v1/assets?format=json&limit=9&offset=0&order_direction=desc&owner=${ethAddress}`,
    fetcher
  )

  const connectWallet = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const web3 = new Web3(connection)

    // @ts-ignore
    setEthAddress(web3?.currentProvider?.selectedAddress)
  }

  return (
    <>
      {ethAddress ? (
        <Card>
          <CardBody className="grid gap-3 md:grid-cols-4 grid-cols-2">
            {data?.assets?.map((asset: any) => (
              <div key={asset?.id}>
                <div className="cursor-pointer" onClick={() => alert('WIP')}>
                  <img
                    className="object-cover h-38 w-38 rounded-lg border"
                    src={asset?.image_url}
                    alt={asset?.name}
                  />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-2">
          <div>
            Put some text here! Put some text here! Put some text here! Put some
            text here! Put some text here! Put some text here! Put some text
            here! Put some text here! Put some text here!
          </div>
          <Button type="button" onClick={connectWallet}>
            Load NFTs
          </Button>
        </div>
      )}
    </>
  )
}

export default NFTType
