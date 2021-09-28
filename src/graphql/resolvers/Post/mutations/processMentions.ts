import { getMentions } from '@graphql/utils/getMentions'
import { parseMentions } from '@graphql/utils/parseMentions'
import { db } from '@utils/prisma'

import { Post, Session } from '.prisma/client'

export const processMentions = async (
  post: Post,
  session: Session | undefined | null
) => {
  const users = await parseMentions(getMentions(post?.body))
  const mentions = users.filter(function (obj) {
    return obj.id !== session?.userId
  })

  await db.notification.create({
    data: {
      dispatcher: { connect: { id: session?.userId } },
      receiver: { connect: mentions },
      type: 'USER_MENTION',
      entityId: post?.id
    }
  })
}
