/**
 * Generated the prisma compatible parsed data to inserted
 * @param attachments - Array of attachments
 * @returns prisma compatible parsed data to inserted
 */
export const parseAttachments = (attachments: any) => {
  if (attachments) {
    return JSON.parse(attachments).map((attachment: any, index: number) => ({
      index: index + 1,
      type: attachment.type,
      url: attachment.url
    }))
  } else {
    return null
  }
}
