import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'
import { object, string } from 'zod'
import { useZodForm } from '../../ui/Form'
import Button from '../../ui/Button'
import { Card, CardBody } from '../../ui/Card'
import {
  CheckCircleIcon,
  CollectionIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/outline'
import {
  NewPostMutation,
  NewPostMutationVariables
} from './__generated__/index.generated'
import { Tab } from '@headlessui/react'
import { PostType } from './Type/Post'
import React from 'react'

const newPostSchema = object({
  body: string().min(1)
})

export const NewPost: React.FC = () => {
  const router = useRouter()
  const [createPost, createPostResult] = useMutation<
    NewPostMutation,
    NewPostMutationVariables
  >(
    gql`
      mutation NewPostMutation($input: CreatePostInput!) {
        createPost(input: $input) {
          id
          body
        }
      }
    `,
    {
      update(cache, { data }) {
        if (!data?.createPost) return

        cache.modify({
          fields: {
            posts(existingPosts = []) {
              return [data.createPost, ...existingPosts]
            }
          }
        })
      },
      onCompleted() {
        // TODO: Clear Textarea
      }
    }
  )

  const form = useZodForm({
    schema: newPostSchema
  })

  return (
    <Card>
      <CardBody>
        <Tab.Group>
          <Tab.List className="space-x-2">
            <Tab>
              {({ selected }) => (
                <Button
                  size="sm"
                  className="flex items-center gap-1.5"
                  outline={!selected}
                >
                  <CollectionIcon className="h-4 w-4" />
                  <div>Post</div>
                </Button>
              )}
            </Tab>
            <Tab>
              {({ selected }) => (
                <Button
                  size="sm"
                  className="flex items-center gap-1.5"
                  outline={!selected}
                >
                  <CheckCircleIcon className="h-4 w-4" />
                  <div>Task</div>
                </Button>
              )}
            </Tab>
            <Tab>
              {({ selected }) => (
                <Button
                  size="sm"
                  className="flex items-center gap-1.5"
                  outline={!selected}
                >
                  <QuestionMarkCircleIcon className="h-4 w-4" />
                  <div>Question</div>
                </Button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-3">
            <Tab.Panel>
              <PostType />
            </Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </CardBody>
    </Card>
  )
}
