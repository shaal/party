import { db } from '~/utils/prisma'

export const hasLiked = async (userId: string, postId: string) => {
  const post = await db.post.findUnique({
    where: { id: postId },
    include: {
      likes: {
        where: { userId }
      }
    }
  })

  return post?.likes?.length === 0 ? false : true
}
