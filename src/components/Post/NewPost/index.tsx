import { Tab } from '@headlessui/react'
import {
  CheckCircleIcon,
  CollectionIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import React from 'react'

import { Button } from '../../ui/Button'
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
          <Tab.List className="flex space-x-2">
            <Tab
              as={Button}
              size="sm"
              className="flex items-center gap-1.5 text-sm"
            >
              <CollectionIcon className="h-4 w-4" />
              <div>Post</div>
            </Tab>
            <Tab
              as={Button}
              size="sm"
              className="flex items-center gap-1.5 text-sm"
            >
              <CheckCircleIcon className="h-4 w-4" />
              <div>Task</div>
            </Tab>
            <Tab
              as={Button}
              size="sm"
              className="flex items-center gap-1.5 text-sm"
            >
              <QuestionMarkCircleIcon className="h-4 w-4" />
              <div>Question</div>
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
