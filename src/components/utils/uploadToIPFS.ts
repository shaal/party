require('dotenv').config()
import { Web3Storage } from 'web3.storage'

export async function uploadToIPFS(data: any) {
  console.log(data)
  var blob = data.slice(0, data.size, data.type)
  var file = new File([blob], 'img', { type: data.type })
  const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN })
  const rootCid = await client.put([file])

  return `https://cloudflare-ipfs.com/ipfs/${rootCid}/img`
}
