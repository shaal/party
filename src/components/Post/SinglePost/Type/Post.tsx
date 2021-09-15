import * as linkify from 'linkifyjs'
import hashtag from 'linkifyjs/plugins/hashtag'
import Linkify from 'linkifyjs/react'
import React from 'react'

import { Post } from '~/__generated__/schema.generated'
import { linkifyOptions } from '~/components/utils/linkifyOptions'
import { useOembed } from '~/components/utils/useOembed'

import Attachments from '../Attachments'
import Oembed from '../Oembed'

interface Props {
  post: Post
}

hashtag(linkify)

const PostType: React.FC<Props> = ({ post }) => {
  const { oembed, isLoading, isError } = useOembed(post?.oembedUrl)

  return (
    <div className="space-y-3">
      <div className="linkify space-y-3 inline-flex">
        <Linkify options={linkifyOptions}>{post?.body}</Linkify>
      </div>
      {post?.attachments && <Attachments attachments={post?.attachments} />}
      {post?.oembedUrl && !isLoading && !isError && (
        <Oembed url={post?.oembedUrl} oembed={oembed} />
      )}
    </div>
  )
}

export default PostType
