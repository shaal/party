import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'

import { useIssue } from '@components/utils/hooks/useIssue'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import Markdown from 'markdown-to-jsx'
import { useRouter } from 'next/router'
import React from 'react'
import { Post } from 'src/__generated__/schema.generated'

interface Props {
  post: Post
}

const IssueType: React.FC<Props> = ({ post }) => {
  const router = useRouter()
  const { issue, slug, isLoading, isError } = useIssue(post?.body)

  if (isLoading) return <div>Loading Issue...</div>

  if (isError)
    return (
      <div className="text-red-500 font-bold flex items-center space-x-1">
        <ExclamationCircleIcon className="h-5 w-5" />
        <div>Error fetching issue data</div>
      </div>
    )

  return (
    <div className="space-y-3 linkify">
      <div>
        <div className="text-lg font-bold mb-1">{issue?.title}</div>
        {router.pathname === '/posts/[postId]' && (
          <div className="prose">
            <Markdown options={{ wrapper: 'article' }}>{issue?.body}</Markdown>
          </div>
        )}
      </div>
    </div>
  )
}

export default IssueType
