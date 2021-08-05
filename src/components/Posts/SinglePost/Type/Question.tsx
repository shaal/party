import React from 'react'
import { Post } from '~/__generated__/schema.generated'
import Linkify from 'linkifyjs/react'

interface Props {
  question: Post
}

const QuestionType: React.FC<Props> = ({ question }) => {
  return (
    <div className="text-lg post">
      <div className="font-bold mb-1">{question?.title}</div>
      <Linkify>{question?.body}</Linkify>
    </div>
  )
}

export default QuestionType
