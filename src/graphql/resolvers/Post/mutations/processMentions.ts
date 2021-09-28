import { getMentions } from '@graphql/utils/getMentions'
import { parseMentions } from '@graphql/utils/parseMentions'
import { db } from '@utils/prisma'

import { Post, Session } from '.prisma/client'

export const processMentions = async (
  post: Post,
  session: Session | undefined | null
) => {
  const users = await parseMentions(getMentions(post?.body))

  await db.notification.create({
    data: {
      dispatcher: { connect: { id: session?.userId } },
      receiver: { connect: users },
      type: 'USER_MENTION',
      entityId: post?.id
    }
  })
}
