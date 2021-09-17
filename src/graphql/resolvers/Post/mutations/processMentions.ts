import { getMentions } from '@graphql/utils/getMentions'

import { Post } from '.prisma/client'

export const processMentions = async (post: Post) => {
  console.log(getMentions(post.body))
}
