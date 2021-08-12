import { Tab } from '@headlessui/react'
import {
  CheckCircleIcon,
  CollectionIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import React, { Fragment } from 'react'

import { Button } from '../../ui/Button'
import { Card, CardBody } from '../../ui/Card'
import PostType from './Type/Post'

const QuestionType = dynamic(() => import('./Type/Question'), {
  loading: () => <Loading />
})
const TaskType = dynamic(() => import('./Type/Task'), {
  loading: () => <Loading />
})

const Loading = () => <div className="shimmer rounded-lg h-10"></div>

const NewPost: React.FC = () => {
  return (
    <Card>
      <CardBody>
        <Tab.Group>
          <Tab.List className="flex space-x-2">
            <Tab as={Fragment}>
              {({ selected }) => (
                <Button
                  size="sm"
                  className="flex items-center gap-1.5 text-sm"
                  outline={!selected}
                >
                  <CollectionIcon className="h-4 w-4" />
                  <div>Post</div>
                </Button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <Button
                  size="sm"
                  className="flex items-center gap-1.5 text-sm"
                  outline={!selected}
                >
                  <CheckCircleIcon className="h-4 w-4" />
                  <div>Task</div>
                </Button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <Button
                  size="sm"
                  className="flex items-center gap-1.5 text-sm"
                  outline={!selected}
                >
                  <QuestionMarkCircleIcon className="h-4 w-4" />
                  <div>Question</div>
                </Button>
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
