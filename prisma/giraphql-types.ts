import type {
  Like,
  Notification,
  Post,
  PostTopics,
  Prisma,
  Product,
  Profile,
  Session,
  Topic,
  User
} from '@prisma/client'
export default interface PrismaTypes {
  User: {
    Shape: User
    Include: Prisma.UserInclude
    Where: Prisma.UserWhereUniqueInput
    Fields:
      | 'posts'
      | 'products'
      | 'sessions'
      | 'profile'
      | 'following'
      | 'followedBy'
      | 'likes'
      | 'myNotification'
      | 'sentNotification'
    ListRelations:
      | 'posts'
      | 'products'
      | 'sessions'
      | 'following'
      | 'followedBy'
      | 'likes'
      | 'myNotification'
      | 'sentNotification'
    Relations: {
      posts: {
        Shape: Post[]
        Types: PrismaTypes['Post']
      }
      products: {
        Shape: Product[]
        Types: PrismaTypes['Product']
      }
      sessions: {
        Shape: Session[]
        Types: PrismaTypes['Session']
      }
      profile: {
        Shape: Profile | null
        Types: PrismaTypes['Profile']
      }
      following: {
        Shape: User[]
        Types: PrismaTypes['User']
      }
      followedBy: {
        Shape: User[]
        Types: PrismaTypes['User']
      }
      likes: {
        Shape: Like[]
        Types: PrismaTypes['Like']
      }
      myNotification: {
        Shape: Notification[]
        Types: PrismaTypes['Notification']
      }
      sentNotification: {
        Shape: Notification[]
        Types: PrismaTypes['Notification']
      }
    }
  }
  Session: {
    Shape: Session
    Include: Prisma.SessionInclude
    Where: Prisma.SessionWhereUniqueInput
    Fields: 'user'
    ListRelations: never
    Relations: {
      user: {
        Shape: User
        Types: PrismaTypes['User']
      }
    }
  }
  Profile: {
    Shape: Profile
    Include: Prisma.ProfileInclude
    Where: Prisma.ProfileWhereUniqueInput
    Fields: 'user'
    ListRelations: never
    Relations: {
      user: {
        Shape: User
        Types: PrismaTypes['User']
      }
    }
  }
  Post: {
    Shape: Post
    Include: Prisma.PostInclude
    Where: Prisma.PostWhereUniqueInput
    Fields: 'user' | 'product' | 'likes' | 'topics' | 'parent' | 'replies'
    ListRelations: 'likes' | 'topics' | 'replies'
    Relations: {
      user: {
        Shape: User
        Types: PrismaTypes['User']
      }
      product: {
        Shape: Product | null
        Types: PrismaTypes['Product']
      }
      likes: {
        Shape: Like[]
        Types: PrismaTypes['Like']
      }
      topics: {
        Shape: PostTopics[]
        Types: PrismaTypes['PostTopics']
      }
      parent: {
        Shape: Post | null
        Types: PrismaTypes['Post']
      }
      replies: {
        Shape: Post[]
        Types: PrismaTypes['Post']
      }
    }
  }
  PostTopics: {
    Shape: PostTopics
    Include: Prisma.PostTopicsInclude
    Where: Prisma.PostTopicsWhereUniqueInput
    Fields: 'post' | 'topic'
    ListRelations: never
    Relations: {
      post: {
        Shape: Post | null
        Types: PrismaTypes['Post']
      }
      topic: {
        Shape: Topic | null
        Types: PrismaTypes['Topic']
      }
    }
  }
  Topic: {
    Shape: Topic
    Include: Prisma.TopicInclude
    Where: Prisma.TopicWhereUniqueInput
    Fields: 'posts'
    ListRelations: 'posts'
    Relations: {
      posts: {
        Shape: PostTopics[]
        Types: PrismaTypes['PostTopics']
      }
    }
  }
  Like: {
    Shape: Like
    Include: Prisma.LikeInclude
    Where: Prisma.LikeWhereUniqueInput
    Fields: 'user' | 'post'
    ListRelations: never
    Relations: {
      user: {
        Shape: User
        Types: PrismaTypes['User']
      }
      post: {
        Shape: Post | null
        Types: PrismaTypes['Post']
      }
    }
  }
  Product: {
    Shape: Product
    Include: Prisma.ProductInclude
    Where: Prisma.ProductWhereUniqueInput
    Fields: 'user' | 'posts'
    ListRelations: 'posts'
    Relations: {
      user: {
        Shape: User | null
        Types: PrismaTypes['User']
      }
      posts: {
        Shape: Post[]
        Types: PrismaTypes['Post']
      }
    }
  }
  Notification: {
    Shape: Notification
    Include: Prisma.NotificationInclude
    Where: Prisma.NotificationWhereUniqueInput
    Fields: 'receiver' | 'dispatcher'
    ListRelations: never
    Relations: {
      receiver: {
        Shape: User
        Types: PrismaTypes['User']
      }
      dispatcher: {
        Shape: User
        Types: PrismaTypes['User']
      }
    }
  }
}
