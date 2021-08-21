import { create } from 'ipfs-http-client'

export async function uploadToIPFS(data: any) {
  console.log(data.type)
  const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
  })

  const { path }: { path: string } = await ipfs.add(data)

  return {
    type: data.type,
    url:
      data.type === 'video/mp4'
        ? `https://ipfs.io/ipfs/${path}`
        : `https://cloudflare-ipfs.com/ipfs/${path}`
  }
}
