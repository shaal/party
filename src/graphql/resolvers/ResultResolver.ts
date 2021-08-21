import { builder } from '~/graphql/builder'

export enum Result {
  // eslint-disable-next-line no-unused-vars
  SUCCESS = 'SUCCESS'
}

builder.enumType(Result, { name: 'Result' })
