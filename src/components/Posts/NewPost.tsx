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
import { GridLayout } from '../ui/GridLayout'
import Button from '../ui/Button'

const newPostSchema = object({
  text: string().min(1)
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
          text
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
      }
    }
  )

  const form = useZodForm({
    schema: newPostSchema
  })

  return (
    <Form
      form={form}
      onSubmit={({ text }) => createPost({ variables: { input: { text } } })}
    >
      <ErrorMessage
        title="Failed to create post"
        error={createPostResult.error}
      />
      <TextArea label="Text" {...form.register('text')} />
      <Button type="submit">Create Post</Button>
    </Form>
  )
}
