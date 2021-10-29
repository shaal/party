import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, tokenId } = req.query
  if (address && tokenId) {
    try {
      const data = await fetch(
        `https://deep-index.moralis.io/api/v2/nft/${address}/${tokenId}?chain=mumbai&format=decimal`,
        { headers: { 'X-API-Key': process.env.MORALIS_API_KEY as string } }
      )
      res.setHeader('Cache-Control', 'max-age=0, s-maxage=864000')
      return res.status(200).json(await data.json())
    } catch (error: any) {
      return res.status(200).send({
        status: 'error',
        message: error
      })
    }
  } else {
    return res.status(400).send({
      status: 'error',
      message: 'No address or tokenId provided'
    })
  }
}

export default handler
