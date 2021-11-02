import { Nft } from 'src/__generated__/schema.generated'
import { IS_PRODUCTION, STATIC_ASSETS } from 'src/constants'

interface Props {
  nft: Nft
}

const NFTIcon: React.FC<Props> = ({ nft }) => {
  return (
    <div className="!ml-auto flex items-center">
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
    </div>
  )
}

export default NFTIcon
