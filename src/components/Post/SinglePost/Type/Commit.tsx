import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'

import { gql, useQuery } from '@apollo/client'
import { imagekitURL } from '@components/utils/imagekitURL'
import { DocumentAddIcon, DocumentIcon } from '@heroicons/react/outline'
import React from 'react'
import { Post } from 'src/__generated__/schema.generated'

import { PostCommitQuery } from './__generated__/Commit.generated'

export const POST_COMMIT_QUERY = gql`
  query PostCommitQuery($id: ID!) {
    post(id: $id) {
      id
      commit {
        id
        repoSlug
        additions
        deletions
        message
        url
        verified
        authorUsername
        authorAvatar
      }
    }
  }
`

interface Props {
  post: Post
}

const CommitType: React.FC<Props> = ({ post }) => {
  const { data, loading, error } = useQuery<PostCommitQuery>(
    POST_COMMIT_QUERY,
    {
      variables: {
        id: post.id
      },
      skip: !post.id
    }
  )
  const commit = data?.post?.commit

  if (loading) return <div>Loading Commit...</div>

  return (
    <div className="space-y-2">
      <div className="linkify">
        <a
          className="text-lg font-bold"
          href={commit?.url}
          target="_blank"
          rel="noreferrer"
        >
          {commit?.message}
        </a>
      </div>
      <div>
        <a
          className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300"
          href={`https://github.com/${commit.repoSlug}`}
        >
          <DocumentAddIcon className="h-4 w-4" />
          <div>{commit.repoSlug}</div>
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
                  <div className="font-bold">1 file</div>
                  <div>changed</div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-green-500">+{commit.additions}</div>
              <div className="text-red-500">-{commit.deletions}</div>
            </div>
          </div>
          <div className="flex items-center space-x-1.5">
            <div>
              <img
                className="h-5 w-5 rounded-md"
                src={imagekitURL(commit?.authorAvatar, 50, 50)}
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
      </div>
    </div>
  )
}

export default CommitType
