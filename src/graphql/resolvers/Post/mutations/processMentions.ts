import { getMentions } from '@graphql/utils/getMentions'
import { parseMentions } from '@graphql/utils/parseMentions'
import { db } from '@utils/prisma'

import { Post, Session } from '.prisma/client'

export const processMentions = async (
  post: Post,
  session: Session | undefined | null
) => {
  const users = await parseMentions(getMentions(post?.body), session, post)
  const mentions = users.filter(function (obj) {
    return obj.receiverId !== session?.userId
  })

  await db.notification.createMany({
    data: mentions,
    skipDuplicates: true
  })
}
