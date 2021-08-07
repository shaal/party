import { Profile } from '~/__generated__/schema.generated'

interface Props {
  profile: Profile
}

const Social: React.FC<Props> = ({ profile }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <img
          src={`https://favicon.splitbee.io/?url=yogi.codes`}
          className="h-4 w-4"
          alt="Website"
        />
        <div>WIP</div>
      </div>
      <div className="flex items-center gap-2">
        <img
          src="https://i.ibb.co/DWjp4wY/twitter.png"
          className="h-4 w-4"
          alt="Twitter Logo"
        />
        <div>WIP</div>
      </div>
      <div className="flex items-center gap-2">
        <img
          src="https://i.ibb.co/R7QpLdD/github.png"
          className="h-4 w-4"
          alt="GitHub Logo"
        />
        <div>WIP</div>
      </div>
      <div className="flex items-center gap-2">
        <img
          src="https://i.ibb.co/Br3jcRJ/discord.png"
          className="h-4 w-4"
          alt="Discord Logo"
        />
        <div>WIP</div>
      </div>
    </div>
  )
}

export default Social
