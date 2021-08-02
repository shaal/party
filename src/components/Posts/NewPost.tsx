import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'
import { object, string } from 'zod'
import { Container } from '../ui/Container'
import { Form, useZodForm } from '../ui/Form'
import { SubmitButton } from '../ui/SubmitButton'
import { TextArea } from '../ui/TextArea'
import {
  NewPostMutation,
  NewPostMutationVariables
} from './__generated__/NewPost.generated'
import { ErrorMessage } from '../ui/ErrorMessage'

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

        // Insert post to the front of the posts list:
        cache.modify({
          fields: {
            posts(existingPosts = []) {
              return [data.createPost, ...existingPosts]
            }
          }
        })
      },
      onCompleted() {
        router.push('/posts')
      }
    }
  )

  const form = useZodForm({
    schema: newPostSchema
  })

  return (
    <Container title="New Post">
      <Form
        form={form}
        onSubmit={({ text }) => createPost({ variables: { input: { text } } })}
      >
        <ErrorMessage
          title="Failed to create post"
          error={createPostResult.error}
        />
        <TextArea label="Text" {...form.register('text')} />
        <SubmitButton>Create Post</SubmitButton>
      </Form>
    </Container>
  )
}
