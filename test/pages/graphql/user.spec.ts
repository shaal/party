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
  const user = result.data.user

  expect(user.username).toBe('yoginth')
})

test('get multiple users', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        users {
          edges {
            node {
              username
            }
          }
        }
      }`
    }
  })
  const result = await response.json()

  expect(result.data.users.edges.length).toBe(20)
})

test('user should have profile', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        user(username: "yoginth") {
          profile {
            name
          }
        }
      }`
    }
  })
  const result = await response.json()
  const user = result.data.user

  expect(user.profile.name).toBe('Yoginth')
})

test('user should owned products', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        user(username: "yoginth") {
          ownedProducts(first: 5) {
            edges {
              node {
                id
              }
            }
          }
        }
      }`
    }
  })
  const result = await response.json()
  const user = result.data.user

  expect(user.ownedProducts.edges.length).toBe(5)
})
