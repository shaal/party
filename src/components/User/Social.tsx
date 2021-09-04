import { Profile } from '~/__generated__/schema.generated'

interface Props {
  profile: Profile
}

const Social: React.FC<Props> = ({ profile }) => {
  return (
    <div className="space-y-2">
      {profile?.website && (
        <div className="flex items-center gap-2">
          <img
            src={`https://www.google.com/s2/favicons?domain=${profile?.website}`}
            className="w-4"
            alt="Website"
          />
          <div>{profile?.website}</div>
        </div>
      )}
      {profile?.twitter && (
        <div className="flex items-center gap-2">
          <img src="/brand/twitter.svg" className="w-4" alt="Twitter Logo" />
          <div>{profile?.twitter}</div>
        </div>
      )}
      {profile?.github && (
        <div className="flex items-center gap-2">
          <img src="/brand/github-dark.svg" className="w-4" alt="GitHub Logo" />
          <div>{profile?.github}</div>
        </div>
      )}
      {profile?.discord && (
        <div className="flex items-center gap-2">
          <img src="/brand/discord.svg" className="w-4" alt="Discord Logo" />
          <div>{profile?.discord}</div>
        </div>
      )}
    </div>
  )
}

export default Social
