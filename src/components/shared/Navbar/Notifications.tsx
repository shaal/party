import { Popover, Transition } from '@headlessui/react'
import { LightningBoltIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { Fragment } from 'react'

const NextLink = ({ href, children, ...rest }: any) => (
  <Link href={href}>
    <a {...rest}>{children}</a>
  </Link>
)

const Notifications: React.FC = () => {
  return (
    <Popover className="relative">
      <Popover.Button className="flex">
        <LightningBoltIcon className="h-6 w-6" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Popover.Panel className="text-black dark:text-gray-200 absolute right-0 w-full min-w-max">
          <div className="bg-white dark:bg-gray-900 py-2 px-2 shadow-md rounded-lg transition border border-gray-200 dark:border-gray-800 max-h-[80vh] space-y-5 overflow-y-scroll">
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
            <div>WIP</div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default Notifications
