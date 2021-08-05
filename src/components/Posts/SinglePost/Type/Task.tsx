import React from 'react'
import { Post } from '~/__generated__/schema.generated'
import Linkify from 'linkifyjs/react'
import { TaskCheckbox } from '~/components/ui/TaskCheckbox'

interface Props {
  task: Post
}

const TaskType: React.FC<Props> = ({ task }) => {
  return (
    <div className="text-lg post flex items-center gap-2.5">
      <TaskCheckbox checked={task?.done} />
      <Linkify>{task?.body}</Linkify>
    </div>
  )
}

export default TaskType
