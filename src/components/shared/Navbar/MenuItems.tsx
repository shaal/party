import AppContext from '@components/utils/AppContext'
import { imagekitURL } from '@components/utils/imagekitURL'
import { Menu, Transition } from '@headlessui/react'
import { ShieldCheckIcon, ShieldExclamationIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { LogOut, Settings, User as UserIcon } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Fragment, useContext } from 'react'
import { User } from 'src/__generated__/schema.generated'

import Slug from '../Slug'

const NextLink = ({ href, children, ...rest }: any) => (
  <Link href={href}>
    <a {...rest}>{children}</a>
  </Link>
)

interface Props {
  currentUser: User
}

const MenuItems: React.FC<Props> = ({ currentUser }) => {
  const { theme, setTheme } = useTheme()
  const { staffMode, setStaffMode } = useContext(AppContext)

  const toggleStaffMode = () => {
    localStorage.setItem('staffMode', String(!staffMode))
    setStaffMode(!staffMode)
  }

  return (
    <Menu as="div">
      {({ open }) => (
        <>
          <Menu.Button className="flex items-center gap-2">
            <img
              className="h-10 w-10 rounded-full bg-gray-200"
              src={imagekitURL(
                currentUser?.profile?.avatar as string,
                100,
                100
              )}
              alt={`@${currentUser?.username}'s avatar`}
            />
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
              className="origin-top-right absolute right-0 w-48 rounded-lg shadow-md py-1 bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none mt-2"
            >
              <Menu.Item
                as={NextLink}
                href={`/@/${currentUser?.username}`}
                className={({ active }: any) =>
                  clsx(
                    { 'bg-gray-100 dark:bg-gray-800': active },
                    'block px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200 m-2 rounded-lg cursor-pointer'
                  )
                }
              >
                <div>
                  <div className="font-bold">Signed in as</div>
                  <Slug slug={currentUser?.username} prefix="@" />
                </div>
              </Menu.Item>
              <div className="border-b dark:border-gray-800"></div>
              <Menu.Item
                as={NextLink}
                href={`/@/${currentUser?.username}`}
                className={({ active }: any) =>
                  clsx(
                    { 'bg-gray-100 dark:bg-gray-800': active },
                    'block px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200 m-2 rounded-lg cursor-pointer'
                  )
                }
              >
                <div className="flex items-center space-x-1.5">
                  <UserIcon size={16} />
                  <div>Your Profile</div>
                </div>
              </Menu.Item>
              <Menu.Item
                as={NextLink}
                href="/settings/profile"
                className={({ active }: any) =>
                  clsx(
                    { 'bg-gray-100 dark:bg-gray-800': active },
                    'block px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200 m-2 rounded-lg cursor-pointer'
                  )
                }
              >
                <div className="flex items-center space-x-1.5">
                  <Settings size={16} />
                  <div>Settings</div>
                </div>
              </Menu.Item>
              <Menu.Item
                as="a"
                href="/api/logout"
                className={({ active }: any) =>
                  clsx(
                    { 'bg-gray-100 dark:bg-gray-800': active },
                    'block px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200 m-2 rounded-lg cursor-pointer'
                  )
                }
              >
                <div className="flex items-center space-x-1.5">
                  <LogOut size={16} />
                  <div>Logout</div>
                </div>
              </Menu.Item>
              <div className="border-b dark:border-gray-800"></div>
              <div className="px-5 py-3 flex items-center space-x-3">
                <button
                  onClick={() => setTheme('light')}
                  className={theme === 'light' ? 'text-xl' : ''}
                >
                  🌞
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={theme === 'dark' ? 'text-xl' : ''}
                >
                  🌚
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={theme === 'system' ? 'text-xl' : ''}
                >
                  💻
                </button>
              </div>
              {currentUser?.isStaff && (
                <>
                  <div className="border-b dark:border-gray-800"></div>
                  <Menu.Item
                    as="div"
                    onClick={toggleStaffMode}
                    className={({ active }: any) =>
                      clsx(
                        { 'bg-yellow-100 dark:bg-yellow-800': active },
                        'block px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200 m-2 rounded-lg cursor-pointer'
                      )
                    }
                  >
                    {staffMode ? (
                      <div className="flex items-center space-x-1.5">
                        <div>Disable staff mode</div>
                        <ShieldExclamationIcon className="h-4 w-4 text-green-600" />
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1.5">
                        <div>Enable staff mode</div>
                        <ShieldCheckIcon className="h-4 w-4 text-red-500" />
                      </div>
                    )}
                  </Menu.Item>
                </>
              )}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default MenuItems
