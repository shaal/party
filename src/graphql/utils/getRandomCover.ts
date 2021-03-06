import { STATIC_ASSETS } from 'src/constants'

/**
 * Generate random color and cover for user
 * @returns random color and cover
 */
export const getRandomCover = (): { image: string; color: string } => {
  const colors = [
    '6B7280',
    'EF4444',
    'F59E0B',
    '10B981',
    '3B82F6',
    '6366F1',
    '8B5CF6',
    'EC4899'
  ]

  return {
    image: `${STATIC_ASSETS}/patterns/${Math.floor(
      Math.random() * (10 - 1 + 1) + 1
    )}.svg`,
    color: colors[Math.floor(Math.random() * colors.length)]
  }
}
