import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'

import { Tooltip } from '@components/UI/Tooltip'
import { getTextColor } from '@components/utils/getTextColor'
import { useIssue } from '@components/utils/hooks/useIssue'
import { imagekitURL } from '@components/utils/imagekitURL'
import {
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/solid'
import Markdown from 'markdown-to-jsx'
import Link from 'next/link'
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

  const isPostPage = router.pathname === '/posts/[postId]'

  return (
    <div className="space-y-3 linkify">
      <div>
        <Link href={isPostPage ? issue?.html_url : `/posts/${post?.id}`}>
          <a
            className="text-lg font-bold mb-1 flex items-center space-x-2"
            href={isPostPage ? issue?.html_url : `/posts/${post?.id}`}
            target={isPostPage ? '_blank' : '_self'}
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
        </Link>
        {issue?.labels?.length > 0 && (
          <div className="flex space-x-1.5 overflow-hidden">
            {issue?.labels?.map((label: any) => (
              <div
                className="rounded-full text-xs font-mono font-bold px-2 py-[1.5px]"
                key={label?.id}
                style={{
                  backgroundColor: `#${label?.color}`,
                  color: getTextColor(`#${label?.color}`),
                  border:
                    label?.color === 'ffffff' ? '1px solid #D1D5DB' : 'none'
                }}
              >
                {label?.name}
              </div>
            ))}
          </div>
        )}
        {isPostPage && (
          <div className="prose">
            <Markdown options={{ wrapper: 'article' }}>{issue?.body}</Markdown>
          </div>
        )}
        {issue?.assignees?.length > 0 && (
          <div className="space-y-2 pt-3">
            <div className="font-bold">Assignees</div>
            <div className="flex space-x-1.5 overflow-hidden">
              {issue?.assignees?.map((user: any) => (
                <a
                  key={user?.id}
                  href={`https://github.com/${user?.login}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="rounded-full border h-7 w-7"
                    src={imagekitURL(user?.avatar_url, 100, 100)}
                    alt={`@${user?.login}`}
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default IssueType
