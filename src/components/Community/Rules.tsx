import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'

import { Card, CardBody } from '@components/ui/Card'
import { Community } from 'src/__generated__/schema.generated'

interface Props {
  community: Community
}

const Rules: React.FC<Props> = ({ community }) => {
  return (
    <Card className="mb-4">
      <CardBody>
        <div className="text-lg font-bold">{community?.name} Rules</div>
      </CardBody>
    </Card>
  )
}

export default Rules
