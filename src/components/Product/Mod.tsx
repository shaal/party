import { HashtagIcon } from '@heroicons/react/outline'

import { Product } from '~/__generated__/schema.generated'
import { Card, CardBody } from '~/components/ui/Card'

interface Props {
  product: Product
}

const ProductMod: React.FC<Props> = ({ product }) => {
  return (
    <Card className="mt-5 border-yellow-400 bg-yellow-100">
      <CardBody>
        <div className="font-bold text-lg">Details</div>
        <div className="space-y-1 mt-3 text-sm">
          <div className="flex items-center gap-1">
            <HashtagIcon className="h-4 w-4" />
            <span className="font-mono font-bold">{product?.id}</span>
          </div>
        </div>
        <div className="border-t border-yellow-400 my-3"></div>
        <div className="font-bold text-lg">Flags</div>
        <div className="space-y-1.5 mt-3 text-sm font-bold">TBD</div>
      </CardBody>
    </Card>
  )
}

export default ProductMod
