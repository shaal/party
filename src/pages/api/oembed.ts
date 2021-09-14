import { NextApiRequest, NextApiResponse } from 'next'
import { unfurl } from 'unfurl.js'

const oembed = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query
  if (url) {
    const stringifiedURL = url.toString()
    return res.status(200).send(await unfurl(stringifiedURL))
  } else {
    return res.status(400).send({
      status: 'error',
      message: 'No URL provided'
    })
  }
}

export default oembed
