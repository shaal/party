import { Spinner } from '~/components/ui/Spinner'
import { uploadToIPFS } from '~/components/utils/uploadToIPFS'
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
      const cdnURL = await uploadToIPFS(evt.target.files[0])
      setAttachments([...attachments, cdnURL])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <button type="button">
        <label className="flex items-center gap-1 cursor-pointer">
          {loading ? (
            <Spinner color="text-indigo-500" />
          ) : (
            <PhotographIcon className="h-5 w-5 text-indigo-500" />
          )}
          <input
            type="file"
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
