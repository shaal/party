import { gql, useLazyQuery } from '@apollo/client'
import { Card } from '@components/ui/Card'
import useOnClickOutside from '@components/utils/useOnClickOutside'
import { UsersIcon } from '@heroicons/react/outline'
import React, { useRef, useState } from 'react'

import UserProfileSmall from '../UserProfileSmall'
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
          profile {
            id
            name
            avatar
          }
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

interface EmptyStateProps {
  type: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => (
  <div className="flex w-full p-4 dark:text-gray-400">No matching {type}</div>
)

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('')

  const dropdownRef = useRef(null)
  const searchInputContainerRef = useRef(null)

  useOnClickOutside(dropdownRef, () => setSearchText(''))

  const [searchPosts, { data: searchPostsData }] =
    useLazyQuery<SearchPostsQuery>(SEARCH_POSTS_QUERY)
  const [searchUsers, { data: searchUsersData }] =
    useLazyQuery<SearchUsersQuery>(SEARCH_USERS_QUERY)
  const [searchProducts, { data: searchProductsData }] =
    useLazyQuery<SearchProductsQuery>(SEARCH_PRODUCTS_QUERY)

  const handleSearch = (evt: any) => {
    let keyword = evt.target.value
    setSearchText(keyword)
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
        ref={searchInputContainerRef}
      />
      {searchText.length > 0 && (
        <div
          className="flex flex-col w-full sm:max-w-lg absolute mt-2"
          ref={dropdownRef}
        >
          <Card>
            <div>
              <div className="flex items-center space-x-2 text-sm font-bold p-5">
                <UsersIcon className="h-4 w-4" />
                <div>Users</div>
              </div>
              <div>
                {searchUsersData?.searchUsers?.edges?.map((user: any) => (
                  <div
                    key={user?.node?.id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 px-5 py-1"
                  >
                    <a href={`/@/${user?.node?.username}`}>
                      <UserProfileSmall user={user?.node} />
                    </a>
                  </div>
                ))}
                {searchUsersData?.searchUsers?.edges?.length === 0 && (
                  <EmptyState type="users" />
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}

export default Search
