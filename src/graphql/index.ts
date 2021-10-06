import './resolvers'

import fs from 'fs'
import { GraphQLSchema, lexicographicSortSchema, printSchema } from 'graphql'
import { createRateLimitDirective } from 'graphql-rate-limit-directive'
import path from 'path'
import { IS_DEVELOPMENT } from 'src/constants'

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

if (IS_DEVELOPMENT) {
  writeSchema(schema)
}
