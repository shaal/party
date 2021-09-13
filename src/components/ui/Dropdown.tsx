import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { Fragment } from 'react'

interface Props {
  options: any
  value: any
  onChange?: any
  label?: string
  disabled?: boolean
  className?: string
}

export const Dropdown: React.FC<Props> = ({
  options,
  value,
  onChange,
  disabled = false,
  className = ''
}) => {
  if (!options) return null

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      {({ open }) => (
        <>
          <div className={`relative ${className}`}>
            <Listbox.Button className="flex items-center justify-between bg-white dark:bg-gray-900 relative w-full border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2 cursor-default focus:outline-none sm:text-sm space-x-2">
              <span className="block truncate dark:text-gray-400 flex-1 text-left font-medium">
                {options?.filter((t: any) => t.value === value)?.[0]?.label}
              </span>
              <ChevronDownIcon className="h-4 w-4" />
            </Listbox.Button>

            <Transition show={open} as={Fragment}>
              <Listbox.Options
                static
                className="z-10 absolute mt-1 w-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md rounded-lg py-1 px-2 text-base focus:outline-none sm:text-sm"
              >
                {options.map((item: any) => (
                  <Listbox.Option
                    key={item.value}
                    className={({ active }) =>
                      clsx(
                        { 'bg-gray-100 dark:bg-gray-800': active },
                        'block px-3 py-1.5 my-1 text-sm text-gray-700 dark:text-gray-200 rounded-lg cursor-pointer'
                      )
                    }
                    value={item.value}
                  >
                    <span className="block truncate font-medium">
                      {item.label}
                    </span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
