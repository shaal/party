interface Props {
  icon?: React.ReactNode
  heading: string
  description: string
}

const SettingsHelper: React.FC<Props> = ({ icon, heading, description }) => {
  return (
    <div className="space-y-2 w-5/6">
      <div className="text-xl flex items-center gap-1.5">
        {icon}
        <div>{heading}</div>
      </div>
      <div>{description}</div>
    </div>
  )
}

export default SettingsHelper
