import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'

import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Post } from 'src/__generated__/schema.generated'

import { PostPollQuery } from './__generated__/Poll.generated'

export const POST_POLL_QUERY = gql`
  query PostPollQuery($id: ID!) {
    post(id: $id) {
      id
      poll {
        id
        choice1
        choice2
        choice3
        choice4
      }
    }
  }
`

interface Props {
  post: Post
}

const PollType: React.FC<Props> = ({ post }) => {
  const { data, loading, error } = useQuery<PostPollQuery>(POST_POLL_QUERY, {
    variables: {
      id: post.id
    },
    skip: !post.id
  })
  const poll = data?.post?.poll

  if (loading) return <div>Loading Poll...</div>

  return (
    <div className="space-y-2">
      <div className="linkify">
        <div>{poll?.id}</div>
      </div>
    </div>
  )
}

export default PollType
