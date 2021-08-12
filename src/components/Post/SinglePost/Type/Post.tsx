import Linkify from 'linkifyjs/react'
import React from 'react'

import { Post } from 'src/__generated__/schema.generated'

import Attachments from '../Attachments'

interface Props {
  post: Post
}

const PostType: React.FC<Props> = ({ post }) => {
  return (
    <div className="text-lg post space-y-3">
      <Linkify>{post?.body}</Linkify>
      {post?.attachments && <Attachments attachments={post?.attachments} />}
    </div>
  )
}

export default PostType
