import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'

import { Tooltip } from '@components/UI/Tooltip'
import { useIssue } from '@components/utils/hooks/useIssue'
import {
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/solid'
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
        <a
          className="text-lg font-bold mb-1 flex items-center space-x-2"
          href={issue?.html_url}
          target="_blank"
          rel="noreferrer"
        >
          {issue?.state === 'open' ? (
            <Tooltip content="Open">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            </Tooltip>
          ) : (
            <Tooltip content="Closed">
              <CheckCircleIconSolid className="h-5 w-5 text-brand-500" />
            </Tooltip>
          )}
          <div>{issue?.title}</div>
          <div className="text-gray-500 font-normal">#{issue?.number}</div>
        </a>
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
