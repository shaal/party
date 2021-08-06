import { PhotographIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { Button } from '~/components/ui/Button'
import { uploadToIPFS } from '~/components/utils/uploadToIPFS'

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
      <Button type="button" outline size="sm">
        <label className="flex items-center gap-1 cursor-pointer">
          <PhotographIcon className="h-4 w-4" />
          <span>{loading ? 'Uploading...' : 'Upload'}</span>
          <input
            type="file"
            className="hidden"
            onChange={handleAttachment}
            disabled={attachments.length >= 4}
          />
        </label>
      </Button>
    </div>
  )
}

export default Attachment
