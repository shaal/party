import { Profile } from '@graphql/types.generated'
import { useTheme } from 'next-themes'
import { STATIC_ASSETS } from 'src/constants'

interface Props {
  profile: Profile
}

const Social: React.FC<Props> = ({ profile }) => {
  const { resolvedTheme } = useTheme()
  return (
    <div className="space-y-2">
      {profile?.website && (
        <div className="flex items-center gap-2">
          <img
            src={`https://www.google.com/s2/favicons?domain=${profile?.website}`}
            className="w-4"
            alt="Website"
          />
          <a href={profile?.website} target="_blank" rel="noreferrer">
            {profile?.website}
          </a>
        </div>
      )}
      {profile?.twitter && (
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
            href={`https://twitter.com/${profile?.twitter}`}
            target="_blank"
            rel="noreferrer"
          >
            {profile?.twitter}
          </a>
        </div>
      )}
      {profile?.github && (
        <div className="flex items-center gap-2">
          {resolvedTheme === 'dark' ? (
            <img
              src={`${STATIC_ASSETS}/brands/github-light.svg`}
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
            href={`https://github.com/${profile?.github}`}
            target="_blank"
            rel="noreferrer"
          >
            {profile?.github}
          </a>
        </div>
      )}
      {profile?.discord && (
        <div className="flex items-center gap-2">
          <img
            src={`${STATIC_ASSETS}/brands/discord.svg`}
            className="w-4"
            alt="Discord Logo"
          />
          <a
            href={`https://discord.com/${profile?.discord}`}
            target="_blank"
            rel="noreferrer"
          >
            {profile?.discord}
          </a>
        </div>
      )}
    </div>
  )
}

export default Social
