export async function uploadToIPFS(data: File) {
  const formData = new FormData()
  formData.append('file', data, 'img')
  const upload = await fetch('https://ipfs.infura.io:5001/api/v0/add', {
    method: 'post',
    body: formData
  })
  const response = await upload.json()

  return {
    type: data.type,
    url:
      data.type === 'video/mp4'
        ? `https://ipfs.io/ipfs/${response.Hash}`
        : `https://cloudflare-ipfs.com/ipfs/${response.Hash}`
  }
}
