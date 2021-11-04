import { expect, test } from '@playwright/test'

test('page should containt "Get started"', async ({ page }) => {
  await page.goto('/')
  const name = await page.content()
  await expect(name).toContain('Get started')
  await expect(name).toContain('Join Devparty today.')
})

test('redirect to signup page', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Get started')
  await expect(page).toHaveURL('/signup')
})

test('redirect to login page', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Log in')
  await expect(page).toHaveURL('/login')
})
