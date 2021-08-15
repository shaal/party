import { gql, useMutation } from '@apollo/client'
import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Fragment, useContext } from 'react'

import { User } from '../../../__generated__/schema.generated'
import { Dropdown } from '../../ui/Dropdown'
import AppContext from '../../utils/AppContext'
import { useAuthRedirect } from '../../utils/useAuthRedirect'
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
  const { theme, themes, setTheme } = useTheme()
  const { staffMode, setStaffMode } = useContext(AppContext)
  const authRedirect = useAuthRedirect()
  const [logout] = useMutation(
    gql`
      mutation UserInfoLogoutMutation {
        logout
      }
    `,
    {
      onCompleted() {
        authRedirect()
      }
    }
  )

  const toggleStaffMode = () => {
    localStorage.setItem('staffMode', String(!staffMode))
    setStaffMode(!staffMode)
  }

  return (
    <Menu as="div">
      {({ open }) => (
        <Fragment>
          <Menu.Button className="flex items-center gap-2">
            <img
              className="h-10 w-10 rounded-full bg-gray-200"
              src={currentUser?.profile?.avatar as string}
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
                href={`/${currentUser?.username}`}
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
                href={`/${currentUser?.username}`}
                className={({ active }: any) =>
                  clsx(
                    { 'bg-gray-100 dark:bg-gray-800': active },
                    'block px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200 m-2 rounded-lg cursor-pointer'
                  )
                }
              >
                Your Profile
              </Menu.Item>
              <Menu.Item
                as={NextLink}
                href="/settings"
                className={({ active }: any) =>
                  clsx(
                    { 'bg-gray-100 dark:bg-gray-800': active },
                    'block px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200 m-2 rounded-lg cursor-pointer'
                  )
                }
              >
                Settings
              </Menu.Item>
              <Menu.Item
                as="div"
                onClick={() => logout()}
                className={({ active }: any) =>
                  clsx(
                    { 'bg-gray-100 dark:bg-gray-800': active },
                    'block px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200 m-2 rounded-lg cursor-pointer'
                  )
                }
              >
                Logout
              </Menu.Item>
              <div className="border-b dark:border-gray-800"></div>
              <div className="px-5 py-3 text-sm flex items-center gap-2">
                <Dropdown
                  className="w-full block"
                  options={themes.map((t) => ({
                    value: t,
                    label: t.charAt(0).toUpperCase() + t.slice(1)
                  }))}
                  value={theme}
                  onChange={setTheme}
                />
              </div>
              {currentUser?.isStaff && (
                <Fragment>
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
                    {staffMode ? 'Disable staff mode' : 'Enable staff mode'}
                  </Menu.Item>
                </Fragment>
              )}
            </Menu.Items>
          </Transition>
        </Fragment>
      )}
    </Menu>
  )
}

export default MenuItems
