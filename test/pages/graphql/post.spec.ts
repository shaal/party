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

  expect(result.data.post.id).toBe('89bee9b8-a958-48de-8c9d-55e20b75ccf2')
})
