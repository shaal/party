import { Prisma, Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { md5 } from 'hash-wasm'
import { CreateProductInput } from 'src/__generated__/schema.generated'
import { ERROR_MESSAGE, IS_PRODUCTION, RESERVED_SLUGS } from 'src/constants'

/**
 * Creates a new product
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param input - CreateProductInput
 * @param session - Current user's session
 * @returns a new product
 */
export const createProduct = async (
  query: Record<string, unknown>,
  input: CreateProductInput,
  session: Session | null | undefined
) => {
  if (RESERVED_SLUGS.includes(input.slug)) {
    throw new Error(`Product slug "${input.slug}" is reserved by Devparty.`)
  }

  try {
    return await db.product.create({
      ...query,
      data: {
        name: input.name,
        slug: input.slug,
        website: input.website,
        description: input.description,
        avatar: `https://avatar.tobi.sh/${await md5(input.slug)}.svg?text=📦`,
        owner: { connect: { id: session!.userId } }
      }
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('Product slug is already taken!')
      }

      throw new Error(IS_PRODUCTION ? ERROR_MESSAGE : error.message)
    }
  }
}
