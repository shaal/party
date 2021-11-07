import AppContext from '@components/utils/AppContext'
import { Post, User } from '@graphql/types.generated'
import { Menu, Transition } from '@headlessui/react'
import {
  CodeIcon,
  DotsHorizontalIcon,
  ShieldExclamationIcon
} from '@heroicons/react/outline'
import clsx from 'clsx'
import { Fragment, useContext } from 'react'

import Bookmark from './Bookmark'
import Delete from './Delete'
import Follow from './Follow'

interface Props {
  post: Post
}

const PostMenu: React.FC<Props> = ({ post }) => {
  const { currentUser } = useContext(AppContext)

  return (
    <Menu as="div">
      {({ open }) => (
        <>
          <Menu.Button className="hover:bg-gray-300 hover:bg-opacity-20 p-1.5 rounded-full">
            <DotsHorizontalIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
          </Menu.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute w-max rounded-lg shadow-sm py-1 bg-white dark:bg-gray-900 border dark:border-gray-800 z-[5]"
            >
              {currentUser?.id !== post?.user?.id && (
                <Follow user={post?.user as User} />
              )}
              <Bookmark post={post} />
              <Menu.Item
                as="div"
                className={({ active }: { active: boolean }) =>
                  clsx(
                    { 'bg-gray-100 dark:bg-gray-800': active },
                    'block px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200 m-2 rounded-lg cursor-pointer'
                  )
                }
              >
                <div className="flex items-center space-x-2">
                  <CodeIcon className="h-4 w-4" />
                  <div>Embed Post</div>
                </div>
              </Menu.Item>
              {currentUser?.id === post?.user?.id ? (
                <Delete post={post} />
              ) : (
                <Menu.Item
                  as="div"
                  className={({ active }: { active: boolean }) =>
                    clsx(
                      { 'bg-gray-100 dark:bg-gray-800': active },
                      'block px-4 py-1.5 text-sm text-red-500 m-2 rounded-lg cursor-pointer'
                    )
                  }
                >
                  <div className="flex items-center space-x-2">
                    <ShieldExclamationIcon className="h-4 w-4" />
                    <div>Report Post</div>
                  </div>
                </Menu.Item>
              )}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default PostMenu
