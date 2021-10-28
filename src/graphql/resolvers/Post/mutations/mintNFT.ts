import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { MintNFTInput } from 'src/__generated__/schema.generated'

/**
 * Mint an NFT
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param input - MintNFTInput
 * @returns a nft address and token
 * @param session - Current user's session
 */
export const mintNFT = async (
  query: any,
  input: MintNFTInput | null | undefined,
  session: Session | null | undefined
) => {
  const post = await db.post.findFirst({
    ...query,
    where: {
      id: input?.id,
      userId: session!.userId
    },

    rejectOnNotFound: true
  })

  if (post?.userId !== session?.userId) {
    throw new Error("You can't ming other users post!")
  }

  return await db.nFT.update({
    where: { postId: post?.id },
    data: { address: input?.address, tokenId: input?.tokenId }
  })
}
