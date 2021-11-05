import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'

import { linkifyOptions } from '@components/utils/linkifyOptions'
import { Post } from '@graphql/types.generated'
import Linkify from 'linkify-react'
import React from 'react'

import Attachments from '../Attachments'

interface Props {
  post: Post
}

const PostType: React.FC<Props> = ({ post }) => {
  return (
    <div className="space-y-3 linkify">
      <Linkify tagName="div" options={linkifyOptions}>
        {post?.body}
      </Linkify>
      {post?.attachments && <Attachments attachments={post?.attachments} />}
    </div>
  )
}

export default PostType
