import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon, UserIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { Fragment } from 'react'
import { Post } from 'src/__generated__/schema.generated'

interface Props {
  post: Post
}

const PostMenu: React.FC<Props> = ({ post }) => {
  return (
    <div>
      <Menu as="div" className="absolute z-[5]">
        <div>
          <Menu.Button>
            <DotsVerticalIcon className="h-5 w-5 text-gray-700" />
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
            className="absolute w-56 rounded-lg shadow-sm bg-white dark:bg-gray-900 border dark:border-gray-800"
          >
            <Menu.Item
              as="div"
              className={({ active }: any) =>
                clsx(
                  { 'bg-gray-100 dark:bg-gray-800': active },
                  'block px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200 m-2 rounded-lg cursor-pointer'
                )
              }
            >
              <div className="flex items-center space-x-1.5">
                <UserIcon className="h-4 w-4" />
                <div>Your Profile</div>
              </div>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
export default PostMenu
