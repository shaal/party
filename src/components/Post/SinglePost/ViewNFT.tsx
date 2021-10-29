import React from 'react'
import { Nft } from 'src/__generated__/schema.generated'

interface Props {
  nft: Nft
}

const ViewNFT: React.FC<Props> = ({ nft }) => {
  return <div className="border-t">This is NFT</div>
}

export default ViewNFT
