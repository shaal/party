import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'

import React from 'react'
import { Post } from 'src/__generated__/schema.generated'

interface Props {
  issue: Post
}

const IssueType: React.FC<Props> = ({ issue }) => {
  return <div className="space-y-3 linkify">{issue?.body}</div>
}

export default IssueType
