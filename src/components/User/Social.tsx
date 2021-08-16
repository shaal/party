import { Profile } from '../../__generated__/schema.generated'

interface Props {
  profile: Profile
}

const Social: React.FC<Props> = ({ profile }) => {
  return (
    <div className="space-y-2">
      {profile?.website && (
        <div className="flex items-center gap-2">
          <img
            src={`https://favicon.splitbee.io/?url=${profile?.website}`}
            className="h-4 w-4"
            alt="Website"
          />
          <div>{profile?.website}</div>
        </div>
      )}
      {profile?.twitter && (
        <div className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/DWjp4wY/twitter.png"
            className="h-4 w-4"
            alt="Twitter Logo"
          />
          <div>{profile?.twitter}</div>
        </div>
      )}
      {profile?.github && (
        <div className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/R7QpLdD/github.png"
            className="h-4 w-4"
            alt="GitHub Logo"
          />
          <div>{profile?.github}</div>
        </div>
      )}
      {profile?.discord && (
        <div className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/Br3jcRJ/discord.png"
            className="h-4 w-4"
            alt="Discord Logo"
          />
          <div>{profile?.discord}</div>
        </div>
      )}
    </div>
  )
}

export default Social
