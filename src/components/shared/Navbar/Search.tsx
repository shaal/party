import { gql, useLazyQuery } from '@apollo/client'
import { Card } from '@components/ui/Card'
import { Spinner } from '@components/ui/Spinner'
import useOnClickOutside from '@components/utils/useOnClickOutside'
import React, { useRef, useState } from 'react'

import UserProfile from '../UserProfile'
import { SearchUsersQuery } from './__generated__/Search.generated'

const SEARCH_USERS_QUERY = gql`
  query SearchUsersQuery($keyword: String!) {
    searchUsers(first: 10, keyword: $keyword) {
      edges {
        node {
          id
          username
          isVerified
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

const SEARCH_TOPICS_QUERY = gql`
  query SearchTopicsQuery($keyword: String!) {
    searchTopics(first: 5, keyword: $keyword) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('')
  const dropdownRef = useRef(null)

  useOnClickOutside(dropdownRef, () => setSearchText(''))

  const [searchUsers, { data: searchUsersData, loading: searchUsersLoading }] =
    useLazyQuery<SearchUsersQuery>(SEARCH_USERS_QUERY)
  const [searchTopics, { data: searchTopicsData }] =
    useLazyQuery<SearchTopicsQuery>(SEARCH_TOPICS_QUERY)

  const handleSearch = (evt: any) => {
    let keyword = evt.target.value
    setSearchText(keyword)
    searchUsers({ variables: { keyword } })
    searchTopics({ variables: { keyword } })
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
            {searchTopicsData?.searchTopics?.edges?.map((topic: any) => (
              <div
                key={topic?.node?.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2"
              >
                <a className="w-full" href={`/topics/${topic?.node?.name}`}>
                  #{topic?.node?.name}
                </a>
              </div>
            ))}
            {searchTopicsData?.searchTopics?.edges?.length > 0 && (
              <div className="border-t my-2" />
            )}
            {searchUsersLoading ? (
              <div className="px-4 py-2 font-bold text-center space-y-2 text-sm">
                <Spinner size="sm" className="mx-auto" />
                <div>Searching users</div>
              </div>
            ) : (
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
                  <div className="px-4 py-2">No matching users</div>
                )}
              </div>
            )}
          </Card>
        </div>
      )}
    </>
  )
}

export default Search
