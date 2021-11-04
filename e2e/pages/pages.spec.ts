import { expect, test } from '@playwright/test'

test.describe('Pages', () => {
  test('about page should contains test texts', async ({ page }) => {
    await page.goto('/about')
    const content = await page.content()
    await expect(content).toContain('the social media for')
    await expect(content).toContain('Join Devparty today.')
  })

  test('terms page should contains test texts', async ({ page }) => {
    await page.goto('/terms')
    const content = await page.content()
    await expect(content).toContain('Terms of Service')
  })

  test('privacy page should contains test texts', async ({ page }) => {
    await page.goto('/privacy')
    const content = await page.content()
    await expect(content).toContain('Privacy WIP')
  })

  test('thanks page should contains test texts', async ({ page }) => {
    await page.goto('/thanks')
    const content = await page.content()
    await expect(content).toContain('Thank you!')
    await expect(content).toContain('for supporting our community')
  })
})
