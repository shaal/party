import { Button } from '@components/UI/Button'
import { Community } from '@graphql/types.generated'
import { UserAddIcon } from '@heroicons/react/outline'

interface Props {
  community: Community
}

const Invite: React.FC<Props> = ({ community }) => {
  return (
    <Button icon={<UserAddIcon className="h-4 w-4" />} outline>
      Invite
    </Button>
  )
}

export default Invite
