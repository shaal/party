import { expect, test } from '@playwright/test'

test('get single product', async ({ request }) => {
  // GraphQL Warmup
  await request.get('/api/graphql', {
    params: { warmup: true }
  })

  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        product(slug: "devparty") {
          slug
        }
      }`
    }
  })
  const result = await response.json()
  const product = result.data.product

  expect(product.slug).toBe('devparty')
})

test('get multiple products', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        products {
          edges {
            node {
              slug
            }
          }
        }
      }`
    }
  })
  const result = await response.json()

  expect(result.data.products.edges.length).toBe(20)
})

test('product should have owner', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        product(slug: "devparty") {
          owner {
            username
          }
        }
      }`
    }
  })
  const result = await response.json()
  const product = result.data.product

  expect(product.owner.username).toBe('yoginth')
})

test('connection should have count', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        product(slug: "devparty") {
          posts {
            totalCount
          }
          subscribers {
            totalCount
          }
        }
      }`
    }
  })
  const result = await response.json()
  const product = result.data.product

  expect(typeof product.posts.totalCount).toBe('number')
  expect(typeof product.subscribers.totalCount).toBe('number')
})

test('flags should return boolean', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        product(slug: "devparty") {
          hasSubscribed
        }
      }`
    }
  })
  const result = await response.json()
  const product = result.data.product

  expect(typeof product.hasSubscribed).toBe('boolean')
})
