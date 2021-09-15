import Redis from 'ioredis'
import { NextApiRequest, NextApiResponse } from 'next'
import { unfurl } from 'unfurl.js'

let redis = new Redis(process.env.REDIS_URL)

const oembed = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query
  if (url) {
    const stringifiedURL = url.toString()

    let cache: any = await redis.get(stringifiedURL)
    cache = JSON.parse(cache)
    let oembedData = {}
    if (cache) {
      oembedData = cache
      return res.status(200).json(oembedData)
    } else {
      const data = await unfurl(stringifiedURL)
      redis.set(stringifiedURL, JSON.stringify(data), 'EX', 60)
      return res.status(200).json(data)
    }
  } else {
    return res.status(400).send({
      status: 'error',
      message: 'No URL provided'
    })
  }
}

export default oembed
