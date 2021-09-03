import { db } from '~/utils/prisma'

export const wakatimeActivity = async (id: string) => {
  try {
    const integration = await db.integration.findUnique({
      where: { id }
    })
    const response = await fetch(
      `https://wakatime.com/api/v1/users/current/stats/last_30_days?api_key=${integration?.wakatimeAPIKey}`
    )
    const api = await response.json()

    if (
      api.data.status === 'pending_update' ||
      api.data.status === 'updating'
    ) {
      return 'Calculating...'
    } else {
      return api.data.human_readable_total
    }
  } catch {
    throw new Error('Something went wrong!')
  }
}
