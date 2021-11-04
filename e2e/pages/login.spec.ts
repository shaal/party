import { expect, test } from '@playwright/test'

test.describe('Login Page', () => {
  test('page should contains test texts', async ({ page }) => {
    await page.goto('/login')
    const content = await page.content()
    await expect(content).toContain('Login')
    await expect(content).toContain('New to Devparty?')
  })
})
