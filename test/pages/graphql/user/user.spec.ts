import { expect, test } from '@playwright/test'

test('get single user', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        user(username: "yoginth") {
          username
        }
      }`
    }
  })
  const result = await response.json()

  expect(result.data.user.username).toBe('yoginth')
})
