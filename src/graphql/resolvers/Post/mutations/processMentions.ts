import { getMentions } from '@graphql/utils/getMentions'

import { Post, Session } from '.prisma/client'

export const processMentions = async (
  post: Post,
  session: Session | undefined | null
) => {
  const users = getMentions(post?.body)

  // await db.notification.create({
  //   data: {
  //     dispatcher: { connect: { id: session?.userId } },
  //     receiver: { connect: { username: [{ username: 'yoginth' }] } }
  //   }
  // })
}
