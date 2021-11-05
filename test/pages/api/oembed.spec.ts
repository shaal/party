import { expect, test } from '@playwright/test'

test('get oembed', async ({ request }) => {
  const response = await request.get('/api/oembed', {
    params: { url: 'https://github.com' }
  })
  expect(response.ok()).toBeTruthy()
})
