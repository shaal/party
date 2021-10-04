import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'

import { gql, useQuery } from '@apollo/client'
import { Card, CardBody } from '@components/ui/Card'
import { linkifyOptions } from '@components/utils/linkifyOptions'
import Linkify from 'linkify-react'
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

interface PollProps {
  choice: string
}

const Poll: React.FC<PollProps> = ({ choice }) => (
  <button
    type="button"
    className="bg-gray-200 px-3 py-2 rounded-lg flex items-center justify-between w-full"
    onClick={() => alert(choice)}
  >
    <div>{choice}</div>
    <div className="font-bold">0%</div>
  </button>
)

interface Props {
  post: Post
}

const PollType: React.FC<Props> = ({ post }) => {
  const { data, loading } = useQuery<PostPollQuery>(POST_POLL_QUERY, {
    variables: {
      id: post.id
    },
    skip: !post.id
  })
  const poll = data?.post?.poll

  return (
    <div className="space-y-3">
      <div className="linkify">
        <Linkify tagName="div" options={linkifyOptions}>
          {post?.body}
        </Linkify>
      </div>
      <Card className="!bg-gray-100 dark:!bg-gray-800">
        <CardBody className="space-y-3">
          {loading ? (
            <div>Loading Poll...</div>
          ) : (
            <>
              {poll?.choice1 && <Poll choice={poll?.choice1} />}
              {poll?.choice2 && <Poll choice={poll?.choice2} />}
              {poll?.choice3 && <Poll choice={poll?.choice3} />}
              {poll?.choice4 && <Poll choice={poll?.choice4} />}
            </>
          )}
        </CardBody>
      </Card>
    </div>
  )
}

export default PollType
