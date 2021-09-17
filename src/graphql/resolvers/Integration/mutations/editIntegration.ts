import { Session } from '@prisma/client'
import { prisma } from '@utils/prisma'
import { EditIntegrationInput } from 'src/__generated__/schema.generated'

export const editIntegration = async (
  input: EditIntegrationInput,
  session: Session | null | undefined
) => {
  const integration = await prisma.integration.findFirst({
    where: { userId: session?.userId }
  })

  return await prisma.integration.update({
    where: {
      id: integration?.id
    },
    data: {
      wakatimeAPIKey: input.wakatimeAPIKey,
      spotifyRefreshToken: input.spotifyRefreshToken
    }
  })
}
