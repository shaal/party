import { db } from '@utils/prisma'

import { Wakatime } from '../WakatimeResolver'

/**
 * Get wakatime data for the given user
 * @param userId - Target user id
 * @returns wakatime object
 */
export const wakatime = async (userId: string) => {
  try {
    const integration = await db.integration.findFirst({
      where: { userId }
    })
    const response = await fetch(
      `https://wakatime.com/api/v1/users/current/stats/last_30_days?api_key=${integration?.wakatimeAPIKey}`
    )
    const api = await response.json()

    if (
      api.data.status === 'pending_update' ||
      api.data.status === 'updating'
    ) {
      return new Wakatime('Calculating...')
    } else {
      return new Wakatime(api.data.human_readable_total as string)
    }
  } catch {
    return null
  }
}
