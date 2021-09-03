import { Session } from '@prisma/client'

import { EditIntegrationInput } from '~/__generated__/schema.generated'
import { db } from '~/utils/prisma'

export const editIntegration = async (
  input: EditIntegrationInput,
  session: Session | null | undefined
) => {
  const integration = await db.integration.findFirst({
    where: { userId: session?.userId }
  })

  if (integration) {
    return await db.integration.update({
      where: {
        id: integration.id
      },
      data: {
        wakatimeAPIKey: input.wakatimeAPIKey
      }
    })
  } else {
    return await db.integration.create({
      data: {
        user: { connect: { id: session?.userId } },
        wakatimeAPIKey: input.wakatimeAPIKey
      }
    })
  }
}
