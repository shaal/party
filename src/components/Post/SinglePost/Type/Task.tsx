import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'

import { gql, useMutation } from '@apollo/client'
import { TaskCheckbox } from '@components/ui/TaskCheckbox'
import { linkifyOptions } from '@components/utils/linkifyOptions'
import Linkify from 'linkify-react'
import React from 'react'
import toast from 'react-hot-toast'
import { Post } from 'src/__generated__/schema.generated'

import Attachments from '../Attachments'
import {
  EditPostMutation,
  EditPostMutationVariables
} from './__generated__/Task.generated'

interface Props {
  task: Post
}

const TaskType: React.FC<Props> = ({ task }) => {
  const [editPost] = useMutation<EditPostMutation, EditPostMutationVariables>(
    gql`
      mutation EditPostMutation($input: EditPostInput!) {
        editPost(input: $input) {
          id
          body
          done
        }
      }
    `,
    {
      onError() {
        toast.error('Something went wrong!')
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
        <TaskCheckbox checked={task?.done} onChange={toggleTaskStatus} />
        <Linkify tagName="div" options={linkifyOptions}>
          {task?.body}
        </Linkify>
      </div>
      {task?.attachments && <Attachments attachments={task?.attachments} />}
    </div>
  )
}

export default TaskType
