import { expect, test } from '@playwright/test'

test.describe('Signup Page', () => {
  test('page should contains test texts', async ({ page }) => {
    await page.goto('/signup')
    const content = await page.content()
    await expect(content).toContain('Join Waitlist')
    await expect(content).toContain('Already have an account?')
  })
})
