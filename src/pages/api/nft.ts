import Redis from 'ioredis'
import { NextApiRequest, NextApiResponse } from 'next'
import { IS_PRODUCTION } from 'src/constants'

const redis = new Redis(process.env.REDIS_URL)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, tokenId } = req.query
  if (address || tokenId) {
    try {
      const cacheKey = `nft-${address}-${tokenId}`
      let cache: any = await redis.get(cacheKey)
      cache = JSON.parse(cache)
      let nftData = {}
      if (cache) {
        nftData = cache
        res.setHeader('Cache-Control', 'max-age=0, s-maxage=864000')
        return res.status(200).json(nftData)
      } else {
        const data = await fetch(
          `https://testnets-api.opensea.io/api/v1/asset/${address}/${tokenId}`
        )
        redis.set(
          cacheKey,
          JSON.stringify(await data.json()),
          'EX',
          IS_PRODUCTION ? 864000 : 500
        )
        res.setHeader('Cache-Control', 'max-age=0, s-maxage=864000')
        return res.status(data.status).json(await data.json())
      }
    } catch (error: any) {
      return res.status(200).send({
        status: 'error',
        message: error
      })
    }
  } else {
    return res.status(400).send({
      status: 'error',
      message: 'No address and tokenId provided'
    })
  }
}

export default handler
