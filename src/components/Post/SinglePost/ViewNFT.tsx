import { Tooltip } from '@components/UI/Tooltip'
import { Nft } from 'src/__generated__/schema.generated'
import { IS_PRODUCTION, STATIC_ASSETS } from 'src/constants'

interface Props {
  nft: Nft
}

const ViewNFT: React.FC<Props> = ({ nft }) => {
  return (
    <div className="!ml-auto flex items-center">
      <Tooltip content="View in Opensea">
        {/* TODO: Update URLs */}
        <a
          href={`https://${
            IS_PRODUCTION ? 'testnets.opensea.io' : 'testnets.opensea.io'
          }/assets/${IS_PRODUCTION ? 'mumbai' : 'mumbai'}/${nft?.address}/${
            nft?.tokenId
          }`}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="h-[20px] w-[20px]"
            src={`${STATIC_ASSETS}/brands/polygon.svg`}
            alt="Polygon Logo"
          />
        </a>
      </Tooltip>
    </div>
  )
}

export default ViewNFT
