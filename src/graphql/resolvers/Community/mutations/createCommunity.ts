import { reservedSlugs } from '@graphql/resolvers/Common/queries/reservedSlugs'
import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { md5 } from 'hash-wasm'
import { CreateCommunityInput } from 'src/__generated__/schema.generated'
import { ERROR_MESSAGE, IS_PRODUCTION } from 'src/constants'

export const createCommunity = async (
  query: any,
  input: CreateCommunityInput, // TODO: Change it
  session: Session | null | undefined
) => {
  if (reservedSlugs.includes(input.slug)) {
    throw new Error(`Community slug "${input.slug}" is reserved by Devparty.`)
  }

  try {
    return await db.community.create({
      ...query,
      data: {
        ownerId: session!.userId,
        name: input.name,
        slug: input.slug,
        description: input.description,
        avatar: `https://avatar.tobi.sh/${await md5(input.slug)}.svg?text=🎭`
      }
    })
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error('Community slug is already taken!')
    }

    throw new Error(IS_PRODUCTION ? ERROR_MESSAGE : error)
  }
}
