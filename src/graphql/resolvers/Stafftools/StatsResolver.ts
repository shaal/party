import { builder } from '~/graphql/builder'
import { db } from '~/utils/prisma'

export class Stats {
  users: number
  products: number
  groups: number
  posts: number
  likes: number
  topics: number
  notifications: number

  constructor(
    users: number,
    products: number,
    groups: number,
    posts: number,
    likes: number,
    topics: number,
    notifications: number
  ) {
    this.users = users
    this.products = products
    this.groups = groups
    this.posts = posts
    this.likes = likes
    this.topics = topics
    this.notifications = notifications
  }
}

export const StatsObject = builder.objectRef<Stats>('Stats').implement({
  fields: (t) => ({
    users: t.exposeInt('users'),
    products: t.exposeInt('products'),
    groups: t.exposeInt('groups'),
    posts: t.exposeInt('posts'),
    likes: t.exposeInt('likes'),
    topics: t.exposeInt('topics'),
    notifications: t.exposeInt('notifications')
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
      const groups = await db.group.count()
      const posts = await db.post.count()
      const likes = await db.like.count()
      const topics = await db.topic.count()
      const notifications = await db.notification.count()

      return new Stats(
        users,
        products,
        groups,
        posts,
        likes,
        topics,
        notifications
      )
    }
  })
)
