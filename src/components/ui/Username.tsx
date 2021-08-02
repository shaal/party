interface Props {
  username: string | undefined
  showAt?: boolean
  className?: string
}

const Username: React.FC<Props> = ({
  username,
  className = '',
  showAt = true
}) => {
  return (
    <div
      className={`text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 ${className}`}
    >
      {showAt && '@'}
      {username}
    </div>
  )
}

export default Username
