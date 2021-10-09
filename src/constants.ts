import React from 'react'

export const STATIC_ASSETS = 'https://assets.devparty.io/images'
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
export const BASE_URL = process.env.BASE_URL
export const REACT_VERSION = React.version
export const GIT_COMMIT_SHA = process.env.GIT_COMMIT_SHA?.slice(0, 7)
export const GIT_COMMIT_REF = process.env.GIT_COMMIT_REF
export const POLLING_INTERVAL = 1000 * 60 // 1 minute
export const ERROR_MESSAGE = 'Something went wrong!'
export const RESERVED_SLUGS = ['admin', 'discover', 'products']
export const PUBLIC_SIGNING_MESSAGE =
  'Sign into Devparty with this wallet.\n\nNonce:'
