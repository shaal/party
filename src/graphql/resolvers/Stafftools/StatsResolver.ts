import { builder } from '@graphql/builder'
import { prisma } from '@utils/prisma'

export class Stats {
  users: number
  products: number
  posts: number
  likes: number
  topics: number
  badges: number
  notifications: number
  sessions: number

  constructor(
    users: number,
    products: number,
    posts: number,
    likes: number,
    topics: number,
    badges: number,
    notifications: number,
    sessions: number
  ) {
    this.users = users
    this.products = products
    this.posts = posts
    this.likes = likes
    this.topics = topics
    this.badges = badges
    this.notifications = notifications
    this.sessions = sessions
  }
}

export const StatsObject = builder.objectRef<Stats>('Stats').implement({
  fields: (t) => ({
    users: t.exposeInt('users'),
    products: t.exposeInt('products'),
    posts: t.exposeInt('posts'),
    likes: t.exposeInt('likes'),
    topics: t.exposeInt('topics'),
    badges: t.exposeInt('badges'),
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
      const users = await prisma.user.count()
      const products = await prisma.product.count()
      const posts = await prisma.post.count()
      const likes = await prisma.like.count()
      const topics = await prisma.topic.count()
      const badges = await prisma.badge.count()
      const notifications = await prisma.notification.count()
      const sessions = await prisma.session.count()

      return new Stats(
        users,
        products,
        posts,
        likes,
        topics,
        badges,
        notifications,
        sessions
      )
    }
  })
)
