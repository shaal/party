import { XIcon } from '@heroicons/react/outline'
import React, { useEffect } from 'react'

interface Props {
  title: string
  children: React.ReactChild[] | React.ReactChild
  visible: boolean
  onClose: () => void
  onEnter?: () => boolean
}

export const Modal: React.FC<Props> = (props) => {
  const handler = (evt: KeyboardEvent) => {
    if (evt.defaultPrevented) {
      return
    }
    if (evt.key === 'Escape') {
      props.onClose()
    }
    if (evt.key === 'Enter') {
      if (props.onEnter) {
        if (props.onEnter()) {
          props.onClose()
        }
      } else {
        props.onClose()
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [])

  if (!props.visible) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-70 z-50 w-screen h-screen">
      <div
        className="w-screen h-screen align-middle"
        style={{ display: 'table-cell' }}
      >
        <div
          className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg max-w-lg mx-auto text-left"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b dark:border-gray-800 px-5 py-3.5">
            <div className="font-bold">{props.title}</div>
            <div
              className="cursor-pointer text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md p-1"
              onClick={props.onClose}
            >
              <XIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="border-gray-200 dark:border-gray-800 px-5 py-3.5">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}
