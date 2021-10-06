import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { EditIntegrationInput } from 'src/__generated__/schema.generated'

/**
 * Edit the user's integration
 * @param input - EditIntegrationInput
 * @param session - Current user session
 * @returns updated integration
 */
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
      spotifyRefreshToken: input.spotifyRefreshToken
    }
  })
}
