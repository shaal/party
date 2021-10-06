import Redis from 'ioredis'
import { NextApiRequest, NextApiResponse } from 'next'
import { IS_PRODUCTION } from 'src/constants'
import { unfurl } from 'unfurl.js'

const redis = new Redis(process.env.REDIS_URL)

const oembed = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query
  if (url) {
    try {
      const stringifiedURL = url.toString()
      let parsedUrl = stringifiedURL
      if (!/^https?:\/\//i.test(stringifiedURL)) {
        parsedUrl = 'https://' + url
      }
      let cache: any = await redis.get(parsedUrl)
      cache = JSON.parse(cache)
      let oembedData = {}
      if (cache) {
        oembedData = cache
        res.setHeader('Cache-Control', 'max-age=0, s-maxage=864000')
        return res.status(200).json(oembedData)
      } else {
        const data = await unfurl(parsedUrl)
        redis.set(
          parsedUrl,
          JSON.stringify(data),
          'EX',
          IS_PRODUCTION ? 864000 : 5
        )
        res.setHeader('Cache-Control', 'max-age=0, s-maxage=864000')
        return res.status(200).json(data)
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
      message: 'No URL provided'
    })
  }
}

export default oembed
