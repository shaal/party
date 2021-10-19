import { Spinner } from '@components/ui/Spinner'
import { Tooltip } from '@components/ui/Tooltip'
import { uploadToIPFS } from '@components/utils/uploadToIPFS'
import { PhotographIcon } from '@heroicons/react/outline'
import { useState } from 'react'

interface Props {
  attachments: any
  setAttachments: any
}

const Attachment: React.FC<Props> = ({ attachments, setAttachments }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleAttachment = async (evt: any) => {
    evt.preventDefault()
    setLoading(true)

    try {
      const attachment = await uploadToIPFS(evt.target.files[0])
      setAttachments([...attachments, attachment])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <button type="button" className="tab-focus-ring">
        <label className="flex items-center gap-1 cursor-pointer">
          {loading ? (
            <Spinner size="sm" />
          ) : (
            <Tooltip content="Media">
              <PhotographIcon className="h-5 w-5 text-brand-500" />
            </Tooltip>
          )}
          <input
            type="file"
            accept="image/*, video/mp4"
            className="hidden"
            onChange={handleAttachment}
            disabled={attachments.length >= 4}
          />
        </label>
      </button>
    </div>
  )
}

export default Attachment
