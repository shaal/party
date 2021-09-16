import { gql, useQuery } from '@apollo/client'
import SinglePost, { PostFragment } from '@components/Post/SinglePost'
import PostsShimmer from '@components/shared/Shimmer/PostsShimmer'
import { EmptyState } from '@components/ui/EmptyState'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { CollectionIcon } from '@heroicons/react/outline'
import React from 'react'
import useInView from 'react-cool-inview'
import { Product } from 'src/__generated__/schema.generated'

import { ProductFeedQuery } from './__generated__/Feed.generated'

const PRODUCT_FEED_QUERY = gql`
  query ProductFeedQuery($after: String, $where: WhereProductInput!) {
    product(where: $where) {
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
        where: { slug: product?.slug }
      }
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
            icon={<CollectionIcon className="h-8 w-8" />}
          />
        ) : (
          posts?.map((post: any) => (
            <SinglePost key={post?.id} post={post} showParent />
          ))
        )}
        {pageInfo?.hasNextPage && <span ref={observe}></span>}
      </div>
    </div>
  )
}

export default ProductFeed
