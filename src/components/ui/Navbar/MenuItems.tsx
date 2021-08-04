import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Fragment } from 'react'
import { User } from '~/__generated__/schema.generated'
import Username from '../Username'
import { gql, useMutation } from '@apollo/client'
import { useAuthRedirect } from '~/components/utils/useAuthRedirect'
import Image from 'next/image'

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

  return (
    <Menu as="div">
      {({ open }) => (
        <Fragment>
          <Menu.Button className="flex items-center gap-2">
            <Image
              height="35"
              width="35"
              className="rounded-full bg-gray-200"
              src="https://cloudflare-ipfs.com/ipfs/QmbzAr9sukMdj7F6apkEkQWn7s11tCYyDZpxTwUyd3opv9"
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
                  <Username username={currentUser?.username} />
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
            </Menu.Items>
          </Transition>
        </Fragment>
      )}
    </Menu>
  )
}

export default MenuItems
