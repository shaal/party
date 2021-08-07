import { Switch } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
import { useContext } from 'react'

import { User } from '~/__generated__/schema.generated'

import { Button } from '../ui/Button'
import AppContext from '../utils/AppContext'

interface Props {
  user: User
  showText: boolean
}

const Follow: React.FC<Props> = ({ user, showText }) => {
  const { currentUser } = useContext(AppContext)

  const handleToggleFollow = () => {
    console.log('WIP')
  }

  return (
    <>
      {currentUser?.id !== user?.id && (
        <Switch
          as={Button}
          checked={true}
          onChange={handleToggleFollow}
          size="md"
          className="py-2"
          variant={true ? 'danger' : 'success'}
          outline
        >
          {true ? (
            <div className="flex items-center gap-1">
              <MinusIcon className="h-4 w-4" />
              {showText && <div>Unfollow</div>}
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <PlusIcon className="h-4 w-4" />
              {showText && <div>Follow</div>}
            </div>
          )}
        </Switch>
      )}
    </>
  )
}

export default Follow
