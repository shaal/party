import { expect, test } from '@playwright/test'

test('get single post', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        post(id: "89bee9b8-a958-48de-8c9d-55e20b75ccf2") {
          id
        }
      }`
    }
  })
  const result = await response.json()
  const post = result.data.post

  expect(post.id).toBe('89bee9b8-a958-48de-8c9d-55e20b75ccf2')
})

test('post should have user', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        post(id: "89bee9b8-a958-48de-8c9d-55e20b75ccf2") {
          id
          user {
            username
          }
        }
      }`
    }
  })
  const result = await response.json()
  const post = result.data.post

  expect(post.user.username).toBe('yoginth')
})

test('post should have product', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        post(id: "89bee9b8-a958-48de-8c9d-55e20b75ccf2") {
          id
          product {
            slug
          }
        }
      }`
    }
  })
  const result = await response.json()
  const post = result.data.post

  expect(post.product.slug).toBe('devparty')
})

test('post should have type', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        post(id: "89bee9b8-a958-48de-8c9d-55e20b75ccf2") {
          id
          type
        }
      }`
    }
  })
  const result = await response.json()
  const post = result.data.post

  expect(post.type).toBe('POST')
})

test('post done status shoud be true/false', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        post(id: "89bee9b8-a958-48de-8c9d-55e20b75ccf2") {
          id
          done
        }
      }`
    }
  })
  const result = await response.json()

  expect(result.data.post).toBeFalsy
})

test('post should have nft', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        post(id: "89bee9b8-a958-48de-8c9d-55e20b75ccf2") {
          nft {
            address
            tokenId
          }
        }
      }`
    }
  })
  const result = await response.json()
  const post = result.data.post

  expect(post.nft.address).toBe('0x3b3ee1931dc30c1957379fac9aba94d1c48a5405')
  expect(post.nft.tokenId).toBe('1')
})

test('post should have oembed url', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        post(id: "89bee9b8-a958-48de-8c9d-55e20b75ccf2") {
          oembedUrl
        }
      }`
    }
  })
  const result = await response.json()
  const post = result.data.post

  expect(post.oembedUrl).toBe('https://devparty.io')
})

test('connection should have count', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        post(id: "89bee9b8-a958-48de-8c9d-55e20b75ccf2") {
          likes {
            totalCount
          }
          replies {
            totalCount
          }
        }
      }`
    }
  })
  const result = await response.json()
  const post = result.data.post

  expect(typeof post.likes.totalCount).toBe('number')
  expect(typeof post.replies.totalCount).toBe('number')
})

test('flags should return boolean', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        post(id: "89bee9b8-a958-48de-8c9d-55e20b75ccf2") {
          done
          hasBookmarked
          hasLiked
        }
      }`
    }
  })
  const result = await response.json()
  const post = result.data.post

  expect(typeof post.done).toBe('boolean')
  expect(typeof post.hasBookmarked).toBe('boolean')
  expect(typeof post.hasLiked).toBe('boolean')
})
