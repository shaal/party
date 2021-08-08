import SchemaBuilder from '@giraphql/core'
import PrismaPlugin from '@giraphql/plugin-prisma'
import RelayPlugin from '@giraphql/plugin-relay'
import ScopeAuthPlugin from '@giraphql/plugin-scope-auth'
import SimpleObjectsPlugin from '@giraphql/plugin-simple-objects'
import ValidationPlugin from '@giraphql/plugin-validation'
import { Prisma, Session } from '@prisma/client'
import { IncomingMessage, OutgoingMessage } from 'http'

import { db } from '~/utils/prisma'

export interface Context {
  req: IncomingMessage
  res: OutgoingMessage
  session?: Session | null
}

export function createGraphQLContext(
  req: IncomingMessage,
  res: OutgoingMessage,
  session?: Session | null
): Context {
  return {
    req,
    res,
    session
  }
}

export const builder = new SchemaBuilder<{
  // TODO: Set to false
  DefaultInputFieldRequiredness: true
  Context: Context
  Scalars: {
    ID: { Input: string; Output: string | number }
    DateTime: { Input: Date; Output: Date }
    Attachments: { Input: String; Output: Prisma.JsonValue }
  }
  AuthScopes: {
    public: boolean
    user: boolean
    unauthenticated: boolean
  }
  PrismaClient: typeof db
}>({
  defaultInputFieldRequiredness: true,
  plugins: [
    SimpleObjectsPlugin,
    ScopeAuthPlugin,
    ValidationPlugin,
    PrismaPlugin,
    RelayPlugin
  ],
  prisma: { client: db },
  authScopes: async ({ session }) => ({
    public: true,
    user: !!session,
    unauthenticated: !session
  }),
  relayOptions: {
    clientMutationId: 'omit',
    cursorType: 'String'
  }
})

builder.queryType({})
builder.mutationType({
  authScopes: {
    user: true
  }
})

// Cusrom Scalar Types
builder.scalarType('DateTime', {
  serialize: (date) => date.toISOString(),
  parseValue: (date) => {
    return new Date(date)
  }
})

builder.scalarType('Attachments', {
  serialize: (attachments) => JSON.parse(attachments),
  parseValue: (attachments) => {
    return attachments
  }
})
