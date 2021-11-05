import { CreateCommunityInput } from '@graphql/types.generated'
import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { md5 } from 'hash-wasm'
import { ERROR_MESSAGE, IS_PRODUCTION, RESERVED_SLUGS } from 'src/constants'

/**
 * Creates a new community
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param input - CreateCommunityInput
 * @param session - Current user's session
 * @returns a new community
 */
export const createCommunity = async (
  query: Record<string, unknown>,
  input: CreateCommunityInput,
  session: Session | null | undefined
) => {
  if (RESERVED_SLUGS.includes(input.slug)) {
    throw new Error(`Community slug "${input.slug}" is reserved by Devparty.`)
  }

  try {
    return await db.community.create({
      ...query,
      data: {
        name: input.name,
        slug: input.slug,
        description: input.description,
        avatar: `https://avatar.tobi.sh/${await md5(input.slug)}.svg?text=🎭`,
        owner: { connect: { id: session!.userId } },
        members: { connect: { id: session!.userId } },
        moderators: { connect: { id: session!.userId } }
      }
    })
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error('Community slug is already taken!')
    }

    throw new Error(IS_PRODUCTION ? ERROR_MESSAGE : error)
  }
}
