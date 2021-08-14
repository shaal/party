import { Product } from '../../__generated__/schema.generated'

interface Props {
  product: Product
}

const Details: React.FC<Props> = ({ product }) => {
  return (
    <div className="space-y-5 w-96">
      <img
        src={product?.avatar as string}
        className="rounded-lg h-40 w-40 ring-8 ring-gray-50 dark:ring-black"
        alt={`#${product?.slug}'s avatar`}
      />
      <div>
        <div className="text-2xl font-bold flex items-center gap-1.5">
          {product?.name}
        </div>
        <div className="text-xl">{product?.slug}</div>
      </div>

      {product?.description && <div>{product?.description}</div>}
    </div>
  )
}

export default Details
