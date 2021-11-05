import { expect, test } from '@playwright/test'

test.describe('Landing Page', () => {
  test('page should contains test texts', async ({ page }) => {
    await page.goto('/')
    const content = await page.content()
    await expect(content).toContain('Get started')
    await expect(content).toContain('Join Devparty today.')
  })
})
