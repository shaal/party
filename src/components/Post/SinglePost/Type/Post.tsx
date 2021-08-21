import { linkifyOptions } from '~/components/utils/linkifyOptions'
import * as linkify from 'linkifyjs'
import hashtag from 'linkifyjs/plugins/hashtag'
import Linkify from 'linkifyjs/react'
import React from 'react'

import { Post } from '../../../../__generated__/schema.generated'
import Attachments from '../Attachments'

interface Props {
  post: Post
}

hashtag(linkify)

const PostType: React.FC<Props> = ({ post }) => {
  return (
    <div className="space-y-3">
      <div className="text-lg linkify space-y-3 inline-flex">
        <Linkify options={linkifyOptions}>{post?.body}</Linkify>
      </div>
      {post?.attachments && <Attachments attachments={post?.attachments} />}
    </div>
  )
}

export default PostType
