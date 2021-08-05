import { create } from 'ipfs-http-client'

export async function uploadToIPFS(data: any) {
  const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
  })

  const { path }: { path: string } = await ipfs.add(data)
  return `https://cloudflare-ipfs.com/ipfs/${path}`
}
