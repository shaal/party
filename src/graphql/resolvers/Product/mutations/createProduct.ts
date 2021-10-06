import { reservedSlugs } from '@graphql/resolvers/Common/queries/reservedSlugs'
import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { md5 } from 'hash-wasm'
import { CreateProductInput } from 'src/__generated__/schema.generated'
import { ERROR_MESSAGE, IS_PRODUCTION } from 'src/constants'

export const createProduct = async (
  query: any,
  input: CreateProductInput,
  session: Session | null | undefined
) => {
  if (reservedSlugs.includes(input.slug)) {
    throw new Error(`Product slug "${input.slug}" is reserved by Devparty.`)
  }

  try {
    return await db.product.create({
      ...query,
      data: {
        userId: session!.userId,
        name: input.name,
        slug: input.slug,
        website: input.website,
        description: input.description,
        avatar: `https://avatar.tobi.sh/${await md5(input.slug)}.svg?text=📦`
      }
    })
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error('Product slug is already taken!')
    }

    throw new Error(IS_PRODUCTION ? ERROR_MESSAGE : error)
  }
}
