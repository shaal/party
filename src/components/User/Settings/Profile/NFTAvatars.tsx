import { Spinner } from '@components/ui/Spinner'
import toast from 'react-hot-toast'
import { User } from 'src/__generated__/schema.generated'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface Props {
  user: User
}

const NFTAvatars: React.FC<Props> = ({ user }) => {
  const { data, error } = useSWR(
    `https://api.opensea.io/api/v1/assets?format=json&limit=9&offset=0&order_direction=desc&owner=${user?.integrations?.ethAddress}`,
    fetcher
  )

  if (error)
    return (
      <div className="px-5 py-3.5 text-red-500 font-bold text-center space-y-2">
        <div>Something went wrong!</div>
      </div>
    )

  if (!data)
    return (
      <div className="px-5 py-3.5 font-bold text-center space-y-2">
        <Spinner size="md" className="mx-auto" />
        <div>Loading collectibles from OpenSea</div>
      </div>
    )

  return (
    <div className="p-5 space-y-2">
      <div className="grid gap-3 md:grid-cols-3 grid-cols-2">
        {data?.assets?.map((asset: any) => (
          <div key={asset?.id}>
            <div
              className="cursor-pointer"
              onClick={() => toast.success('Avatar set!')}
            >
              <img
                className="object-cover h-36 w-36 rounded-lg border"
                src={asset?.image_url}
                alt={asset?.name}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NFTAvatars
