export const getRandomCover = () => {
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
    image: `https://assets.devparty.io/images/heropatterns/topography.svg`,
    color: colors[Math.floor(Math.random() * colors.length)]
  }
}
