import { Menu, Transition } from '@headlessui/react'
import { SparklesIcon, UsersIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { Fragment } from 'react'

const NextLink = ({ href, children, ...rest }: any) => (
  <Link href={href}>
    <a {...rest}>{children}</a>
  </Link>
)

const MoreNavItems: React.FC = () => {
  return (
    <Menu as="div">
      {({ open }) => (
        <>
          <Menu.Button
            className={clsx('px-3 py-1 rounded-md font-black cursor-pointer', {
              'text-black dark:text-white bg-gray-200 dark:bg-gray-800': open,
              'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800':
                !open
            })}
          >
            More
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
              className="absolute w-48 rounded-lg shadow-md py-1 bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none mt-2 border dark:border-gray-800"
            >
              <Menu.Item
                as={NextLink}
                href="/communities"
                className={({ active }: any) =>
                  clsx(
                    { 'bg-gray-100 dark:bg-gray-800': active },
                    'block px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200 m-2 rounded-lg cursor-pointer'
                  )
                }
              >
                <div className="flex items-center space-x-1.5">
                  <UsersIcon className="h-4 w-4" />
                  <div>Communities</div>
                </div>
              </Menu.Item>
              <div className="border-b dark:border-gray-800" />
              <Menu.Item
                as={NextLink}
                href="https://tally.so/r/nPYB1m"
                className={({ active }: any) =>
                  clsx(
                    { 'bg-gray-100 dark:bg-gray-800': active },
                    'block px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200 m-2 rounded-lg cursor-pointer'
                  )
                }
              >
                <div className="flex items-center space-x-1.5">
                  <SparklesIcon className="h-4 w-4" />
                  <div>Contact</div>
                </div>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default MoreNavItems
