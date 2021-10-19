import AppContext from '@components/utils/AppContext'
import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon, FlagIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { Fragment, useContext } from 'react'
import { Post, User } from 'src/__generated__/schema.generated'

import Delete from './Delete'
import Follow from './Follow'

interface Props {
  post: Post
}

const PostMenu: React.FC<Props> = ({ post }) => {
  const { currentUser } = useContext(AppContext)

  return (
    <div>
      <Menu as="div" className="absolute z-[5]">
        <div>
          <Menu.Button>
            <DotsVerticalIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </Menu.Button>
        </div>
        <Transition
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
            className="absolute w-52 rounded-lg py-1 shadow-sm bg-white dark:bg-gray-900 border dark:border-gray-800"
          >
            {currentUser?.id === post?.user?.id ? (
              <Delete post={post} />
            ) : (
              <>
                <Follow user={post?.user as User} />
                <Menu.Item
                  as="div"
                  className={({ active }: any) =>
                    clsx(
                      { 'bg-gray-100 dark:bg-gray-800': active },
                      'block px-4 py-1.5 text-sm text-red-500 m-2 rounded-lg cursor-pointer'
                    )
                  }
                >
                  <div className="flex items-center space-x-2">
                    <FlagIcon className="h-4 w-4" />
                    <div>Report Post</div>
                  </div>
                </Menu.Item>
              </>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default PostMenu
