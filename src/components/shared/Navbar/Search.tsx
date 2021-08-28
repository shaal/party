import { gql, useLazyQuery } from '@apollo/client'
import { Fragment } from 'react'

import {
  SearchPostsQuery,
  SearchProductsQuery,
  SearchUsersQuery
} from './__generated__/Search.generated'

export const SEARCH_POSTS_QUERY = gql`
  query SearchPostsQuery($keyword: String!) {
    searchPosts(first: 5, keyword: $keyword) {
      edges {
        node {
          id
          body
        }
      }
    }
  }
`

export const SEARCH_USERS_QUERY = gql`
  query SearchUsersQuery($keyword: String!) {
    searchUsers(first: 5, keyword: $keyword) {
      edges {
        node {
          id
          username
        }
      }
    }
  }
`

export const SEARCH_PRODUCTS_QUERY = gql`
  query SearchProductsQuery($keyword: String!) {
    searchProduct(first: 5, keyword: $keyword) {
      edges {
        node {
          id
          slug
        }
      }
    }
  }
`

const Search: React.FC = () => {
  const [searchPosts, { loading: postsLoading, data: posts }] =
    useLazyQuery<SearchPostsQuery>(SEARCH_POSTS_QUERY)
  const [searchUsers, { loading: usersLoading, data: users }] =
    useLazyQuery<SearchUsersQuery>(SEARCH_USERS_QUERY)
  const [searchProducts, { loading: productsLoading, data: products }] =
    useLazyQuery<SearchProductsQuery>(SEARCH_PRODUCTS_QUERY)

  const handleSearch = (evt: any) => {
    console.log(evt.target.value)
    searchPosts({
      variables: {
        keyword: evt.target.value
      }
    })
    searchUsers({
      variables: {
        keyword: evt.target.value
      }
    })
    searchProducts({
      variables: {
        keyword: evt.target.value
      }
    })
  }

  return (
    <Fragment>
      <input
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-brand-500 focus:ring-brand-400 outline-none rounded-lg shadow-sm w-full py-1.5"
        type="text"
        placeholder="Search Devparty..."
        onChange={handleSearch}
      />
    </Fragment>
  )
}

export default Search
