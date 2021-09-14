import cacheData from 'memory-cache'
import { NextApiRequest, NextApiResponse } from 'next'
import { unfurl } from 'unfurl.js'

const oembed = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query
  if (url) {
    const stringifiedURL = url.toString()
    const value = cacheData.get(url)
    if (value) {
      return res.status(200).send(value)
    } else {
      const hours = 24
      const data = await unfurl(stringifiedURL)
      cacheData.put(url, data, hours * 1000 * 60 * 60)
      return res.status(200).send(data)
    }
  } else {
    return res.status(400).send({
      status: 'error',
      message: 'No URL provided'
    })
  }
}

export default oembed
