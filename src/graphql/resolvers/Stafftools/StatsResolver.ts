import { builder } from '~/graphql/builder'
import { db } from '~/utils/prisma'

export class Stats {
  users: number
  products: number
  posts: number

  constructor(users: number, products: number, posts: number) {
    this.users = users
    this.products = products
    this.posts = posts
  }
}

export const StatsObject = builder.objectRef<Stats>('Stats').implement({
  fields: (t) => ({
    users: t.exposeInt('users'),
    products: t.exposeInt('products'),
    posts: t.exposeInt('posts')
  })
})

builder.queryField('stats', (t) =>
  t.field({
    type: StatsObject,
    nullable: true,
    resolve: async () => {
      const users = await db.user.count()
      const products = await db.product.count()
      const posts = await db.post.count()

      return new Stats(users, products, posts)
    }
  })
)
