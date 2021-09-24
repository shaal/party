import { getMentions } from '@graphql/utils/getMentions'

import { Post, Session } from '.prisma/client'

export const processMentions = async (
  post: Post,
  session: Session | undefined | null
) => {
  const users = getMentions(post?.body)
  console.log(users)
}
