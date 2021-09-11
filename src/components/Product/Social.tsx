import { useTheme } from 'next-themes'

import { Product } from '~/__generated__/schema.generated'

interface Props {
  product: Product
}

const Social: React.FC<Props> = ({ product }) => {
  const { resolvedTheme } = useTheme()
  return (
    <div className="space-y-2">
      {product?.website && (
        <div className="flex items-center gap-2">
          <img
            src={`https://www.google.com/s2/favicons?domain=${product?.website}`}
            className="w-4"
            alt="Website"
          />
          <div>{product?.website}</div>
        </div>
      )}
      {product?.twitter && (
        <div className="flex items-center gap-2">
          <img
            src="https://assets.devparty.io/images/brands/twitter.svg"
            className="w-4"
            alt="Twitter Logo"
          />
          <div>{product?.twitter}</div>
        </div>
      )}
      {product?.github && (
        <div className="flex items-center gap-2">
          {resolvedTheme === 'dark' ? (
            <img
              src="https://assets.devparty.io/images/brands/github-light.svg"
              className="w-4"
              alt="GitHub Logo"
            />
          ) : (
            <img
              src="https://assets.devparty.io/images/brands/github-dark.svg"
              className="w-4"
              alt="GitHub Logo"
            />
          )}
          <div>{product?.github}</div>
        </div>
      )}
      {product?.discord && (
        <div className="flex items-center gap-2">
          <img
            src="https://assets.devparty.io/images/brands/discord.svg"
            className="w-4"
            alt="Discord Logo"
          />
          <div>{product?.discord}</div>
        </div>
      )}
      {product?.producthunt && (
        <div className="flex items-center gap-2">
          <img
            src="https://assets.devparty.io/images/brands/producthunt.svg"
            className="w-4"
            alt="ProductHunt Logo"
          />
          <div>{product?.producthunt}</div>
        </div>
      )}
    </div>
  )
}

export default Social
