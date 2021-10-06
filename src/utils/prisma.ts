import { PrismaClient } from '@prisma/client'
import { IS_PRODUCTION } from 'src/constants'

declare global {
  var __globalPrisma__: PrismaClient
}

export let db: PrismaClient

if (IS_PRODUCTION) {
  db = new PrismaClient({
    log: ['error', 'warn']
  })
} else {
  if (!global.__globalPrisma__) {
    global.__globalPrisma__ = new PrismaClient({
      log: ['error', 'warn']
    })
  }

  db = global.__globalPrisma__
}
