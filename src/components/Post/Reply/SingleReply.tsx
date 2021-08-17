import { gql, useMutation } from '@apollo/client'
import { ChatIcon, TrashIcon } from '@heroicons/react/outline'
import Linkify from 'linkifyjs/react'
import Link from 'next/link'
import React from 'react'
import { useContext } from 'react'
import * as timeago from 'timeago.js'

import { Reply, User } from '../../../__generated__/schema.generated'
import UserProfile from '../../shared/UserProfile'
import { Card, CardBody } from '../../ui/Card'
import AppContext from '../../utils/AppContext'
import LikeButton from '../LikeButton'
import {
  ToggleReplyLikeMutation,
  ToggleReplyLikeMutationVariables
} from './__generated__/SingleReply.generated'

interface Props {
  reply: Reply
}

const SingleReply: React.FC<Props> = ({ reply }) => {
  const { currentUser } = useContext(AppContext)
  const [toggleReplyLike, toggleReplyLikeResult] = useMutation<
    ToggleReplyLikeMutation,
    ToggleReplyLikeMutationVariables
  >(
    gql`
      mutation ToggleReplyLikeMutation($input: ToggleReplyLikeInput!) {
        toggleReplyLike(input: $input) {
          id
          likesCount
          hasLiked
        }
      }
    `
  )

  const handleLike = (reply: any) => {
    toggleReplyLike({
      variables: {
        input: {
          replyId: reply?.id
        }
      }
    })
  }

  return (
    <Card>
      <CardBody className="space-y-4">
        <div className="flex justify-between items-center">
          <UserProfile user={reply?.user as User} />
          <Link href={`/replies/${reply?.id}`} passHref>
            <div className="text-sm cursor-pointer">
              {timeago.format(reply?.createdAt)}
            </div>
          </Link>
        </div>
        <div className="text-lg post space-y-3">
          <Linkify>{reply?.body}</Linkify>
        </div>
      </CardBody>
      <div className="flex px-4 py-3 gap-7 border-t dark:border-gray-800">
        {!currentUser?.spammy && (
          <LikeButton entity={reply} handleLike={handleLike} loading={false} />
        )}
        <Link href={`/replies/${reply?.id}`} passHref>
          <button className="text-blue-500 hover:text-blue-400 flex items-center space-x-2">
            <ChatIcon className="h-5 w-5" />
          </button>
        </Link>
        {reply?.user?.id === currentUser?.id && (
          <button
            className="text-red-500 hover:text-red-400 flex items-center space-x-2"
            onClick={() => console.log('WIP')}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </Card>
  )
}

export default SingleReply
