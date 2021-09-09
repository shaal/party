import { builder } from '~/graphql/builder'
import { db } from '~/utils/prisma'

export class Stats {
  users: number
  products: number
  communities: number
  posts: number
  likes: number
  topics: number
  notifications: number
  sessions: number

  constructor(
    users: number,
    products: number,
    communities: number,
    posts: number,
    likes: number,
    topics: number,
    notifications: number,
    sessions: number
  ) {
    this.users = users
    this.products = products
    this.communities = communities
    this.posts = posts
    this.likes = likes
    this.topics = topics
    this.notifications = notifications
    this.sessions = sessions
  }
}

export const StatsObject = builder.objectRef<Stats>('Stats').implement({
  fields: (t) => ({
    users: t.exposeInt('users'),
    products: t.exposeInt('products'),
    communities: t.exposeInt('communities'),
    posts: t.exposeInt('posts'),
    likes: t.exposeInt('likes'),
    topics: t.exposeInt('topics'),
    notifications: t.exposeInt('notifications'),
    sessions: t.exposeInt('sessions')
  })
})

builder.queryField('stats', (t) =>
  t.field({
    type: StatsObject,
    nullable: true,
    authScopes: { isStaff: true },
    resolve: async () => {
      const users = await db.user.count()
      const products = await db.product.count()
      const communities = await db.community.count()
      const posts = await db.post.count()
      const likes = await db.like.count()
      const topics = await db.topic.count()
      const notifications = await db.notification.count()
      const sessions = await db.session.count()

      return new Stats(
        users,
        products,
        communities,
        posts,
        likes,
        topics,
        notifications,
        sessions
      )
    }
  })
)
