import SchemaBuilder from '@giraphql/core'
import PrismaPlugin from '@giraphql/plugin-prisma'
import RelayPlugin from '@giraphql/plugin-relay'
import ScopeAuthPlugin from '@giraphql/plugin-scope-auth'
import SimpleObjectsPlugin from '@giraphql/plugin-simple-objects'
import ValidationPlugin from '@giraphql/plugin-validation'
import { Prisma, Session } from '@prisma/client'
import { IncomingMessage, OutgoingMessage } from 'http'

import { prisma } from '../utils/prisma'

export interface Context {
  req: IncomingMessage
  res: OutgoingMessage
  session?: Session | null
}

export function createGraphQLContext(
  request: IncomingMessage,
  res: OutgoingMessage,
  session?: Session | null
): Context {
  return {
    req: request,
    res,
    session
  }
}

export const builder = new SchemaBuilder<{
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
}>({
  defaultInputFieldRequiredness: true,
  plugins: [
    SimpleObjectsPlugin,
    ScopeAuthPlugin,
    ValidationPlugin,
    PrismaPlugin,
    RelayPlugin
  ],
  prisma: { client: prisma },
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
  authScopes: { user: true }
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
