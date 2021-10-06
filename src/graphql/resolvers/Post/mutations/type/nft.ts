import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { CreatePostInput } from 'src/__generated__/schema.generated'

export const nft = async (
  query: any,
  input: CreatePostInput,
  session: Session | null | undefined
) => {
  if (!input.address || !input.tokenId) {
    throw new Error('Address and Token ID is required!')
  }

  const nft = await db.post.create({
    ...query,
    data: {
      userId: session!.userId,
      body: input.body,
      type: 'NFT',
      nft: {
        create: {
          address: input.address,
          tokenId: input.tokenId
        }
      }
    }
  })

  return nft
}
