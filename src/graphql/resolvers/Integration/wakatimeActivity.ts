import { db } from '~/utils/prisma'

export const wakatimeActivity = async (id: string) => {
  const integration = await db.integration.findUnique({
    where: { id }
  })
  const response = await fetch(
    `https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=${integration?.wakatimeAPIKey}`
  )
  const reader = await response.json()

  return reader.data.human_readable_total
}
