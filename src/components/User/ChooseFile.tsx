import { PhotographIcon } from '@heroicons/react/outline'
import { ChangeEventHandler } from 'react'

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>
}

const ChooseFile: React.FC<Props> = ({ onChange }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <label className="flex items-center gap-1 cursor-pointer">
        <PhotographIcon className="h-5 w-5 text-brand-500" />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChange}
        />
      </label>
    </div>
  )
}

export default ChooseFile
