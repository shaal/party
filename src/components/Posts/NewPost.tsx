import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'
import { object, string } from 'zod'
import { Form, useZodForm } from '../ui/Form'
import { TextArea } from '../ui/TextArea'
import {
  NewPostMutation,
  NewPostMutationVariables
} from './__generated__/NewPost.generated'
import { ErrorMessage } from '../ui/ErrorMessage'
import Button from '../ui/Button'
import { Card, CardBody } from '../ui/Card'
import { PencilAltIcon } from '@heroicons/react/outline'

const newPostSchema = object({
  body: string().min(1)
})

export function NewPost() {
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
        <Form
          form={form}
          className="space-y-1"
          onSubmit={({ body }) =>
            createPost({ variables: { input: { body } } })
          }
        >
          <ErrorMessage
            title="Failed to create post"
            error={createPostResult.error}
          />
          <TextArea
            {...form.register('body')}
            placeholder="What's on your mind?"
          />
          <div className="ml-auto">
            <Button type="submit" className="flex items-center gap-1.5">
              <PencilAltIcon className="h-4 w-4" />
              <div>Post</div>
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}
