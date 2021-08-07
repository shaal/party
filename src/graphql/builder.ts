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
  // We change the defaults for arguments to be `required`. Any non-required
  // argument can be set to `required: false`.
  DefaultInputFieldRequiredness: true
  Context: Context
  Scalars: {
    // We modify the types for the `ID` type to denote that it's always a string when it comes in.
    ID: { Input: string; Output: string | number }
    DateTime: { Input: Date; Output: Date }
    Attachments: { Input: String; Output: Prisma.JsonValue }
  }
  // Define the shape of the auth scopes that we'll be using:
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

// This initializes the query and mutation types so that we can add fields to them dynamically:
builder.queryType({})

builder.mutationType({
  // Set the default auth scope to be authenticated users:
  authScopes: {
    user: true
  }
})

// Provide the custom DateTime scalar that allows dates to be transmitted over GraphQL:
builder.scalarType('DateTime', {
  serialize: (date) => date.toISOString(),
  parseValue: (date) => {
    return new Date(date)
  }
})

// Provide the custom DateTime scalar that allows dates to be transmitted over GraphQL:
builder.scalarType('Attachments', {
  serialize: (attachments) => JSON.parse(attachments),
  parseValue: (attachments) => {
    return attachments
  }
})
