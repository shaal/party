import { Menu, Transition } from '@headlessui/react'
import { LightningBoltIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { Fragment } from 'react'

const NextLink = ({ href, children, ...rest }: any) => (
  <Link href={href}>
    <a {...rest}>{children}</a>
  </Link>
)

const Notifications: React.FC = () => {
  return (
    <Menu as="div">
      {({ open }) => (
        <Fragment>
          <Menu.Button className="flex items-center gap-2">
            <LightningBoltIcon className="h-6 w-6" />
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
              className="origin-top-right absolute right-0 w-96 rounded-lg shadow-md py-1 bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none mt-2"
            >
              <Menu.Item
                as={NextLink}
                href="/"
                className={({ active }: any) =>
                  clsx(
                    { 'bg-gray-100 dark:bg-gray-800': active },
                    'block px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200 cursor-pointer'
                  )
                }
              >
                <div>TBD</div>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Fragment>
      )}
    </Menu>
  )
}

export default Notifications
