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

test('user should have owned products', async ({ request }) => {
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

test('user should have communities', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        user(username: "yoginth") {
          communities(first: 2) {
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

  expect(user.communities.edges.length).toBe(2)
})

test('user should have posts', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        user(username: "yoginth") {
          posts(first: 5) {
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

  expect(user.posts.edges.length).toBe(5)
})

test('user should have followers and following', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        user(username: "yoginth") {
          followers {
            totalCount
          }
          following {
            totalCount
          }
        }
      }`
    }
  })
  const result = await response.json()
  const user = result.data.user

  expect(typeof user.followers.totalCount).toBe('number')
  expect(typeof user.following.totalCount).toBe('number')
})

test('flags should return boolean', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        user(username: "yoginth") {
          hasFollowed
          isFollowing
          inWaitlist
          isStaff
          isVerified
          spammy
        }
      }`
    }
  })
  const result = await response.json()
  const user = result.data.user

  expect(typeof user.hasFollowed).toBe('boolean')
  expect(typeof user.isFollowing).toBe('boolean')
  expect(typeof user.inWaitlist).toBe('boolean')
  expect(typeof user.isStaff).toBe('boolean')
  expect(typeof user.isVerified).toBe('boolean')
  expect(typeof user.spammy).toBe('boolean')
})
