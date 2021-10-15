import { Button } from '@components/ui/Button'
import { Modal } from '@components/ui/Modal'
import { GlobeIcon } from '@heroicons/react/outline'
import mixpanel from 'mixpanel-browser'
import { useState } from 'react'
import { Community, Product } from 'src/__generated__/schema.generated'

import Targets from './Targets'

interface Props {
  setSelectedTarget: React.Dispatch<React.SetStateAction<any>>
}

const SelectTarget: React.FC<Props> = ({ setSelectedTarget }) => {
  const [selected, setSelected] = useState<Product | Community | null>()
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <div className="px-2">
      <Button
        type="button"
        className="text-xs"
        size="sm"
        outline
        icon={
          selected ? (
            <img
              src={selected?.avatar as string}
              className="h-4 w-4 rounded"
              alt={`${selected?.name}'s avatar'`}
            />
          ) : (
            <GlobeIcon className="h-4 w-4 text-brand-500" />
          )
        }
        onClick={() => {
          mixpanel.track('post.select_target.modal.open')
          setShowModal(!showModal)
        }}
      >
        {selected ? selected?.name : 'Everywhere'}
      </Button>
      <Modal
        onClose={() => {
          mixpanel.track('post.select_target.modal.close')
          setShowModal(!showModal)
        }}
        title="Where to post?"
        show={showModal}
      >
        <Targets
          setSelectedTarget={setSelectedTarget}
          setSelected={setSelected}
          setShowModal={setShowModal}
        />
      </Modal>
    </div>
  )
}

export default SelectTarget
