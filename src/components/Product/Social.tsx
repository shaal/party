import { Product } from '@graphql/types.generated'
import { useTheme } from 'next-themes'
import { STATIC_ASSETS } from 'src/constants'

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
          <a href={product?.website} target="_blank" rel="noreferrer">
            {product?.website}
          </a>
        </div>
      )}
      {product?.twitter && (
        <div className="flex items-center gap-2">
          {resolvedTheme === 'dark' ? (
            <img
              src={`${STATIC_ASSETS}/brands/twitter-light.svg`}
              className="w-4"
              alt="Twitter Logo"
            />
          ) : (
            <img
              src={`${STATIC_ASSETS}/brands/twitter-dark.svg`}
              className="w-4"
              alt="Twitter Logo"
            />
          )}
          <a
            href={`https://twitter.com/${product?.twitter}`}
            target="_blank"
            rel="noreferrer"
          >
            {product?.twitter}
          </a>
        </div>
      )}
      {product?.github && (
        <div className="flex items-center gap-2">
          {resolvedTheme === 'dark' ? (
            <img
              src="${STATIC_ASSETS}/brands/github-light.svg"
              className="w-4"
              alt="GitHub Logo"
            />
          ) : (
            <img
              src={`${STATIC_ASSETS}/brands/github-dark.svg`}
              className="w-4"
              alt="GitHub Logo"
            />
          )}
          <a
            href={`https://github.com/${product?.github}`}
            target="_blank"
            rel="noreferrer"
          >
            {product?.github}
          </a>
        </div>
      )}
      {product?.discord && (
        <div className="flex items-center gap-2">
          <img
            src={`${STATIC_ASSETS}/brands/discord.svg`}
            className="w-4"
            alt="Discord Logo"
          />
          <a
            href={`https://discord.com/${product?.discord}`}
            target="_blank"
            rel="noreferrer"
          >
            {product?.discord}
          </a>
        </div>
      )}
      {product?.producthunt && (
        <div className="flex items-center gap-2">
          <img
            src={`${STATIC_ASSETS}/brands/producthunt.svg`}
            className="w-4"
            alt="ProductHunt Logo"
          />
          <a
            href={`https://producthunt.com/posts/${product?.producthunt}`}
            target="_blank"
            rel="noreferrer"
          >
            {product?.producthunt}
          </a>
        </div>
      )}
    </div>
  )
}

export default Social
