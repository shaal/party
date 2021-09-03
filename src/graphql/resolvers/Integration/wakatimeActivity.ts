import { db } from '~/utils/prisma'

export const wakatimeActivity = async (userId: string) => {
  const integration = await db.integration.findFirst({
    where: { userId }
  })
  const response = await fetch(
    `https://wakatime.com/api/v1/users/yoginth/all_time_since_today?api_key=${integration?.wakatimeAPIKey}`
  )
  const reader = await response.json()

  return reader.data.text
}
