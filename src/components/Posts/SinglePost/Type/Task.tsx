import React from 'react'
import { Post } from '~/__generated__/schema.generated'
import Linkify from 'linkifyjs/react'
import { TaskCheckbox } from '~/components/ui/TaskCheckbox'
import { gql, useMutation } from '@apollo/client'
import {
  EditPostMutation,
  EditPostMutationVariables
} from './__generated__/Task.generated'
import Attachments from '../Attachments'

interface Props {
  task: Post
}

const TaskType: React.FC<Props> = ({ task }) => {
  const [editPost, editPostResult] = useMutation<
    EditPostMutation,
    EditPostMutationVariables
  >(
    gql`
      mutation EditPostMutation($input: EditPostInput!) {
        editPost(input: $input) {
          id
          body
          done
        }
      }
    `
  )

  const toggleTaskStatus = () => {
    editPost({ variables: { input: { id: task?.id, done: !task?.done } } })
  }

  return (
    <div className="text-lg post flex items-center gap-2.5">
      <TaskCheckbox checked={task?.done} onChange={toggleTaskStatus} />
      <Linkify>{task?.body}</Linkify>
      {task?.attachments && <Attachments attachments={task?.attachments} />}
    </div>
  )
}

export default TaskType
