import { gql, useLazyQuery } from '@apollo/client'
import { Card } from '@components/ui/Card'
import useOnClickOutside from '@components/utils/useOnClickOutside'
import React, { useRef, useState } from 'react'

import UserProfile from '../UserProfile'
import { SearchUsersQuery } from './__generated__/Search.generated'

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

interface EmptyStateProps {
  type: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => (
  <div className="flex w-full p-4 dark:text-gray-400">No matching {type}</div>
)

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('')
  const dropdownRef = useRef(null)

  useOnClickOutside(dropdownRef, () => setSearchText(''))

  const [searchUsers, { data: searchUsersData }] =
    useLazyQuery<SearchUsersQuery>(SEARCH_USERS_QUERY)

  const handleSearch = (evt: any) => {
    let keyword = evt.target.value
    setSearchText(keyword)
    searchUsers({ variables: { keyword } })
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
        <div
          className="flex flex-col w-full sm:max-w-lg absolute mt-2"
          ref={dropdownRef}
        >
          <Card className="py-2">
            <div>
              {searchUsersData?.searchUsers?.edges?.map((user: any) => (
                <div
                  key={user?.node?.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2"
                >
                  <a href={`/@/${user?.node?.username}`}>
                    <UserProfile user={user?.node} />
                  </a>
                </div>
              ))}
              {searchUsersData?.searchUsers?.edges?.length === 0 && (
                <EmptyState type="users" />
              )}
            </div>
          </Card>
        </div>
      )}
    </>
  )
}

export default Search
