import SchemaBuilder from '@giraphql/core'
import DirectivePlugin from '@giraphql/plugin-directives'
import PrismaPlugin from '@giraphql/plugin-prisma'
import PrismaTypes from '@giraphql/plugin-prisma/generated'
import RelayPlugin from '@giraphql/plugin-relay'
import ScopeAuthPlugin from '@giraphql/plugin-scope-auth'
import SimpleObjectsPlugin from '@giraphql/plugin-simple-objects'
import ValidationPlugin from '@giraphql/plugin-validation'
import { Session } from '@prisma/client'
import { db } from '@utils/prisma'
import { IncomingMessage, OutgoingMessage } from 'http'

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

type DirectiveTypes = {
  rateLimit: {
    locations: 'FIELD_DEFINITION' | 'OBJECT'
    args: { limit: number; duration: number }
  }
}

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
  Directives: DirectiveTypes
  DefaultInputFieldRequiredness: true
  Context: Context
  Scalars: {
    ID: { Input: string; Output: string }
    DateTime: { Input: Date; Output: Date }
  }
  AuthScopes: {
    public: boolean
    user: boolean
    unauthenticated: boolean
    isStaff: boolean
  }
}>({
  defaultInputFieldRequiredness: true,
  useGraphQLToolsUnorderedDirectives: true,
  plugins: [
    SimpleObjectsPlugin,
    ScopeAuthPlugin,
    ValidationPlugin,
    PrismaPlugin,
    RelayPlugin,
    DirectivePlugin
  ],
  prisma: { client: db },
  authScopes: ({ session }) => ({
    public: true,
    user: !!session,
    unauthenticated: !session,
    isStaff: !!session?.isStaff
  }),
  relayOptions: {
    clientMutationId: 'omit',
    cursorType: 'String'
  }
})

builder.queryType({})
builder.mutationType({
  directives: {
    rateLimit: { limit: 100, duration: 60 }
  },
  authScopes: { user: true }
})

// Cusrom Scalar Types
builder.scalarType('DateTime', {
  serialize: (date) => date.toISOString(),
  parseValue: (date) => {
    return new Date(date)
  }
})
