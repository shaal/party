import { Session } from '@prisma/client'
import { prisma } from '~/utils/prisma'
import { md5 } from 'hash-wasm'

import { CreateProductInput } from '../../../../__generated__/schema.generated'
import { reservedSlugs } from '../../Common/reservedSlugs'

export const createProduct = async (
  query: any,
  input: CreateProductInput,
  session: Session | null | undefined
) => {
  if (reservedSlugs.includes(input.slug)) {
    throw new Error(`Product slug "${input.slug}" is reserved by Devparty.`)
  }

  return await prisma.product.create({
    ...query,
    data: {
      userId: session!.userId,
      name: input.name,
      slug: input.slug,
      description: input.description,
      avatar: `https://avatar.tobi.sh/${await md5(input.slug)}.svg?text=📦`
    }
  })
}
