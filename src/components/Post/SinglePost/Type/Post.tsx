import * as linkify from 'linkifyjs'
import hashtag from 'linkifyjs/plugins/hashtag'
import Linkify from 'linkifyjs/react'
import React, { useEffect, useState } from 'react'

import { Post } from '~/__generated__/schema.generated'
import { linkifyOptions } from '~/components/utils/linkifyOptions'

import Attachments from '../Attachments'
import Oembed from '../Oembed'

interface Props {
  post: Post
}

hashtag(linkify)

const PostType: React.FC<Props> = ({ post }) => {
  const [oembed, setOembed] = useState()
  const [oembedLoading, setOembedLoading] = useState<boolean>(false)
  useEffect(() => {
    setOembedLoading(true)
    fetch(`/api/oembed?url=${post?.oembedUrl}`)
      .then((response) => response.json())
      .then((data) => setOembed(data))
      .finally(() => setOembedLoading(false))
  }, [])
  return (
    <div className="space-y-3">
      <div className="linkify space-y-3 inline-flex">
        <Linkify options={linkifyOptions}>{post?.body}</Linkify>
      </div>
      {post?.attachments && <Attachments attachments={post?.attachments} />}
      {post?.oembedUrl && <Oembed loading={oembedLoading} oembed={oembed} />}
    </div>
  )
}

export default PostType
