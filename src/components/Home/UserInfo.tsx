import Link from 'next/link'
import React from 'react'
import { User } from '~/__generated__/schema.generated'

interface Props {
  user: User
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <>
      <h3 className="text-center font-bold text-xl">
        Welcome, {user.username}!
      </h3>
      <Link href="/posts">View Your Posts</Link>
      <div className="grid grid-cols-2 gap-2 text-center">
        <Link href="/settings">Edit Profile</Link>
      </div>
    </>
  )
}
