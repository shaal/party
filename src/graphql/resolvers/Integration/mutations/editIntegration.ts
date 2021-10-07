import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { EditIntegrationInput } from 'src/__generated__/schema.generated'

export const editIntegration = async (
  input: EditIntegrationInput,
  session: Session | null | undefined
) => {
  const integration = await db.integration.findFirst({
    where: { userId: session?.userId }
  })

  return await db.integration.update({
    where: {
      id: integration?.id
    },
    data: {
      wakatimeAPIKey: input.wakatimeAPIKey,
      spotifyRefreshToken: input.spotifyRefreshToken,
      user: {
        update: {
          ethAddress: input.ethAddress
        }
      }
    }
  })
}
