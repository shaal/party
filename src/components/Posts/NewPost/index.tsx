import { Tab } from '@headlessui/react'
import {
  CheckCircleIcon,
  CollectionIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/outline'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import React, { Fragment } from 'react'

import { Card, CardBody } from '../../ui/Card'
import PostType from './Type/Post'

const QuestionType = dynamic(() => import('./Type/Question'), {
  // eslint-disable-next-line react/display-name
  loading: () => <Loading />
})
const TaskType = dynamic(() => import('./Type/Task'), {
  // eslint-disable-next-line react/display-name
  loading: () => <Loading />
})

const Loading = () => <div className="shimmer rounded-lg h-10"></div>

const NewPost: React.FC = () => {
  return (
    <Card>
      <CardBody>
        <Tab.Group>
          <Tab.List className="flex space-x-5">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={clsx(
                    { 'text-indigo-500': selected },
                    { 'text-gray-400': !selected },
                    'flex items-center gap-1.5 text-sm'
                  )}
                >
                  <CollectionIcon className="h-5 w-5" />
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={clsx(
                    { 'text-indigo-500': selected },
                    { 'text-gray-400': !selected },
                    'flex items-center gap-1.5 text-sm'
                  )}
                >
                  <CheckCircleIcon className="h-5 w-5" />
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={clsx(
                    { 'text-indigo-500': selected },
                    { 'text-gray-400': !selected },
                    'flex items-center gap-1.5 text-sm'
                  )}
                >
                  <QuestionMarkCircleIcon className="h-5 w-5" />
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-4">
            <Tab.Panel>
              <PostType />
            </Tab.Panel>
            <Tab.Panel>
              <TaskType />
            </Tab.Panel>
            <Tab.Panel>
              <QuestionType />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </CardBody>
    </Card>
  )
}

export default NewPost
