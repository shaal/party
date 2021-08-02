import { useRouter } from 'next/router'
import { gql, Reference, useMutation, useQuery } from '@apollo/client'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { ErrorMessage } from '../ui/ErrorMessage'
import { Shimmer } from '../ui/Shimmer'
import {
  PostQuery,
  ViewPostDeleteMutation,
  ViewPostDeleteMutationVariables
} from './__generated__/ViewPost.generated'

export const query = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      text
    }
  }
`

export function ViewPost() {
  const router = useRouter()
  const { data, loading, error } = useQuery<PostQuery>(query, {
    variables: {
      id: router.query.postId
    },
    // NOTE: In the event that the router is not currently ready, we need to
    // pause the request to avoid it making requests with incorrect variables.
    skip: !router.isReady
  })

  const [deletePost, deletePostResult] = useMutation<
    ViewPostDeleteMutation,
    ViewPostDeleteMutationVariables
  >(
    gql`
      mutation ViewPostDeleteMutation($input: DeletePostInput!) {
        deletePost(input: $input) {
          id
        }
      }
    `,
    {
      update(cache) {
        cache.modify({
          fields: {
            posts(existingPosts, { readField }) {
              return existingPosts.filter(
                (postRef: Reference) =>
                  data!.post.id !== readField('id', postRef)
              )
            }
          }
        })
      },
      onCompleted() {
        router.push('/posts')
      }
    }
  )

  return (
    <Container
      title="Post"
      action={
        data && (
          <Button
            variant="danger"
            disabled={deletePostResult.loading}
            onClick={() =>
              deletePost({ variables: { input: { id: data.post.id } } })
            }
          >
            Delete Post
          </Button>
        )
      }
    >
      {loading && <Shimmer />}

      <ErrorMessage title="Failed to load post" error={error} />

      <ErrorMessage
        title="Failed to delete post"
        error={deletePostResult.error}
      />

      {data && <div className="prose-xl">{data?.post.text}</div>}
    </Container>
  )
}
