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