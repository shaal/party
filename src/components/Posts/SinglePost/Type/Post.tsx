import React from 'react'
import { Post } from '~/__generated__/schema.generated'
import Linkify from 'linkifyjs/react'

interface Props {
  post: Post
}

const PostType: React.FC<Props> = ({ post }) => {
  return (
    <div className="text-lg post">
      <Linkify>{post?.body}</Linkify>
    </div>
  )
}

export default PostType
