import { useGitCommit } from '@components/utils/useGitCommit'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import React from 'react'
import { Post } from 'src/__generated__/schema.generated'

interface Props {
  post: Post
}

const NFTType: React.FC<Props> = ({ post }) => {
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
      <div className="linkify">{post?.type}</div>
    </div>
  )
}

export default NFTType
