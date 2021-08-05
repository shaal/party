import React from 'react'
import { Post } from '~/__generated__/schema.generated'
import Linkify from 'linkifyjs/react'

interface Props {
  task: Post
}

const TaskType: React.FC<Props> = ({ task }) => {
  return (
    <div className="text-lg post">
      <Linkify>{task?.body}</Linkify>
    </div>
  )
}

export default TaskType
