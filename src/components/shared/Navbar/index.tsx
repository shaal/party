import { Disclosure } from '@headlessui/react'
import { LightningBoltIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Fragment } from 'react'

import { Button } from '~/components/ui/Button'
import AppContext from '~/components/utils/AppContext'

import MenuItems from './MenuItems'
import Search from './Search'
import StaffBar from './StaffBar'

interface NavItemProps {
  url: string
  name: string
  current: boolean
  isMobile: boolean
}

const NavItem = ({ url, name, current, isMobile }: NavItemProps) => {
  return (
    <Link href={url} passHref>
      <a
        className={clsx('px-3 py-1 rounded-md font-black cursor-pointer', {
          block: isMobile,
          'text-black dark:text-white bg-gray-200 dark:bg-gray-800': current,
          'text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800':
            !current
        })}
        aria-current={current ? 'page' : undefined}
      >
        {name}
      </a>
    </Link>
  )
}

interface NavItemsProps {
  isMobile?: boolean
}

const NavItems = ({ isMobile = false }: NavItemsProps) => {
  const router = useRouter()

  return (
    <Fragment>
      <NavItem
        url="/"
        name="Home"
        current={router.pathname == '/home'}
        isMobile={isMobile}
      />
      <NavItem
        url="/products"
        name="Products"
        current={router.pathname == '/products'}
        isMobile={isMobile}
      />
      <NavItem
        url="/discover"
        name="Discover"
        current={false}
        isMobile={isMobile}
      />
    </Fragment>
  )
}

const Navbar: React.FC = () => {
  const { currentUser, currentUserLoading, staffMode } = useContext(AppContext)

  return (
    <Disclosure
      as="nav"
      className="bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 backdrop-filter backdrop-blur-lg backdrop-saturate-150 w-full shadow sticky top-0 z-50"
    >
      {({ open }) => (
        <Fragment>
          {currentUser?.isStaff && staffMode && <StaffBar />}
          <div className="container mx-auto max-w-screen-2xl lg:px-16 md:px-10 sm:px-5 px-5">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:justify-start">
                <div className="flex-shrink-0 flex items-center space-x-3">
                  <Link href="/" passHref>
                    <a>
                      <img
                        className="block h-9 w-auto cursor-pointer"
                        src="/logo.svg"
                        alt="Devparty"
                      />
                    </a>
                  </Link>
                  <div className="text-xs rounded-md px-1.5 py-0.5 text-white bg-gradient-to-r from-brand-500 to-pink-500">
                    beta
                  </div>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex items-center space-x-4">
                    <Search />
                    <NavItems />
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {currentUserLoading ? (
                  <div className="shimmer rounded-full h-9 w-9"></div>
                ) : currentUser ? (
                  <div className="flex items-center gap-5">
                    {currentUser && (
                      <Link href="/notifications">
                        <a>
                          <LightningBoltIcon className="h-6 w-6" />
                        </a>
                      </Link>
                    )}
                    <MenuItems currentUser={currentUser} />
                  </div>
                ) : (
                  <div className="space-x-4 flex">
                    <div className="hidden sm:block">
                      <Link href="/signup" passHref>
                        <Button size="lg" variant="primary">
                          Signup
                        </Button>
                      </Link>
                    </div>
                    <div>
                      <Link href="/login" passHref>
                        <Button size="lg" variant="success">
                          Login
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavItems isMobile />
            </div>
          </Disclosure.Panel>
        </Fragment>
      )}
    </Disclosure>
  )
}

export default Navbar
