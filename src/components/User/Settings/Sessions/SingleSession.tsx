import React from 'react'

import { Session } from '~/__generated__/schema.generated'

interface Props {
  session: Session
}

const SingleSession: React.FC<Props> = ({ session }) => {
  return <div>{session?.id}</div>
}

export default SingleSession
