export const parseMentions = (mentions: any) => {
  if (mentions) {
    return mentions.map((mention: string) => ({
      username: mention
    }))
  } else {
    return []
  }
}
