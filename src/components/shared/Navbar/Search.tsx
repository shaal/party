import { gql, useLazyQuery } from '@apollo/client'
import { Card } from '@components/UI/Card'
import { Input } from '@components/UI/Input'
import { Spinner } from '@components/UI/Spinner'
import useOnClickOutside from '@components/utils/hooks/useOnClickOutside'
import { SearchTopicsQuery, SearchUsersQuery } from '@graphql/types.generated'
import React, { useRef, useState } from 'react'

import UserProfile from '../UserProfile'

export const SEARCH_USERS_QUERY = gql`
  query SearchUsers($keyword: String!) {
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
  query SearchTopics($keyword: String!) {
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

  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let keyword = evt.target.value
    setSearchText(keyword)
    searchUsers({ variables: { keyword } })
    searchTopics({ variables: { keyword } })
  }

  return (
    <>
      <Input
        placeholder="Search Devparty..."
        value={searchText}
        onChange={handleSearch}
      />
      {searchText.length > 0 && (
        <div
          className="flex flex-col w-full sm:max-w-md absolute mt-2"
          ref={dropdownRef}
        >
          <Card className="py-2 max-h-[80vh] overflow-y-auto">
            {searchTopicsData?.searchTopics?.edges?.map((topic: any) => (
              <div key={topic?.node?.id} className="px-4 py-2">
                <a className="w-full" href={`/topics/${topic?.node?.name}`}>
                  #{topic?.node?.name}
                </a>
              </div>
            ))}
            {(searchTopicsData?.searchTopics?.edges?.length as number) > 0 && (
              <div className="border-t dark:border-gray-800 my-2" />
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
                    <a href={`/u/${user?.node?.username}`}>
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
