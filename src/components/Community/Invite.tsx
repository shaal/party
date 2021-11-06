import { useLazyQuery } from '@apollo/client'
import { SEARCH_USERS_QUERY } from '@components/shared/Navbar/Search'
import UserProfile from '@components/shared/UserProfile'
import { Button } from '@components/UI/Button'
import { Input } from '@components/UI/Input'
import { Modal } from '@components/UI/Modal'
import { Spinner } from '@components/UI/Spinner'
import useOnClickOutside from '@components/utils/hooks/useOnClickOutside'
import { Community, SearchUsersQuery } from '@graphql/types.generated'
import { UserAddIcon } from '@heroicons/react/outline'
import { useRef, useState } from 'react'

interface Props {
  community: Community
}

const Invite: React.FC<Props> = ({ community }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const dropdownRef = useRef(null)

  useOnClickOutside(dropdownRef, () => setSearchText(''))

  const [searchUsers, { data: searchUsersData, loading: searchUsersLoading }] =
    useLazyQuery<SearchUsersQuery>(SEARCH_USERS_QUERY)

  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let keyword = evt.target.value
    setSearchText(keyword)
    searchUsers({ variables: { keyword } })
  }

  return (
    <div>
      <Button
        icon={<UserAddIcon className="h-4 w-4" />}
        outline
        onClick={() => setShowModal(!showModal)}
      >
        Invite
      </Button>
      <Modal
        onClose={() => setShowModal(!showModal)}
        title="Invite members"
        show={showModal}
      >
        <div className="px-5 py-3.5 space-y-5">
          <div>
            <Input
              placeholder="Search for people"
              value={searchText}
              onChange={handleSearch}
            />
          </div>
          {searchText.length === 0 && (
            <div className="space-y-2">
              <div className="text-xl font-bold">
                Search for people to invite
              </div>
              <div>Search results will include all peoples in Devparty.</div>
            </div>
          )}
          {searchText.length > 0 && (
            <div>
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
                      className="hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg"
                    >
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          alert(user?.node?.id)
                        }}
                      >
                        <UserProfile user={user?.node} />
                      </div>
                    </div>
                  ))}
                  {searchUsersData?.searchUsers?.edges?.length === 0 && (
                    <div className="px-4 py-2">No matching users</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default Invite
