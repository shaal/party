import { gql, useLazyQuery } from '@apollo/client'
import mixpanel from 'mixpanel-browser'
import Link from 'next/link'
import React, { useState } from 'react'

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
  const [searchText, setSearchText] = useState<string>('')
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false)

  const [searchPosts, { data: searchPostsData }] =
    useLazyQuery<SearchPostsQuery>(SEARCH_POSTS_QUERY)
  const [searchUsers, { data: searchUsersData }] =
    useLazyQuery<SearchUsersQuery>(SEARCH_USERS_QUERY)
  const [searchProducts, { data: searchProductsData }] =
    useLazyQuery<SearchProductsQuery>(SEARCH_PRODUCTS_QUERY)

  const handleSearch = (evt: any) => {
    let keyword = evt.target.value
    setSearchText(keyword)
    setShowSearchResults(keyword.length > 0)
    searchPosts({ variables: { keyword } })
    searchUsers({ variables: { keyword } })
    searchProducts({ variables: { keyword } })
  }

  return (
    <>
      <input
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-brand-500 focus:ring-brand-400 outline-none rounded-lg shadow-sm w-full py-1.5"
        type="text"
        placeholder="Search Devparty..."
        value={searchText}
        onChange={handleSearch}
      />
      {searchText.length > 0 && (
        <div className="flex flex-col max-h-[80vh] w-full sm:max-w-lg overflow-y-scroll absolute mt-2 border dark:border-gray-800 bg-white dark:bg-gray-900 rounded-lg shadow">
          {searchUsersData?.searchUsers?.edges?.map((user: any, index: any) => (
            <Link
              href={`/@/${user?.node?.username}`}
              key={user?.node?.id}
              passHref
            >
              <div
                className={`flex items-center w-full p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800`}
                key={index}
                onClick={() => {
                  setShowSearchResults(false)
                  setSearchText('')
                  mixpanel.track('Clicked Search result')
                }}
              >
                {user?.node?.username}
              </div>
            </Link>
          ))}
          {searchUsersData?.searchUsers?.edges?.length === 0 && (
            <div className="flex w-full p-4 dark:text-gray-400">
              No matching people
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Search
