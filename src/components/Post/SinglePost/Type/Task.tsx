import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'

import { gql, useMutation } from '@apollo/client'
import { Spinner } from '@components/UI/Spinner'
import { TaskCheckbox } from '@components/UI/TaskCheckbox'
import { linkifyOptions } from '@components/utils/linkifyOptions'
import {
  EditPostMutation,
  EditPostMutationVariables,
  Post
} from '@graphql/types.generated'
import Linkify from 'linkify-react'
import React from 'react'
import toast from 'react-hot-toast'
import { ERROR_MESSAGE } from 'src/constants'

import Attachments from '../Attachments'

interface Props {
  task: Post
}

const TaskType: React.FC<Props> = ({ task }) => {
  const [editPost, { loading }] = useMutation<
    EditPostMutation,
    EditPostMutationVariables
  >(
    gql`
      mutation EditPost($input: EditPostInput!) {
        editPost(input: $input) {
          id
          body
          done
        }
      }
    `,
    {
      onError() {
        toast.error(ERROR_MESSAGE)
      },
      onCompleted() {
        toast.success('Task updated successfully!')
      }
    }
  )

  const toggleTaskStatus = () => {
    editPost({ variables: { input: { id: task?.id, done: !task?.done } } })
  }

  return (
    <div className="linkify space-y-3">
      <div className="flex items-center gap-2.5">
        {loading ? (
          <Spinner size="sm" className="mr-0.5" />
        ) : (
          <TaskCheckbox checked={task?.done} onChange={toggleTaskStatus} />
        )}
        <Linkify tagName="div" options={linkifyOptions}>
          {task?.body}
        </Linkify>
      </div>
      {task?.attachments && <Attachments attachments={task?.attachments} />}
    </div>
  )
}

export default TaskType
