import { BadgeCheckIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import React, { useContext, useState } from 'react'

import { User } from '~/__generated__/schema.generated'
import AppContext from '~/components/utils/AppContext'

import { Modal } from '../ui/Modal'
import { Tooltip } from '../ui/Tooltip'
import Follow from '../User/Follow'
import Slug from './Slug'

interface Props {
  user: User
  showFollow?: boolean
}

const UserProfileLarge: React.FC<Props> = ({ user, showFollow = false }) => {
  const { currentUser } = useContext(AppContext)
  const [editModal, setEditModal] = useState(false)

  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-3 items-center">
        <img
          src={user?.profile?.avatar as string}
          className="h-14 w-14 rounded-full bg-gray-200"
          alt={`@${user?.username}'s avatar`}
        />
        <div className="space-y-2">
          <div>
            <div className="flex items-center gap-1.5">
              <Link href={`/@${user?.username}`} passHref>
                <div className="font-bold cursor-pointer flex items-center space-x-1">
                  <div>{user?.profile?.name}</div>
                  {user?.isVerified && (
                    <Tooltip content={'Verified'}>
                      <BadgeCheckIcon className="h-4 w-4 text-brand-500" />
                    </Tooltip>
                  )}
                </div>
              </Link>
            </div>
            <Slug slug={user?.username} prefix="@" />
          </div>
          <div>{user?.profile?.bio}</div>
        </div>
      </div>
      {currentUser && showFollow && <Follow user={user} showText />}
      <button onClick={() => setEditModal(!editModal)}>sdg</button>
      {editModal && (
        <Modal
          title="Edit Permissions"
          visible={true}
          onClose={() => setEditModal(!editModal)}
        >
          <div className="border-gray-200 dark:border-gray-800">Yo</div>
        </Modal>
      )}
    </div>
  )
}

export default UserProfileLarge
