import { gql, useLazyQuery } from '@apollo/client'
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'

import { SearchPostsQuery } from './__generated__/Search.generated'

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

const Search: React.FC = () => {
  const [searchPosts, { loading, data }] =
    useLazyQuery<SearchPostsQuery>(SEARCH_POSTS_QUERY)

  const handleSearch = (evt: any) => {
    searchPosts({
      variables: {
        keyword: evt.target.value
      }
    })
  }

  return (
    <Fragment>
      <Popover className="relative">
        <Popover.Button className="flex">
          <input
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-400 outline-none rounded-lg shadow-sm w-full py-1.5"
            type="text"
            placeholder="Search Devparty..."
            onChange={handleSearch}
          />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Popover.Panel className="text-black dark:text-gray-200 absolute right-0 w-full min-w-max py-1 mt-2">
            <div className="bg-white dark:bg-gray-900 py-3 px-5 shadow-md rounded-lg transition border border-gray-200 dark:border-gray-800 max-h-[80vh] space-y-6 overflow-y-scroll">
              Hello
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </Fragment>
  )
}

export default Search
