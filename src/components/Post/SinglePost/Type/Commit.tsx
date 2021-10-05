import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'

import React from 'react'
import { Post } from 'src/__generated__/schema.generated'

interface Props {
  post: Post
}

const CommitType: React.FC<Props> = ({ post }) => {
  // if (loading) return <div>Loading Commit...</div>

  return (
    <div className="space-y-2">
      {/* <div className="linkify">
        <a
          className="flex items-center space-x-2"
          href={commit?.url as string}
          target="_blank"
          rel="noreferrer"
        >
          <div className="text-lg font-bold">{commit?.message}</div>
          {commit?.verified && (
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
          href={`https://github.com/${commit?.repoSlug}`}
        >
          <DocumentAddIcon className="h-4 w-4" />
          <div>{commit?.repoSlug}</div>
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
                    {commit?.changed}{' '}
                    {(commit?.changed as number) > 1 ? 'files' : 'file'}
                  </div>
                  <div>changed</div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-green-500">+{commit?.additions}</div>
              <div className="text-red-500">-{commit?.deletions}</div>
            </div>
          </div>
          <div className="flex items-center space-x-1.5">
            <div>
              <img
                className="h-5 w-5 rounded-md"
                src={imagekitURL(commit?.authorAvatar as string, 50, 50)}
                alt={`@${commit?.authorUsername}'s avatar'`}
              />
            </div>
            <div className="flex items-center space-x-1">
              <a
                className="font-bold"
                href={`https://github.com/${commit?.authorUsername}`}
                target="_blank"
                rel="noreferrer"
              >
                {commit?.authorUsername}
              </a>
              <div>authored</div>
            </div>
          </div>
        </div>
        <div className="border-t" />
      </div> */}
    </div>
  )
}

export default CommitType
