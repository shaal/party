import SchemaBuilder from '@giraphql/core'
import SimpleObjectsPlugin from '@giraphql/plugin-simple-objects'
import ScopeAuthPlugin from '@giraphql/plugin-scope-auth'
import ValidationPlugin from '@giraphql/plugin-validation'
import { IncomingMessage, OutgoingMessage } from 'http'
import { User, Session } from '@prisma/client'

export interface Context {
  req: IncomingMessage
  res: OutgoingMessage
  user?: User | null
  session?: Session | null
}

export function createGraphQLContext(
  req: IncomingMessage,
  res: OutgoingMessage,
  session?: (Session & { user: User }) | null
): Context {
  return {
    req,
    res,
    user: session?.user,
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
  }
  // Define the shape of the auth scopes that we'll be using:
  AuthScopes: {
    public: boolean
    user: boolean
    unauthenticated: boolean
  }
}>({
  defaultInputFieldRequiredness: true,
  plugins: [SimpleObjectsPlugin, ScopeAuthPlugin, ValidationPlugin],
  authScopes: async ({ user }) => ({
    public: true,
    user: !!user,
    unauthenticated: !user
  })
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
