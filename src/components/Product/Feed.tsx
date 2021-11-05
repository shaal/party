import { gql, useQuery } from '@apollo/client'
import SinglePost, { PostFragment } from '@components/Post/SinglePost'
import PostsShimmer from '@components/shared/Shimmer/PostsShimmer'
import { EmptyState } from '@components/UI/EmptyState'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { Spinner } from '@components/UI/Spinner'
import { Post, Product, ProductFeedQuery } from '@graphql/types.generated'
import { CollectionIcon } from '@heroicons/react/outline'
import React from 'react'
import useInView from 'react-cool-inview'
import { POLLING_INTERVAL } from 'src/constants'

const PRODUCT_FEED_QUERY = gql`
  query ProductFeed($after: String, $slug: String!) {
    product(slug: $slug) {
      id
      posts(first: 10, after: $after) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            ...PostFragment
          }
        }
      }
    }
  }
  ${PostFragment}
`

interface Props {
  product: Product
}

const ProductFeed: React.FC<Props> = ({ product }) => {
  const { data, loading, error, fetchMore } = useQuery<ProductFeedQuery>(
    PRODUCT_FEED_QUERY,
    {
      variables: {
        after: null,
        slug: product?.slug
      },
      skip: !product?.slug,
      pollInterval: POLLING_INTERVAL
    }
  )

  const posts = data?.product?.posts?.edges?.map((edge) => edge?.node)
  const pageInfo = data?.product?.posts?.pageInfo

  const { observe } = useInView({
    threshold: 1,
    onChange: ({ observe, unobserve }) => {
      unobserve()
      observe()
    },
    onEnter: () => {
      if (pageInfo?.hasNextPage) {
        fetchMore({
          variables: {
            after: pageInfo?.endCursor ? pageInfo?.endCursor : null
          }
        })
      }
    }
  })

  if (loading) return <PostsShimmer />

  return (
    <div>
      <ErrorMessage title="Failed to load posts" error={error} />
      <div className="space-y-3">
        {posts?.length === 0 ? (
          <EmptyState
            message={
              <div>
                <span>No posts found in</span>
                <span className="font-bold ml-1">{product?.name}</span>
              </div>
            }
            icon={<CollectionIcon className="h-8 w-8 text-brand-500" />}
          />
        ) : (
          posts?.map((post) => (
            <SinglePost key={post?.id} post={post as Post} showParent />
          ))
        )}
        {pageInfo?.hasNextPage && (
          <span ref={observe} className="flex justify-center p-5">
            <Spinner size="md" />
          </span>
        )}
      </div>
    </div>
  )
}

export default ProductFeed
