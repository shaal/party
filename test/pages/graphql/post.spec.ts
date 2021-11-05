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
            id
          }
        }
      }`
    }
  })
  const result = await response.json()
  const post = result.data.post

  expect(post.user.id.length).toBe(36)
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
  const post = result.data.post

  expect(typeof post.done).toBe('boolean')
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
