import { TicketIcon } from '@heroicons/react/outline'

import { Button } from '~/components/ui/Button'

const Invite: React.FC = () => {
  return (
    <div>
      <Button className="flex items-center space-x-1 text-xs">
        <TicketIcon className="h-4 w-4" />
        <div>Invite</div>
      </Button>
    </div>
  )
}

export default Invite
