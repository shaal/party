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

test('connection should have count', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        user(username: "yoginth") {
          posts {
            totalCount
          }
          ownedProducts {
            totalCount
          }
          communities {
            totalCount
          }
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

  expect(typeof user.posts.totalCount).toBe('number')
  expect(typeof user.ownedProducts.totalCount).toBe('number')
  expect(typeof user.communities.totalCount).toBe('number')
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
          hasSpotifyIntegration
          hasWakatimeIntegration
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
  expect(typeof user.hasSpotifyIntegration).toBe('boolean')
  expect(typeof user.hasWakatimeIntegration).toBe('boolean')
})
