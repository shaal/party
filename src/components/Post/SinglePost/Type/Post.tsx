import 'linkifyjs/plugins/hashtag'
import 'linkifyjs/plugins/mention'

import { Button } from '@components/ui/Button'
import { linkifyOptions } from '@components/utils/linkifyOptions'
import { Disclosure } from '@headlessui/react'
import Linkify from 'linkify-react'
import React from 'react'
import { Post } from 'src/__generated__/schema.generated'

import Attachments from '../Attachments'

interface Props {
  post: Post
}

const PostType: React.FC<Props> = ({ post }) => {
  return (
    <div className="space-y-3 linkify">
      <Linkify tagName="div" options={linkifyOptions}>
        <Disclosure>
          {({ open }) => (
            <>
              {open ? (
                <div>{post?.body}</div>
              ) : (
                <div>{post?.body.slice(0, 500)}...</div>
              )}
              {post?.body.length > 500 && (
                <Disclosure.Button
                  as={Button}
                  outline
                  size="sm"
                  className="mt-2 text-xs"
                >
                  {open ? 'Hide' : 'Read more'}
                </Disclosure.Button>
              )}
            </>
          )}
        </Disclosure>
      </Linkify>
      {post?.attachments && <Attachments attachments={post?.attachments} />}
    </div>
  )
}

export default PostType
