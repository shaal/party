import AppContext from '@components/utils/AppContext'
import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { Fragment, useContext } from 'react'
import { Post } from 'src/__generated__/schema.generated'

import Delete from './Delete'
import Follow from './Follow'
import Report from './Report'

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
                <Follow user={post?.user} />
                <Report post={post} />
              </>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default PostMenu
