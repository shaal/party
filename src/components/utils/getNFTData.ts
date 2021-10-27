import { Post } from 'src/__generated__/schema.generated'
import { BASE_URL } from 'src/constants'

const getNFTData = (post: Post) => {
  return {
    name: `Post from @${post?.user?.username} in Devparty`,
    description: `${post?.body}\n\nLink to post: ${BASE_URL}/posts/${post?.id}`,
    image:
      post?.attachments.length > 0
        ? post?.attachments[0].url
        : 'https://cloudflare-ipfs.com/ipfs/QmdmPHWQBzV24GvbwCszm2AnWetBENeBP2UStuETsyAp1C',
    attributes: [
      {
        trait_type: 'User',
        value: `@${post?.user?.username}`
      },
      {
        trait_type: 'Type',
        value: `@${post?.type}`
      },
      {
        display_type: 'date',
        trait_type: 'Posted at',
        value: new Date(post?.createdAt).getTime() / 1000
      }
    ]
  }
}

export default getNFTData
