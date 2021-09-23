import './resolvers'

import fs from 'fs'
import { GraphQLSchema, lexicographicSortSchema, printSchema } from 'graphql'
import { createRateLimitDirective } from 'graphql-rate-limit-directive'
import path from 'path'

import { builder } from './builder'

const schema = builder.toSchema({})
const rateLimitDirective = createRateLimitDirective()

rateLimitDirective.visitSchemaDirectives(schema, {
  rateLimit: rateLimitDirective
})

export default schema

function writeSchema(schema: GraphQLSchema) {
  const schemaAsString = printSchema(lexicographicSortSchema(schema))
  const schemaPath = path.join(process.cwd(), 'src/graphql/schema.graphql')

  const existingSchema =
    fs.existsSync(schemaPath) && fs.readFileSync(schemaPath, 'utf-8')

  if (existingSchema !== schemaAsString) {
    fs.writeFileSync(schemaPath, schemaAsString)
  }
}

if (process.env.NODE_ENV !== 'production') {
  writeSchema(schema)
}
