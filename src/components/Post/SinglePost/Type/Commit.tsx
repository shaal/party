import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'

import { Tooltip } from '@components/ui/Tooltip'
import { imagekitURL } from '@components/utils/imagekitURL'
import { useGitCommit } from '@components/utils/useGitCommit'
import {
  DocumentAddIcon,
  DocumentIcon,
  ExclamationCircleIcon,
  ShieldCheckIcon
} from '@heroicons/react/outline'
import React from 'react'
import { Post } from 'src/__generated__/schema.generated'

interface Props {
  post: Post
}

const CommitType: React.FC<Props> = ({ post }) => {
  const { commit, slug, isLoading, isError } = useGitCommit(post?.body)

  if (isLoading) return <div>Loading Commit...</div>

  if (isError)
    return (
      <div className="text-red-500 font-bold flex items-center space-x-1">
        <ExclamationCircleIcon className="h-5 w-5" />
        <div>Error fetching commit data</div>
      </div>
    )

  return (
    <div className="space-y-2">
      <div className="linkify">
        <a
          className="flex items-center space-x-2"
          href={commit?.html_url as string}
          target="_blank"
          rel="noreferrer"
        >
          <div className="text-lg font-bold">{commit?.commit?.message}</div>
          {commit?.commit?.verification?.verified && (
            <Tooltip content="This commit was signed by the committer">
              <div className="text-xs text-green-500 border border-green-500 rounded-full px-1.5 font-light flex items-center space-x-0.5">
                <ShieldCheckIcon className="h-3 w-4" />
                <div>Verified</div>
              </div>
            </Tooltip>
          )}
        </a>
      </div>
      <div>
        <a
          className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300"
          href={`https://github.com/${slug}`}
        >
          <DocumentAddIcon className="h-4 w-4" />
          <div>{slug}</div>
        </a>
      </div>
      <div className="pt-2">
        <div className="border-t" />
        <div className="my-3 flex items-center justify-between">
          <div className="flex items-center space-x-5">
            <div>
              <div className="flex items-center space-x-1">
                <DocumentIcon className="h-4 w-4" />
                <div className="flex items-center space-x-1">
                  <div className="font-bold">
                    {commit?.files?.length}{' '}
                    {(commit?.files?.length as number) > 1 ? 'files' : 'file'}
                  </div>
                  <div>changed</div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-green-500">+{commit?.stats?.additions}</div>
              <div className="text-red-500">-{commit?.stats?.deletions}</div>
            </div>
          </div>
          <div className="flex items-center space-x-1.5">
            <div>
              <img
                className="h-5 w-5 rounded-md"
                src={imagekitURL(commit?.author?.avatar_url as string, 50, 50)}
                alt={`@${commit?.author?.login}'`}
              />
            </div>
            <div className="flex items-center space-x-1">
              <a
                className="font-bold"
                href={`https://github.com/${commit?.author?.login}`}
                target="_blank"
                rel="noreferrer"
              >
                {commit?.author?.login}
              </a>
              <div>authored</div>
            </div>
          </div>
        </div>
        <div className="border-t" />
      </div>
    </div>
  )
}

export default CommitType
