import AppContext from '@components/utils/AppContext'
import { LightningBoltIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useContext } from 'react'

const Notification: React.FC = () => {
  const { currentUser } = useContext(AppContext)

  return (
    <Link href="/notifications">
      <a>
        <LightningBoltIcon className="h-6 w-6" />
      </a>
    </Link>
  )
}

export default Notification
