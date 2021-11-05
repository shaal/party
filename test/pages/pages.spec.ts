import { expect, test } from '@playwright/test'

test.describe('Pages', () => {
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

  test('404 page should contains test texts', async ({ page }) => {
    await page.goto('/404')
    const content = await page.content()
    await expect(content).toContain('Oops, Lost‽')
    await expect(content).toContain('This page could not be found.')
  })

  test('500 page should contains test texts', async ({ page }) => {
    await page.goto('/500')
    const content = await page.content()
    await expect(content).toContain('Looks like something went wrong!')
  })

  test('offline page should contains test texts', async ({ page }) => {
    await page.goto('/_offline')
    const content = await page.content()
    await expect(content).toContain('You are offline!')
  })
})
